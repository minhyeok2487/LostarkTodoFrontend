import React, { useState, useEffect } from "react";
import { call } from "../service/api-service";
import Typography from "@mui/material/Typography";
import SearchIcon from '@mui/icons-material/Search';
import Modal from "@mui/material/Modal";
import SaveIcon from '@mui/icons-material/Save';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap,
} from "react-grid-dnd";
import { Grid } from "@mui/material";
import Notification from '../fragments/Notification';
import LinearIndeterminate from '../fragments/LinearIndeterminate';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import BasicSpeedDial from '../fragments/BasicSpeedDial';
import TodoWrapV2 from "./todo/TodoWrapV2";


export default function TodoV2() {
    const [characters, setCharacters] = useState([]); //캐릭터 리스트
    const [servers, setServers] = useState([]); //서버 리스트
    const [selectedServer, setSelectedServer] = useState(null);

    //------------------------- 페이지 로드시 호출 -------------------------
    useEffect(() => {
        // 서버 정보 불러오기
        call("/member/characterList/server", "GET", null)
            .then((response) => {
                setServers(response);
                // 서버 정보가 로드된 후 첫 번째 서버 정보를 사용하여 캐릭터 정보 불러오기
                const firstServerName = Object.keys(response)[0];
                setSelectedServer(firstServerName);
                call("/member/characterList-v3/" + firstServerName, "GET", null)
                    .then((characterResponse) => {
                        setCharacters(characterResponse);
                        console.log(characterResponse);
                    })

            })
            .catch((error) => {
                if (error.errorMessage[0] === "등록된 캐릭터가 없습니다.") {
                    window.location.href = "/signup";
                } else {
                    alert(error.errorMessage);
                    localStorage.setItem("ACCESS_TOKEN", null);
                    window.location.href = "/login";
                }
            });



        // 반응형 사이트
        function handleResize() {
            setItemsPerRow(calculateItemsPerRow());
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //------------------------- 일일 수익 & 주간 수익 관련 -------------------------
    //1. 예상 일일 수익
    const totalDayGold = characters.reduce((accumulator, character) => {
        if (character.settings.showChaos) {
            accumulator += character.chaosGold;
        }
        if (character.settings.showGuardian) {
            accumulator += character.guardianGold;
        }
        return accumulator;
    }, 0);

    //2. 일일 수익
    const getDayGold = characters.reduce((accumulator, character) => {
        if (character.chaosCheck === 2) {
            accumulator += character.chaosGold;
        }
        if (character.guardianCheck === 1) {
            accumulator += character.guardianGold;
        }
        return accumulator;
    }, 0);

    //3. 예상 주간 수익
    const totalWeekGold = characters.reduce((accumulator, character) => {
        if (character.goldCharacter) {
            character.todoList.forEach((todo) => {
                accumulator += todo.gold;
            });
        }
        return accumulator;
    }, 0);

    //4. 주간 수익
    const getWeekGold = characters.reduce((accumulator, character) => {
        accumulator += character.weekGold;
        return accumulator;
    }, 0);


    //------------------------- 일일 숙제 관련 -------------------------
    //1. 에포나의뢰 체크 
    const handleeponaCheck = (characterId) => {
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                if (character.eponaCheck === 0) {
                    character.eponaCheck = 1;
                } else if (character.eponaCheck === 1) {
                    character.eponaCheck = 2;
                } else if (character.eponaCheck === 2) {
                    character.eponaCheck = 3;
                } else if (character.eponaCheck === 3) {
                    character.eponaCheck = 0;
                }
                const updateContent = {
                    characterName: character.characterName,
                    eponaCheck: character.eponaCheck,
                    chaosCheck: character.chaosCheck,
                    guardianCheck: character.guardianCheck,
                };
                call("/character/day-content/check", "PATCH", updateContent).then((response) => { });
            }
            return character;
        });
        setCharacters(updatedCharacters);
    };

    const handleeponaCheckAll = (e, characterId) => {
        e.preventDefault();
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                if (character.eponaCheck < 3) {
                    character.eponaCheck = 3;
                } else {
                    character.eponaCheck = 0;
                }
                const updateContent = {
                    characterName: character.characterName,
                    eponaCheck: character.eponaCheck,
                    chaosCheck: character.chaosCheck,
                    guardianCheck: character.guardianCheck,
                };
                call("/character/day-content/check", "PATCH", updateContent).then((response) => { });
            }
            return character;
        });
        setCharacters(updatedCharacters);
    };


    //2.카오스던전 체크 
    const handleChaosCheck = (characterId) => {
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                if (character.chaosCheck === 0) {
                    character.chaosCheck = 1;
                } else if (character.chaosCheck === 1) {
                    character.chaosCheck = 2;
                } else if (character.chaosCheck === 2) {
                    character.chaosCheck = 0;
                }
                const updateContent = {
                    characterName: character.characterName,
                    eponaCheck: character.eponaCheck,
                    chaosCheck: character.chaosCheck,
                    guardianCheck: character.guardianCheck,
                };
                call("/character/day-content/check", "PATCH", updateContent).then((response) => { });
            }
            return character;
        });
        setCharacters(updatedCharacters);
    };

    const handleChaosCheckAll = (e, characterId) => {
        e.preventDefault();
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                if (character.chaosCheck < 2) {
                    character.chaosCheck = 2;
                } else {
                    character.chaosCheck = 0;
                }
                const updateContent = {
                    characterName: character.characterName,
                    eponaCheck: character.eponaCheck,
                    chaosCheck: character.chaosCheck,
                    guardianCheck: character.guardianCheck,
                };
                call("/character/day-content/check", "PATCH", updateContent).then((response) => { });
            }
            return character;
        });
        setCharacters(updatedCharacters);
    };


    //3. 가디언토벌 체크
    const handleGuardianCheck = (characterId) => {
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                if (character.guardianCheck === 0) {
                    character.guardianCheck = 1;
                } else {
                    character.guardianCheck = 0;
                }
                const updateContent = {
                    characterName: character.characterName,
                    eponaCheck: character.eponaCheck,
                    chaosCheck: character.chaosCheck,
                    guardianCheck: character.guardianCheck,
                };
                call("/character/day-content/check", "PATCH", updateContent).then((response) => { });
            }
            return character;
        });
        setCharacters(updatedCharacters);
    };


    //-------------------------디자인 관련 -------------------------
    //1.반응형 사이트를 위한 메소드 -> 창 크기에 맞게 조절
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

    //2.순서 변경 캐릭터 리스트 저장
    const [itemsSwapState, setItemsSwapState] = useState(false);
    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
        setItemsSwapState(true);
        const nextState = swap(characters, sourceIndex, targetIndex);
        for (let i = 0; i < nextState.length; i++) {
            nextState[i].sortNumber = i;
        }
        setCharacters(nextState);
    }

    //3.순서 변경 DB저장
    const saveSort = () => {
        setShowLinearProgress(true);
        call("/member/characterList/sorting", "PATCH", characters)
            .then((response) => {
                setShowLinearProgress(false);
                showMessage("순서 업데이트가 완료되었습니다.");
            });
        setItemsSwapState(false);
    };


    //-------------------------캐릭터 데이터 업데이트 -------------------------
    //2.캐릭터 휴식게이지 업데이트
    const handleDayContentGuage = async (e, characterId, gaugeType) => {
        e.preventDefault();
        const newGaugeValue = window.prompt(`휴식게이지 수정`);

        if (newGaugeValue !== null) {
            const parsedValue = parseInt(newGaugeValue);
            if (!isNaN(parsedValue)) {
                const updatedCharacters = characters.map((character) => {
                    if (character.id === characterId) {
                        const updatedCharacter = {
                            ...character,
                            [`${gaugeType}Gauge`]: parsedValue,
                        };

                        const updateContent = {
                            characterName: updatedCharacter.characterName,
                            chaosGauge: updatedCharacter.chaosGauge,
                            guardianGauge: updatedCharacter.guardianGauge,
                            eponaGauge: updatedCharacter.eponaGauge,
                        };

                        setShowLinearProgress(true);

                        return call("/character/day-content/gauge", "PATCH", updateContent)
                            .then((response) => {
                                setShowLinearProgress(false);
                                updatedCharacter.chaosGold = response.chaosGold;
                                updatedCharacter.guardianGold = response.guardianGold;
                                return updatedCharacter;
                            })
                            .catch((error) => {
                                alert(error.errorMessage);
                                return null;
                            });
                    }
                    return character;
                });
                const updatedCharactersWithGold = await Promise.all(updatedCharacters);
                setCharacters(updatedCharactersWithGold);
            }
        }
    };


    /**
     * 각종 정보창 모달 관련
     */
    // 모달 열기/닫기 상태 관리
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    // 모달 열기 함수
    const openContentModal = (character, category) => {
        setModalTitle("[" + character.characterName + "] " + category + " 평균 데이터");
        if (category === "카오스던전") {
            var modalContent = (
                <div>
                    <ul>
                        <p>이름 : {character.chaos.name}</p>
                        ---거래 가능 재화---
                        <li>파괴석 : {character.chaos.destructionStone}개</li>
                        <li>수호석 : {character.chaos.guardianStone}개</li>
                        <li>1레벨보석 : {character.chaos.jewelry}개</li>
                        ---거래 불가 재화---
                        <li>돌파석 : {character.chaos.leapStone}개</li>
                        <li>실링 : {character.chaos.shilling}개</li>
                        <li>파편 : {character.chaos.honorShard}개</li>
                    </ul>
                </div>
            );
        } else {
            modalContent = (
                <div>
                    <ul>
                        <p>이름 : {character.guardian.name}</p>
                        ---거래 가능 재화---
                        <li>파괴석 : {character.guardian.destructionStone}개</li>
                        <li>수호석 : {character.guardian.guardianStone}개</li>
                        <li>돌파석 : {character.guardian.leapStone}개</li>
                    </ul>
                </div>
            );
        }
        setModalContent(modalContent);
        setOpenModal(true);

    };


    // 모달 닫기 함수
    const closeContentModal = () => {
        setOpenModal(false);
        setModalTitle("");
        setModalContent("");
    };

    //Notification 관련
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const showMessage = (message) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    const [showLinearProgress, setShowLinearProgress] = useState(false);


    /**
     * 서버별 보기
     */
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleServerSelect = (serverName) => {
        setSelectedServer(serverName);
        handleClose();
        call("/member/characterList/" + serverName, "GET", null)
            .then((characterResponse) => {
                setCharacters(characterResponse);
            })
    };
    const serverItems = Object.entries(servers).map(([serverName, count]) => (
        <MenuItem key={serverName} value={serverName}
            onClick={() => handleServerSelect(serverName)}>
            {serverName}: {count}개
        </MenuItem>
    ));

    // 도전 어비스/가디언 체크
    const updateChallenge = async (character, content) => {
        setShowLinearProgress(true);
        const updateContent = {
            serverName: character.serverName,
            content: content
        };
        try {
            const response = await call("/character/challenge", "PATCH", updateContent);

            const updatedCharacters = characters.map((char) => {
                if (char.serverName === character.serverName) {
                    char.challengeAbyss = response.challengeAbyss;
                    char.challengeGuardian = response.challengeGuardian;
                }
                return char;
            });

            setCharacters(updatedCharacters);
            setShowLinearProgress(false);
        } catch (error) {
            console.error("Error updating challenge:", error);
            setShowLinearProgress(false);
        }
    }

    return (
        <>
            {showLinearProgress && <LinearIndeterminate />}
            <BasicSpeedDial
                setShowLinearProgress={setShowLinearProgress}
                characters={characters}
                setCharacters={setCharacters}
                showMessage={showMessage} />
            <div className="wrap">
                <div className="setting-wrap">
                    <div className="content-box">
                        <p>일일 수익</p>
                        <p>{getDayGold.toFixed(2)} / <span style={{ color: "var(--text-done-color)" }}>&nbsp;{totalDayGold.toFixed(2)}</span>&nbsp;Gold </p>
                    </div>
                    <div className="content-box">
                        <p>주간 수익</p>
                        <p>{getWeekGold.toLocaleString()} / <span style={{ color: "var(--text-done-color)" }}>&nbsp;{totalWeekGold.toLocaleString()}</span>&nbsp;Gold</p>
                    </div>
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
                                    style={{ height: 80 * Math.ceil(characters.length / itemsPerRow) }}
                                >
                                    {characters.map((character) => (
                                        <GridItem key={character.sortNumber} style={{ width: `${100 / itemsPerRow}%` }}>
                                            <div style={{ marginRight: 10 }}>
                                                <div className="character-info-mini"
                                                    style={{
                                                        backgroundImage: character.characterImage !== null ? `url(${character.characterImage})` : "",
                                                        backgroundPosition: character.characterClassName === "도화가" || character.characterClassName === "기상술사" ? "left 25px top -40px" : "left 25px top -20px",
                                                        backgroundColor: "gray", // imgurl이 없을시 배경색을 회색으로 설정
                                                    }}>
                                                    <p>{character.characterName}</p>
                                                    <p>Lv. {character.itemLevel}</p>
                                                </div>
                                            </div>
                                        </GridItem>
                                    ))}
                                </GridDropZone>
                            </GridContextProvider>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="setting-wrap">
                    <div style={{ backgroundColor: "#DA81F5", borderRadius: 4, marginLeft: 5 }}>
                        <Button
                            id="fade-button"
                            aria-controls={open ? 'fade-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            style={{ color: "white" }}
                        >
                            {selectedServer}: {servers[selectedServer]}개
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
                    </div>
                    <button
                        className={`content-button ${characters.length > 0 && characters[0].challengeGuardian === true ? "done" : ""}`}
                        onClick={() => updateChallenge(characters[0], "Guardian")}
                        style={{ width: 120, marginLeft: 5 }}
                    >
                        도전 가디언 토벌
                        <div className="content-button-text">
                            {characters.length > 0 && (characters[0]?.challengeGuardian === true ? <DoneIcon /> : "")}
                        </div>
                    </button>
                    <button
                        className={`content-button ${characters.length > 0 && characters[0].challengeAbyss === true ? "done" : ""}`}
                        onClick={() => updateChallenge(characters[0], "Abyss")}
                        style={{ width: 120, marginLeft: 5 }}
                    >
                        도전 어비스 던전
                        <div className="content-button-text">
                            {characters.length > 0 && (characters[0]?.challengeAbyss === true ? <DoneIcon /> : "")}
                        </div>
                    </button>
                </div>
                <div className="todo-wrap" >
                    <Grid container spacing={1.5} overflow={"hidden"}>
                        {characters.map((character) => (
                            <Grid key={character.sortNumber} item>
                                <div className="character-wrap">
                                    <div className="character-info"
                                        style={{
                                            backgroundImage: character.characterImage !== null ? `url(${character.characterImage})` : "",
                                            backgroundPosition: character.characterClassName === "도화가" || character.characterClassName === "기상술사" ? "left 10px top -80px" : "left 10px top -30px",
                                            backgroundColor: "gray", // 배경색을 회색으로 설정
                                        }}>
                                        <div className={character.goldCharacter ? "gold-border" : ""}>
                                            {character.goldCharacter ? "골드 획득 지정 캐릭터" : ""}
                                        </div>
                                        <span>@{character.serverName}  {character.characterClassName}</span>
                                        <h3 style={{ margin: 0 }}>{character.characterName}</h3>
                                        <h2 style={{ margin: 0 }}>Lv. {character.itemLevel}</h2>
                                    </div>
                                    <div className="content-wrap" style={{ display: character.settings.showEpona ? "block" : "none" }}>
                                        <div className="content">
                                            <div
                                                className={`${character.eponaCheck === 3 ? "text-done" : ""}`}
                                            >
                                                <p>에포나의뢰</p>
                                            </div>
                                            <button
                                                className={`content-button ${character.eponaCheck === 0 ? "" :
                                                    character.eponaCheck < 3 ? "ing" : "done"
                                                    }`}
                                                onClick={() => handleeponaCheck(character.id)}
                                                onContextMenu={(e) => handleeponaCheckAll(e, character.id, "epona")}
                                            >
                                                {character.eponaCheck === 3 ? <DoneIcon /> : character.eponaCheck}
                                            </button>
                                        </div>
                                        <div className="content" style={{ height: 24, padding: 0, position: "relative", cursor: "pointer" }}
                                            onContextMenu={(e) => handleDayContentGuage(e, character.id, "epona")}
                                            onClick={(e) => handleDayContentGuage(e, character.id, "epona")}>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <div key={index} className="gauge-wrap">
                                                    <div
                                                        className="gauge"
                                                        style={{ backgroundColor: index * 2 < character.eponaGauge / 10 ? "#0ec0c3" : undefined }}
                                                    ></div>
                                                    <div
                                                        className="gauge"
                                                        style={{ backgroundColor: index * 2 + 1 < character.eponaGauge / 10 ? "#0ec0c3" : undefined }}
                                                    ></div>
                                                </div>
                                            ))}
                                            <span className="gauge-text">
                                                휴식게이지 : {character.eponaGauge}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="content-wrap" style={{ display: character.settings.showChaos ? "block" : "none" }}>
                                        <div className="content">
                                            <div
                                                className={`${character.chaosCheck === 2 ? "text-done" : ""}`}
                                            >
                                                <p>카오스던전</p>
                                                <p>({character.chaosGold} gold)</p>
                                            </div>
                                            <SearchIcon onClick={() => openContentModal(character, "카오스던전")} style={{ cursor: "pointer" }} />
                                            <button
                                                className={`content-button ${character.chaosCheck === 0 ? "" :
                                                    character.chaosCheck === 1 ? "ing" : "done"
                                                    }`}
                                                onClick={() => handleChaosCheck(character.id)}
                                                onContextMenu={(e) => handleChaosCheckAll(e, character.id)}
                                            >
                                                {character.chaosCheck === 2 ? <DoneIcon /> : <CloseIcon />}
                                            </button>
                                        </div>
                                        <div className="content" style={{ height: 24, padding: 0, position: "relative", cursor: "pointer" }}
                                            onContextMenu={(e) => handleDayContentGuage(e, character.id, "chaos")}
                                            onClick={(e) => handleDayContentGuage(e, character.id, "chaos")}>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <div key={index} className="gauge-wrap">
                                                    <div
                                                        className="gauge"
                                                        style={{ backgroundColor: index * 2 < character.chaosGauge / 10 ? "#0ec0c3" : undefined }}
                                                    ></div>
                                                    <div
                                                        className="gauge"
                                                        style={{ backgroundColor: index * 2 + 1 < character.chaosGauge / 10 ? "#0ec0c3" : undefined }}
                                                    ></div>
                                                </div>
                                            ))}
                                            <span className="gauge-text">
                                                휴식게이지 : {character.chaosGauge}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="content-wrap" style={{ display: character.settings.showGuardian ? "block" : "none" }}>
                                        <div className="content">
                                            <div
                                                className={`${character.guardianCheck === 1 ? "text-done" : ""}`}
                                            >
                                                <p>가디언토벌</p>
                                                <p>({character.guardianGold} gold)</p>
                                            </div>
                                            <SearchIcon onClick={() => openContentModal(character, "가디언토벌")} style={{ cursor: "pointer" }} />
                                            <button
                                                className={`content-button ${character.guardianCheck === 1 ? "done" : ""}`}
                                                onClick={() => handleGuardianCheck(character.id)}
                                            >
                                                {character.guardianCheck === 1 ? <DoneIcon /> : <CloseIcon />}
                                            </button>
                                        </div>
                                        <div className="content" style={{ height: 24, padding: 0, position: "relative", cursor: "pointer" }}
                                            onContextMenu={(e) => handleDayContentGuage(e, character.id, "guardian")}
                                            onClick={(e) => handleDayContentGuage(e, character.id, "guardian")}>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <div key={index} className="gauge-wrap">
                                                    <div
                                                        className="gauge"
                                                        style={{ backgroundColor: index * 2 < character.guardianGauge / 10 ? "#0ec0c3" : undefined }}
                                                    ></div>
                                                    <div
                                                        className="gauge"
                                                        style={{ backgroundColor: index * 2 + 1 < character.guardianGauge / 10 ? "#0ec0c3" : undefined }}
                                                    ></div>
                                                </div>
                                            ))}
                                            <span className="gauge-text">
                                                휴식게이지 : {character.guardianGauge}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <TodoWrapV2
                                    characters={characters}
                                    setCharacters={setCharacters}
                                    character={character}
                                    setModalTitle={setModalTitle}
                                    setModalContent={setModalContent}
                                    setOpenModal={setOpenModal}
                                    setShowLinearProgress={setShowLinearProgress}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
                {/* 모달 */}
                <Modal
                    open={openModal}
                    onClose={closeContentModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <div style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#ffffff",
                        padding: "20px", width: "auto", overflowY: "auto",
                        maxHeight: 400
                    }}>
                        <Typography variant="h5" id="modal-title" style={{ color: "white", backgroundColor: "black", borderRadius: 7, textAlign: "center" }}>
                            {modalTitle}
                        </Typography>
                        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", lineHeight: 2, fontWeight: "bold" }}>
                            {modalContent}
                        </pre>
                    </div>
                </Modal>
            </div >

            < Notification
                message={snackbarMessage}
                open={openSnackbar}
                handleClose={handleSnackbarClose}
            />
        </>
    );
}
