import React, { useState } from "react";
import { call } from "../../service/api-service";
import CharacterSortForm from "../todo/CharacterSortForm";
import { Grid } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import FriendWeekTodoWrap from "./FriendWeekTodoWrap";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const FriendTodoWrap = (props) => {
    const [showCharacterSortForm, setShowCharacterSortForm] = useState(false);
    //------------------------- 일일 수익 & 주간 수익 관련 -------------------------
    //1. 예상 일일 수익
    const totalDayGold = props.characters.reduce((accumulator, character) => {
        if (character.settings.showChaos) {
            accumulator += character.chaosGold;
        }
        if (character.settings.showGuardian) {
            accumulator += character.guardianGold;
        }
        return accumulator;
    }, 0);

    //2. 일일 수익
    const getDayGold = props.characters.reduce((accumulator, character) => {
        if (character.chaosCheck >= 1) {
            for (var i = 0; i < character.chaosCheck; i++) {
                accumulator += character.chaosGold / 2;
            }
        }
        if (character.guardianCheck === 1) {
            accumulator += character.guardianGold;
        }
        return accumulator;
    }, 0);

    //3. 예상 주간 수익
    const totalWeekGold = props.characters.reduce((accumulator, character) => {
        if (character.goldCharacter) {
            character.todoList.forEach((todo) => {
                accumulator += todo.gold;
            });
        }
        return accumulator;
    }, 0);

    //4. 주간 수익
    const getWeekGold = props.characters.reduce((accumulator, character) => {
        if (character.goldCharacter) {
            accumulator += character.weekGold;
        }
        return accumulator;
    }, 0);
    //-------------------------------------------------------------------------

    //------------------------- 일일 숙제 체크 관련 -------------------------
    const updateDayContent = async (characterId, category, authority) => {
        if (!authority) {
            props.showMessage("권한이 없습니다.");
            return;
        }
        props.setShowLinearProgress(true);
        const updatedCharacters = props.characters.map((character) => {
            if (character.id === characterId) {
                var updatedCharacter = {
                    ...character,
                };
                const updateContent = {
                    characterId: character.id,
                    characterName: character.characterName,
                };
                return call("/v2/friends/day-content/check/" + category, "PATCH", updateContent)
                    .then((response) => {
                        props.setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        props.setShowLinearProgress(false);
                        props.showMessage(error.errorMessage);
                        updatedCharacter[`${category}Check`] = 0;
                        return updatedCharacter;
                    });
            }
            return character;
        });
        const updatedCharactersResult = await Promise.all(updatedCharacters);
        props.setCharacters(updatedCharactersResult);
    };

    const updateDayContentAll = async (e, characterId, category, authority) => {
        e.preventDefault();
        if (!authority) {
            props.showMessage("권한이 없습니다.");
            return;
        }
        props.setShowLinearProgress(true);
        const updatedCharacters = props.characters.map((character) => {
            if (character.id === characterId) {
                var updatedCharacter = {
                    ...character,
                };
                const updateContent = {
                    characterId: character.id,
                    characterName: character.characterName,
                };
                return call("/v2/friends/day-content/check/" + category + "/all", "PATCH", updateContent)
                    .then((response) => {
                        props.setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        props.setShowLinearProgress(false);
                        props.showMessage(error.errorMessage);
                        updatedCharacter[`${category}Check`] = 0;
                        return updatedCharacter;
                    });
            }
            return character;
        });
        const updatedCharactersResult = await Promise.all(updatedCharacters);
        props.setCharacters(updatedCharactersResult);
    };


    //------------------------- 서버별 분리 관련 -------------------------
    // const [anchorEl, setAnchorEl] = useState(null);
    // const [selectedServer, setSelectedServer] = useState(null);
    // const [servers, setServers] = useState([]); //서버 리스트

    // const open = Boolean(anchorEl);
    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };
    // const handleServerSelect = (serverName) => {
    //     setSelectedServer(serverName);
    //     handleClose();
    //     call("/member/characterList/" + serverName, "GET", null)
    //         .then((characterResponse) => {
    //             props.setCharacters(characterResponse);
    //         })
    // };
    // const serverItems = Object.entries(servers).map(([serverName, count]) => (
    //     <MenuItem key={serverName} value={serverName}
    //         onClick={() => handleServerSelect(serverName)}>
    //         {serverName}: {count}개
    //     </MenuItem>
    // ));

    // 도전 어비스/가디언 체크(v2 업데이트 완료)
    const updateChallenge = async (character, content, authority) => {
        if (!authority) {
            props.showMessage("권한이 없습니다.");
            return;
        }
        props.setShowLinearProgress(true);
        const updateContent = {
            characterId : character.id,
            serverName: character.serverName,
            content: content
        };
        try {
            const response = await call("/v2/friends/challenge", "PATCH", updateContent);
            props.setCharacters(response);
            props.setShowLinearProgress(false);
        } catch (error) {
            console.error("Error updating challenge:", error);
            props.setShowLinearProgress(false);
        }
    }

    //-----------------------------------------------------------------------------
    return (
        <div>
            <div className="wrap">
                <div className="setting-wrap">
                    <div className="content-box">
                        <p>일일 수익</p>
                        <span className="bar">
                            <i style={{ width: `${getDayGold / totalDayGold * 100}%` }}></i>
                            <em style={{ textAlign: "center" }}>{(getDayGold / totalDayGold * 100).toFixed(1)} %</em>
                        </span>
                        <p>{getDayGold.toFixed(2)} / <span>{totalDayGold.toFixed(2)}</span>G</p>
                    </div>
                    <div className="content-box">
                        <p>주간 수익</p>
                        <span className="bar">
                            <i style={{ width: `${getWeekGold / totalWeekGold * 100}%` }}></i>
                            <em style={{ textAlign: "center" }}>{(getWeekGold / totalWeekGold * 100).toFixed(1)} %</em>
                        </span>
                        <p className={`${getWeekGold / totalWeekGold}` === 1 ? "on" : ""}>{getWeekGold.toLocaleString()} / <span>{totalWeekGold.toLocaleString()}</span>G</p>{/* pub width가 100% 시 on 클래스 추가해주세요!(골드색변함) */}
                    </div>
                </div>
                {showCharacterSortForm && <CharacterSortForm
                    characters={props.characters}
                    setCharacters={props.setCharacters}
                    setShowLinearProgress={props.setShowLinearProgress}
                    showMessage={props.showMessage}
                    setShowCharacterSortForm={setShowCharacterSortForm}
                />}
                <div className="setting-wrap">
                    {/* <div>
                        <Button
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            {selectedServer} {servers[selectedServer]}개
                        </Button>
                        <Menu
                            id="fade-menu"
                            MenuListProps={{
                                'aria-labelledby': 'fade-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Fade}
                        >
                            {serverItems}
                        </Menu>
                    </div> */}
                    <button
                        className={`content-button ${props.characters.length > 0 && props.characters[0].challengeGuardian === true ? "done" : ""}`}
                        onClick={() => updateChallenge(props.characters[0], "Guardian", props.friendSetting.checkWeekTodo)} style={{ cursor: "pointer" }}
                    >
                        도전 가디언 토벌
                        <div className="content-button-text" onClick={() => updateChallenge(props.characters[0], "Guardian", props.friendSetting.checkWeekTodo)}>
                            {props.characters.length > 0 && (props.characters[0]?.challengeGuardian === true ? <DoneIcon /> : "")}
                        </div>
                    </button>
                    <button
                        className={`content-button ${props.characters.length > 0 && props.characters[0].challengeAbyss === true ? "done" : ""}`}
                        onClick={() => updateChallenge(props.characters[0], "Abyss", props.friendSetting.checkWeekTodo)} style={{ cursor: "pointer" }}
                    >
                        도전 어비스 던전
                        <div className="content-button-text" onClick={() => updateChallenge(props.characters[0], "Abyss", props.friendSetting.checkWeekTodo)}>
                            {props.characters.length > 0 && (props.characters[0]?.challengeAbyss === true ? <DoneIcon /> : "")}
                        </div>
                    </button>
                </div>
                <div className="todo-wrap" >
                    <Grid container spacing={1.5} overflow={"hidden"}>
                        {props.characters.map((character) => (
                            <Grid key={character.id} item>
                                <div className="character-wrap">
                                    <div className="character-info"
                                        style={{
                                            backgroundImage: character.characterImage !== null ? `url(${character.characterImage})` : "",
                                            backgroundPosition: character.characterClassName === "도화가" || character.characterClassName === "기상술사" ? "left 10px top -80px" : "left 10px top -30px",
                                            backgroundColor: "gray", // 배경색을 회색으로 설정
                                        }}>
                                        <div className={character.goldCharacter ? "gold-border" : ""}>
                                            {character.goldCharacter ? "골드 획득 지정" : ""} {/* pub 문구변경 */}
                                        </div>
                                        <span>@{character.serverName}  {character.characterClassName}</span>
                                        <h3 style={{ margin: 0 }}>{character.characterName}</h3>
                                        <h2 style={{ margin: 0 }}>Lv. {character.itemLevel}</h2>
                                    </div>
                                    <p className="title">일일 숙제</p>{/* pub 추가 */}
                                    {props.friendSetting.showDayTodo && <div>
                                        <div className="content-wrap">
                                            <div className="content"
                                                onClick={() => updateDayContent(character.id, "epona", props.friendSetting.checkDayTodo)}
                                                onContextMenu={(e) => updateDayContentAll(e, character.id, "epona", props.friendSetting.checkDayTodo)}
                                                style={{ cursor: "pointer" }}
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
                                        </div>
                                        <div className="content-wrap">
                                            <div className="content" onClick={() => updateDayContent(character.id, "chaos", props.friendSetting.checkDayTodo)}
                                                onContextMenu={(e) => updateDayContentAll(e, character.id, "chaos", props.friendSetting.checkDayTodo)}
                                                style={{ cursor: "pointer" }}>
                                                <button
                                                    className={`content-button ${character.chaosCheck === 0 ? "" :
                                                        character.chaosCheck === 1 ? "ing" : "done"}`}
                                                >
                                                    {character.chaosCheck === 2 ? <DoneIcon /> : <CloseIcon />}
                                                </button>
                                                <div
                                                    className={`${character.chaosCheck === 2 ? "text-done" : ""}`}
                                                >
                                                    <p>카오스던전</p>
                                                    <p className="gold">({character.chaosGold} gold)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-wrap">
                                            <div className="content" onClick={() => updateDayContent(character.id, "guardian", props.friendSetting.checkDayTodo)}
                                                onContextMenu={(e) => updateDayContentAll(e, character.id, "guardian", props.friendSetting.checkDayTodo)}
                                                style={{ cursor: "pointer" }}>
                                                <button
                                                    className={`content-button ${character.guardianCheck === 1 ? "done" : ""}`}
                                                >
                                                    {character.guardianCheck === 1 ? <DoneIcon /> : <CloseIcon />}
                                                </button>
                                                <div
                                                    className={`${character.guardianCheck === 1 ? "text-done" : ""}`}
                                                >
                                                    <p>가디언토벌</p>
                                                    <p className="gold">({character.guardianGold} gold)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                <FriendWeekTodoWrap
                                    characters={props.characters}
                                    setCharacters={props.setCharacters}
                                    character={character}
                                    setModalTitle={props.setModalTitle}
                                    setModalContent={props.setModalContent}
                                    setOpenModal={props.setOpenModal}
                                    setShowLinearProgress={props.setShowLinearProgress}
                                    showMessage={props.showMessage}
                                    friendSetting={props.friendSetting}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div >
        </div>
    );
};

export default FriendTodoWrap;