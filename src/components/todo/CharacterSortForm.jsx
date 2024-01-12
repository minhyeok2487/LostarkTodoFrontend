import React, { useState } from "react";
import * as todo from '../../apis/todo';
import * as friend from '../../apis/friend';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SaveIcon from '@mui/icons-material/Save';

const CharacterSortForm = ({
    setIsLoading,
    characters,
    setCharacters,
    showMessage,
    itemsPerRow,
    setShowCharacterSortForm,
    friendSetting = null,
    friendUsername = null
}) => {
    //1.순서 변경 캐릭터 리스트 저장
    const [itemsSwapState, setItemsSwapState] = React.useState(false);
    // function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    //     setItemsSwapState(true);
    //     const nextState = swap(characters, sourceIndex, targetIndex);
    //     for (let i = 0; i < nextState.length; i++) {
    //         nextState[i].sortNumber = i;
    //     }
    //     setCharacters(nextState);
    // }

    //2.순서 변경 DB저장
    const saveSort = async () => {
        if (friendSetting === null) {
            try {
                setIsLoading(true);
                const response = await todo.saveSort(characters);
                showMessage("순서 업데이트가 완료되었습니다.");
                setShowCharacterSortForm(false);
            } catch (error) {
                console.error('Error saveSort:', error);
            } finally {
                setIsLoading(false);
            }
        } else {
            if (friendSetting.setting) {
                try {
                    setIsLoading(true);
                    const response = await friend.saveSort(friendUsername, characters);
                    showMessage("순서 업데이트가 완료되었습니다.");
                } catch (error) {
                    console.error('Error updating updateChallenge:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                showMessage("권한이 없습니다.");
            }

        }
    };

    return (
        <Accordion style={{ backgroundColor: "rgba(255, 255, 255, 50%)", width: "100%", border: "1px solid white" }} className="sort-wrap">
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                style={{ borderRadius: "5px" }}
            >
                <Typography fontWeight={"bold"} display={"flex"}>캐릭터 순서 변경
                    <SaveIcon
                        onClick={() => saveSort()}
                        sx={{ display: itemsSwapState ? "flex" : "none", marginLeft: "5px", color: "blueviolet", cursor: "pointer" }}
                    >
                    </SaveIcon>
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/*<GridContextProvider onChange={onChange}>*/}
                {/*    <GridDropZone*/}
                {/*        id="characters"*/}
                {/*        boxesPerRow={itemsPerRow}*/}
                {/*        rowHeight={80}*/}
                {/*        style={{ height: 80 * Math.ceil(characters.length / itemsPerRow) }}*/}
                {/*    >*/}
                {/*        {characters.map((character) => (*/}
                {/*            <GridItem key={character.sortNumber} style={{ width: `${100 / itemsPerRow}%` }}>*/}
                {/*                <div style={{ marginRight: 10 }}>*/}
                {/*                    <div className="character-info-mini"*/}
                {/*                        style={{*/}
                {/*                            backgroundImage: character.characterImage !== null ? `url(${character.characterImage})` : "",*/}
                {/*                            backgroundPosition: character.characterClassName === "도화가" || character.characterClassName === "기상술사" ? "left 25px top -70px" : "left 25px top -35px",*/}
                {/*                            backgroundColor: "gray",*/}
                {/*                        }}>*/}
                {/*                        <p>{character.characterName}</p>*/}
                {/*                        <p>Lv. {character.itemLevel}</p>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </GridItem>*/}
                {/*        ))}*/}
                {/*    </GridDropZone>*/}
                {/*    <span className="acc-txt">드래그 시 캐릭터 순서가 변경됩니다</span>*/}
                {/*</GridContextProvider>*/}
            </AccordionDetails>
        </Accordion>
    );
};

export default CharacterSortForm;