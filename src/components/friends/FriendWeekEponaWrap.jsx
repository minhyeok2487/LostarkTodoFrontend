import React from 'react';
import { call } from "../../service/api-service";
import CloseIcon from "@mui/icons-material/Close";

const FriendWeekEponaWrap = (props) => {
    const weekEponaCheck = async (characterId,authority) => {
        if (!authority) {
            props.showMessage("권한이 없습니다.");
            return;
        }
        props.setShowLinearProgress(true);
        const updatedCharacters = props.characters.map((character) => {
            if (character.id === characterId) {
                var updatedCharacter = {
                    ...character
                };
                const updateContent = {
                    id: character.id,
                    characterName: character.characterName,
                };
                return call("/v2/friends/epona", "PATCH", updateContent)
                    .then((response) => {
                        props.setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        props.setShowLinearProgress(false);
                        alert(error.errorMessage);
                        return updatedCharacter;
                    });
            }
            return character;
        });
        props.setCharacters(await Promise.all(updatedCharacters));
    };


    const weekEponaCheckAll = async (e, characterId, authority) => {
        if (!authority) {
            props.showMessage("권한이 없습니다.");
            return;
        }
        e.preventDefault();
        props.setShowLinearProgress(true);
        const updatedCharacters = props.characters.map((character) => {
            if (character.id === characterId) {
                var updatedCharacter = {
                    ...character
                };
                const updateContent = {
                    id: character.id,
                    characterName: character.characterName,
                };
                return call("/v2/friends/epona/all", "PATCH", updateContent)
                    .then((response) => {
                        props.setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        props.setShowLinearProgress(false);
                        alert(error.errorMessage);
                        return updatedCharacter;
                    });
            }
            return character;
        });
        props.setCharacters(await Promise.all(updatedCharacters));
    };

    return (
        <div className="content-wrap">
            <div
                className="content"
                style={{
                    height: 35,
                    position: "relative",
                    justifyContent: "space-between",
                    fontSize: 14, //pub 수정
                }}
            >
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", cursor: "pointer" }}
                    onClick={() => weekEponaCheck(props.character.id, props.friendSetting.checkWeekTodo)}
                    onContextMenu={(e) => weekEponaCheckAll(e, props.character.id, props.friendSetting.checkWeekTodo)}
                >
                    <button
                        className={`content-button ${props.character.weekEpona === 3 ? "done" :
                            props.character.weekEpona === 1 ? "ing" :
                                props.character.weekEpona === 2 ? "ing2" : ""}`}
                        style={{ cursor: "pointer" }}
                    >
                        <CloseIcon />
                    </button>
                    <div
                        className={`${props.character.weekEpona === 3 ? "text-done" : ""}`}
                        style={{ width: "100%" }}
                    >
                        주간에포나
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendWeekEponaWrap;