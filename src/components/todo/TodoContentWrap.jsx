import React from 'react';
import { Grid } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import TodoWeekContainer from '../../containers/todo/TodoWeekContainer';

const TodoContentWrap = ({
    setIsLoading,
    showMessage,
    characters,
    setCharacters,
    updateDayContent,
    updateDayContentAll,
    updateDayContentGuage,
    openDayContentAvg,
    setModalTitle,
    setModalContent,
    setOpenModal
}) => {
    return (
        <div className="todo-wrap" >
            <Grid container spacing={1.5} overflow={"hidden"}>
                {characters.map((character) => (
                    <Grid key={character.id} item>
                        <div className="character-wrap">
                            <div className="character-info"
                                style={{
                                    backgroundImage: character.characterImage !== null ? `url(${character.characterImage})` : "",
                                    backgroundPosition: character.characterClassName === "도화가" || character.characterClassName === "기상술사" ? "left 10px top -80px" : "left 10px top -30px",
                                    backgroundColor: "gray", // 배경색을 회색으로 설정
                                }}>
                                <div className={character.goldCharacter ? "gold-border" : ""}>
                                    {character.goldCharacter ? "골드 획득 지정" : ""}
                                </div>
                                <span>@{character.serverName}  {character.characterClassName}</span>
                                <h3 style={{ margin: 0 }}>{character.characterName}</h3>
                                <h2 style={{ margin: 0 }}>Lv. {character.itemLevel}</h2>
                            </div>
                            <p className="title">일일 숙제</p>{/* pub 추가 */}
                            <div className="content-wrap" style={{ display: character.settings.showEpona ? "block" : "none" }}>
                                <div className="content" style={{ cursor: "pointer" }}
                                    onClick={() => updateDayContent(character.id, "epona")}
                                    onContextMenu={(e) => updateDayContentAll(e, character.id, "epona")}
                                >
                                    <button
                                        className={`content-button ${character.eponaCheck === 3 ? "done" :
                                            character.eponaCheck === 1 ? "ing" :
                                                character.eponaCheck === 2 ? "ing2" : ""}`}
                                    >
                                        {character.eponaCheck === 3 ? <DoneIcon /> : <CloseIcon />}
                                    </button>
                                    <div
                                        className={`${character.eponaCheck === 3 ? "text-done" : ""}`}>
                                        <span>에포나의뢰</span>
                                    </div>
                                </div>
                                <div className="content gauge-box" style={{ height: 24, padding: 0, position: "relative", cursor: "pointer" }}
                                    onContextMenu={(e) => updateDayContentGuage(e, character.id, "epona")}
                                    onClick={(e) => updateDayContentGuage(e, character.id, "epona")}>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <div key={index} className="gauge-wrap">
                                            <div
                                                className="gauge"
                                                style={{ backgroundColor: index * 2 < character.eponaGauge / 10 ? "#cfecff" : undefined }}
                                            ></div>
                                            <div
                                                className="gauge"
                                                style={{ backgroundColor: index * 2 + 1 < character.eponaGauge / 10 ? "#cfecff" : undefined }}
                                            ></div>
                                        </div>
                                    ))}
                                    <span className="gauge-text">
                                        휴식게이지 {character.eponaGauge}
                                    </span>
                                </div>
                            </div>
                            <div className="content-wrap" style={{ display: character.settings.showChaos ? "block" : "none" }}>
                                <div className="content">
                                    {/* pub 순서변경 */}
                                    <button
                                        className={`content-button ${character.chaosCheck === 0 ? "" :
                                            character.chaosCheck === 1 ? "ing" : "done"}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => updateDayContent(character.id, "chaos")}
                                        onContextMenu={(e) => updateDayContentAll(e, character.id, "chaos")}
                                    >
                                        {character.chaosCheck === 2 ? <DoneIcon /> : <CloseIcon />}
                                    </button>
                                    <div
                                        className={`${character.chaosCheck === 2 ? "text-done" : ""}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => updateDayContent(character.id, "chaos")}
                                        onContextMenu={(e) => updateDayContentAll(e, character.id, "chaos")}
                                    >
                                        <p>카오스던전</p>
                                        <p className="gold">{character.chaosGold} G</p>
                                    </div>
                                    <SearchIcon onClick={() => openDayContentAvg(character, "카오스던전")} style={{ cursor: "pointer" }} />
                                    {/* pub 순서변경 */}
                                </div>
                                <div className="content gauge-box" style={{ height: 24, padding: 0, position: "relative", cursor: "pointer" }}
                                    onContextMenu={(e) => updateDayContentGuage(e, character.id, "chaos")}
                                    onClick={(e) => updateDayContentGuage(e, character.id, "chaos")}>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <div key={index} className="gauge-wrap">
                                            <div
                                                className="gauge"
                                                style={{ backgroundColor: index * 2 < character.chaosGauge / 10 ? "#cfecff" : undefined }}
                                            ></div>
                                            <div
                                                className="gauge"
                                                style={{ backgroundColor: index * 2 + 1 < character.chaosGauge / 10 ? "#cfecff" : undefined }}
                                            ></div>
                                        </div>
                                    ))}
                                    <span className="gauge-text">
                                        휴식게이지 {character.chaosGauge}
                                    </span>
                                </div>
                            </div>
                            <div className="content-wrap" style={{ display: character.settings.showGuardian ? "block" : "none" }}>
                                <div className="content" >
                                    <button
                                        className={`content-button ${character.guardianCheck === 1 ? "done" : ""}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => updateDayContent(character.id, "guardian")}
                                        onContextMenu={(e) => updateDayContentAll(e, character.id, "guardian")}
                                    >
                                        {character.guardianCheck === 1 ? <DoneIcon /> : <CloseIcon />}
                                    </button>
                                    <div
                                        className={`${character.guardianCheck === 1 ? "text-done" : ""}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => updateDayContent(character.id, "guardian")}
                                        onContextMenu={(e) => updateDayContentAll(e, character.id, "guardian")}
                                    >
                                        <p>가디언토벌</p>
                                        <p className="gold">{character.guardianGold} G</p>
                                    </div>
                                    {/* pub 순서변경 */}
                                    <SearchIcon onClick={() => openDayContentAvg(character, "가디언토벌")} style={{ cursor: "pointer" }} />
                                </div>
                                <div className="content gauge-box" style={{ height: 24, padding: 0, position: "relative", cursor: "pointer" }}
                                    onContextMenu={(e) => updateDayContentGuage(e, character.id, "guardian")}
                                    onClick={(e) => updateDayContentGuage(e, character.id, "guardian")}>
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <div key={index} className="gauge-wrap">
                                            <div
                                                className="gauge"
                                                style={{ backgroundColor: index * 2 < character.guardianGauge / 10 ? "#cfecff" : undefined }}
                                            ></div>
                                            <div
                                                className="gauge"
                                                style={{ backgroundColor: index * 2 + 1 < character.guardianGauge / 10 ? "#cfecff" : undefined }}
                                            ></div>
                                        </div>
                                    ))}
                                    <span className="gauge-text">
                                        휴식게이지 {character.guardianGauge}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <TodoWeekContainer
                            characters={characters}
                            setCharacters={setCharacters}
                            character={character}
                            setModalTitle={setModalTitle}
                            setModalContent={setModalContent}
                            setOpenModal={setOpenModal}
                            setIsLoading={setIsLoading}
                            showMessage={showMessage}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TodoContentWrap;