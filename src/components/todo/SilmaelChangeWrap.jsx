import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { call } from "../../service/api-service";

const SilmaelChangeWrap = (props) => {
    const silmaelChange = async (characterId) => {
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
                return call("/v2/character/week/silmael", "PATCH", updateContent)
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


    const silmaelChangeAll = async (e, characterId) => {
        e.preventDefault();
        silmaelChange(characterId);
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
                    onClick={() => silmaelChange(props.character.id)}
                    onContextMenu={(e) => silmaelChangeAll(e, props.character.id)}
                >
                    {/* 여기서 부터 */}
                    <button
                        className={`content-button ${props.character.silmaelChange ? "done" : ""}`}
                        style={{ cursor: "pointer" }}
                    >
                        <CloseIcon />
                    </button>
                    {/* 여기까지 클릭 버튼 */}
                    {/* 여기서 부터 */}
                    <div
                        className={`${props.character.silmaelChange ? "text-done" : ""}`}
                        style={{ width: "100%" }}>
                        실마엘 혈석 교환
                    </div>
                    {/* 여기까지 출력 글씨 */}
                </div>
            </div>
        </div>
    );
};

export default SilmaelChangeWrap;