import React from 'react';
import { call } from "../../service/api-service";
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
// import WeekEponaWrap from './WeekEponaWrap';
// import SilmaelChangeWrap from './SilmaelChangeWrap';
// import CubeWrap from './CubeWrap';

const FriendWeekTodoWrap = ({
    characters,
    setCharacters,
    character,
    setModalTitle,
    setModalContent,
    setOpenModal,
    setShowLinearProgress,
    showMessage
}) => {
    return (
        <div className="character-wrap">
            <div className="content" style={{ padding: 0, display: character.settings.showWeekTodo ? "block" : "none" }}>
                <p className="title">주간 레이드</p>
            </div>
            <div className="character-todo">
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
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center"}}>
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
                                        <input type="text" spellCheck="false" defaultValue={todo.message} style={{ width: "90%" }} placeholder="메모 추가"/>
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
            </div>
            {/* pub 2023-10-23 스타일 적용 완료 */}
            {/* {(character.settings.showWeekEpona || character.settings.showSilmaelChange || character.settings.showCubeTicket) &&
                <div className="content title02" style={{ padding: 0 }}>
                    <p className="title">주간 숙제</p>
                </div>
            }
            <div className='character-todo'>
                {character.settings.showWeekEpona && <WeekEponaWrap
                    character={character}
                    characters={characters}
                    setCharacters={setCharacters}
                    setShowLinearProgress={setShowLinearProgress}
                />}
                {character.settings.showSilmaelChange && <SilmaelChangeWrap
                    character={character}
                    characters={characters}
                    setCharacters={setCharacters}
                    setShowLinearProgress={setShowLinearProgress}
                />}
                {character.settings.showCubeTicket && <CubeWrap
                    character={character}
                    characters={characters}
                    setCharacters={setCharacters}
                    setShowLinearProgress={setShowLinearProgress}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setOpenModal={setOpenModal}
                />}
            </div> */}
        </div>

    );
};

export default FriendWeekTodoWrap;