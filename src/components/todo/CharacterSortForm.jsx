import React, { useState } from "react";
import { call } from "../../service/api-service";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap,
} from "react-grid-dnd";

const CharacterSortForm = (props) => {
    //1.순서 변경 캐릭터 리스트 저장
    const [itemsSwapState, setItemsSwapState] = React.useState(false);
    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        setItemsSwapState(true);
        const nextState = swap(props.characters, sourceIndex, targetIndex);
        for (let i = 0; i < nextState.length; i++) {
            nextState[i].sortNumber = i;
        }
        props.setCharacters(nextState);
    }

    //2.순서 변경 DB저장
    const saveSort = () => {
        if(props.friendSetting === null) {
            props.setShowLinearProgress(true);
            call("/member/characterList/sorting", "PATCH", props.characters)
                .then((response) => {
                    props.setShowLinearProgress(false);
                    props.showMessage("순서 업데이트가 완료되었습니다.");
                    props.setShowCharacterSortForm(false);
                });
            setItemsSwapState(false);
        } else {
            if(props.friendSetting.setting) {
                props.setShowLinearProgress(true);
                call("/v2/friends/characterList/sorting/" +props.friendUsername, "PATCH", props.characters)
                    .then((response) => {
                        props.setShowLinearProgress(false);
                        props.showMessage("순서 업데이트가 완료되었습니다.");
                        props.setShowCharacterSortForm(false);
                    });
                setItemsSwapState(false);
            } else {
                props.showMessage("권한이 없습니다.");
            }

        }
    };

    const [itemsPerRow, setItemsPerRow] = useState(calculateItemsPerRow());
    function calculateItemsPerRow() {
        var screenWidth = window.innerWidth;
        if (screenWidth >= 1300) {
            screenWidth = 1300;
        }
        const width = 250;
        const row = 2;
        if (screenWidth > width * row) {
            return Math.ceil(screenWidth / width);
        } else {
            return row;
        }
    }
    
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
                <GridContextProvider onChange={onChange}>
                    <GridDropZone
                        id="characters"
                        boxesPerRow={itemsPerRow}
                        rowHeight={80}
                        style={{ height: 80 * Math.ceil(props.characters.length / itemsPerRow) }}
                    >
                        {props.characters.map((character) => (
                            <GridItem key={character.sortNumber} style={{ width: `${100 / itemsPerRow}%` }}>
                                <div style={{ marginRight: 10 }}>
                                    <div className="character-info-mini"
                                        style={{
                                            backgroundImage: character.characterImage !== null ? `url(${character.characterImage})` : "",
                                            backgroundPosition: character.characterClassName === "도화가" || character.characterClassName === "기상술사" ? "left 25px top -70px" : "left 25px top -35px",
                                            backgroundColor: "gray", 
                                        }}>
                                        <p>{character.characterName}</p>
                                        <p>Lv. {character.itemLevel}</p>
                                    </div>
                                </div>
                            </GridItem>
                        ))}
                    </GridDropZone>
                    <span className="acc-txt">드래그 시 캐릭터 순서가 변경됩니다</span>
                </GridContextProvider>
            </AccordionDetails>
        </Accordion>
    );
};

export default CharacterSortForm;