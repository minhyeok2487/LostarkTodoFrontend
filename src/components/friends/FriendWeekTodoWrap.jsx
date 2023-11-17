import React from 'react';
import { call } from "../../service/api-service";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import FriendCubeWrap from './FriendCubeWrap';
import FriendWeekEponaWrap from './FriendWeekEponaWrap';
import FriendSilmaelChangeWrap from './FriendSilmaelChangeWrap';

const FriendWeekTodoWrap = ({
    characters,
    setCharacters,
    character,
    setModalTitle,
    setModalContent,
    setOpenModal,
    setShowLinearProgress,
    showMessage,
    friendSetting
}) => {
    //3-1. 주간숙제 체크
    const updateWeekCheck = async (characterName, todo, authority) => {
        if (!authority) {
            showMessage("권한이 없습니다.");
            return;
        }
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                var updatedCharacter = {
                    ...character
                };
                const updateContent = {
                    characterId: character.id,
                    characterName: characterName,
                    weekCategory: todo.weekCategory,
                    currentGate: todo.currentGate,
                    totalGate: todo.totalGate
                };
                return call("/v2/friends/raid/check", "PATCH", updateContent)
                    .then((response) => {
                        setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        setShowLinearProgress(false);
                        alert(error.errorMessage);
                        return updatedCharacter;
                    });
            }
            return character;
        });
        const updatedCharactersWithTodo = await Promise.all(updatedCharacters);
        setCharacters(updatedCharactersWithTodo);
    };

    //3-2. 캐릭터 주간숙제 체크 All
    const updateWeekCheckAll = async (e, characterName, todo, authority) => {
        if (!authority) {
            showMessage("권한이 없습니다.");
            return;
        }
        e.preventDefault();
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                var updatedCharacter = {
                    ...character
                };
                const updateContent = {
                    characterId: character.id,
                    characterName: characterName,
                    weekCategory: todo.weekCategory,
                };
                return call("/v2/friends/raid/check/all", "PATCH", updateContent)
                    .then((response) => {
                        setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        setShowLinearProgress(false);
                        alert(error.errorMessage);
                        return updatedCharacter;
                    });
            }
            return character;
        });
        const updatedCharactersWithTodo = await Promise.all(updatedCharacters);
        setCharacters(updatedCharactersWithTodo);
    };
    return (
        <div className="character-wrap">
            <div className="content" style={{ padding: 0, display: character.settings.showWeekTodo ? "block" : "none" }}>
                <p className="title">주간 레이드</p>
            </div>
            {friendSetting.showRaid && <div className="character-todo">
                {character.todoList.map((todo) => (
                    <div className="content-wrap" key={todo.id}>
                        <div
                            className="content"
                            style={{
                                height: 75,
                                position: "relative",
                                justifyContent: "space-between",
                                fontSize: 14,
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", cursor: "pointer" }}
                                onClick={() => updateWeekCheck(character.characterName, todo, friendSetting.checkRaid)}
                                onContextMenu={(e) => updateWeekCheckAll(e, character.characterName, todo, friendSetting.checkRaid)}
                            >
                                <button
                                    className={`content-button ${todo.check ? "done" : ""}`}
                                >
                                    {todo.check ? <DoneIcon /> : <CloseIcon />}
                                </button>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
                                    <div
                                        className={`${todo.check ? "text-done" : ""}`}
                                        dangerouslySetInnerHTML={{ __html: todo.name.replace(/\n/g, "<br />") }}
                                    >
                                    </div>
                                    <div
                                        className={`${todo.check ? "text-done" : ""}`}
                                    >
                                        <span className="gold">{character.goldCharacter ? todo.gold + " G" : ""}</span>
                                    </div>
                                    <div className={"input-field"} id={"input_field_" + todo.id} style={{ display: todo.message === null || todo.message === "" ? "none" : "block" }}>
                                        <input type="text" spellCheck="false" defaultValue={todo.message} style={{ width: "90%" }} placeholder="메모 추가" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content gauge-box" style={{ height: 16, padding: 0, position: "relative" }}>
                            {Array.from({ length: todo.totalGate }, (_, index) => (
                                <div key={`${todo.id}-${index}`} className="gauge-wrap"
                                    style={{
                                        backgroundColor: todo.currentGate > index ? "#ffbfb6" : "", // pub
                                        width: 100 / todo.totalGate + "%", alignItems: "center", justifyContent: "center",
                                        color: "var(--text-color)"
                                    }}>
                                    <span>{index + 1}관문</span>
                                </div>
                            ))}
                            <span className="gauge-text"></span>
                        </div>
                    </div>
                ))}
            </div>}
            {/* pub 2023-10-23 스타일 적용 완료 */}
            <div className="content title02" style={{ padding: 0 }}>
                <p className="title">주간 숙제</p>
            </div>
            {friendSetting.showWeekTodo && <div className='character-todo'>
                <FriendWeekEponaWrap
                    character={character}
                    characters={characters}
                    setCharacters={setCharacters}
                    setShowLinearProgress={setShowLinearProgress}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setOpenModal={setOpenModal}
                    friendSetting={friendSetting}
                    showMessage={showMessage}
                />
                <FriendSilmaelChangeWrap
                    character={character}
                    characters={characters}
                    setCharacters={setCharacters}
                    setShowLinearProgress={setShowLinearProgress}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setOpenModal={setOpenModal}
                    friendSetting={friendSetting}
                    showMessage={showMessage}
                />
                <FriendCubeWrap
                    character={character}
                    characters={characters}
                    setCharacters={setCharacters}
                    setShowLinearProgress={setShowLinearProgress}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setOpenModal={setOpenModal}
                    friendSetting={friendSetting}
                    showMessage={showMessage}
                />
            </div>}
        </div>

    );
};

export default FriendWeekTodoWrap;