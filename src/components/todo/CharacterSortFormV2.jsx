import React, {useState} from 'react';
import SortWrap from "./characterSort/SortWrap";
import * as todo from "../../apis/todo";
import * as friend from "../../apis/friend";
import SaveIcon from "@mui/icons-material/Save";

const CharacterSortFormV2 = ({
                                 setIsLoading,
                                 characters,
                                 setCharacters,
                                 showMessage,
                                 itemsPerRow,
                                 setShowCharacterSortForm,
                                 friendSetting = null,
                                 friendUsername = null
                             }) => {
    const [itemsSwapState, setItemsSwapState] = useState(false);
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
            <div className="character-sort-wrap">
                <div style={{display:"flex", flexDirection:"row"}}>
                    <p>캐릭터 순서 변경</p>
                    <SaveIcon
                        onClick={() => saveSort()}
                        sx={{ display: itemsSwapState ? "flex" : "none", marginLeft: "5px", color: "blueviolet", cursor: "pointer" }}
                    >
                    </SaveIcon>
                </div>
                <SortWrap
                    characters={characters}
                    setCharacters={setCharacters}
                    itemsPerRow={itemsPerRow}
                    setItemsSwapState={setItemsSwapState}
                />
            </div>
    );
};

export default CharacterSortFormV2;