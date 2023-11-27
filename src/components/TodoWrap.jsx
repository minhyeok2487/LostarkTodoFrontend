import React, { useState, useEffect } from "react";
import { call } from "../service/api-service";
import Typography from "@mui/material/Typography";
import SearchIcon from '@mui/icons-material/Search';
import Modal from "@mui/material/Modal";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from "@mui/material";
import Notification from '../fragments/Notification';
import LinearIndeterminate from '../fragments/LinearIndeterminate';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import BasicSpeedDial from '../fragments/BasicSpeedDial';
import WeekTodoWrap from "./todo/WeekTodoWrap";
import CharacterSortForm from "./todo/CharacterSortForm";


export default function TodoWrap() {
    const [characters, setCharacters] = useState([]); //캐릭터 리스트
    const [servers, setServers] = useState([]); //서버 리스트
    const [selectedServer, setSelectedServer] = useState(null);
    const [showCharacterSortForm, setShowCharacterSortForm] = useState(false);

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
        if (character.chaosCheck >= 1) {
            for(var i=0; i<character.chaosCheck; i++) {
                accumulator += character.chaosGold/2;
            }
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
        if (character.goldCharacter) { 
            accumulator += character.weekGold;
        }
        return accumulator;
    }, 0);


    //------------------------- 일일 숙제 관련 -------------------------
    const updateDayContent = async (characterId, category) => {
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                var updatedCharacter = {
                    ...character,
                };
                const updateContent = {
                    characterId: character.id,
                    characterName: character.characterName,
                };
                return call("/v2/character/day-content/check/" + category, "PATCH", updateContent)
                    .then((response) => { 
                        setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {                         
                        setShowLinearProgress(false);
                        showMessage(error.errorMessage);
                        updatedCharacter[`${category}Check`] = 0;
                        return updatedCharacter;
                    });
            }
            return character;
        });
        const updatedCharactersResult = await Promise.all(updatedCharacters);
        setCharacters(updatedCharactersResult);
    };

    const updateDayContentAll = async (e, characterId, category) => {
        e.preventDefault();
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                var updatedCharacter = {
                    ...character,
                };
                const updateContent = {
                    characterId: character.id,
                    characterName: character.characterName,
                };
                return call("/v2/character/day-content/check/" + category + "/all", "PATCH", updateContent)
                    .then((response) => { 
                        setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {                         
                        setShowLinearProgress(false);
                        showMessage(error.errorMessage);
                        updatedCharacter[`${category}Check`] = 0;
                        return updatedCharacter;
                    });
            }
            return character;
        });
        const updatedCharactersResult = await Promise.all(updatedCharacters);
        setCharacters(updatedCharactersResult);
    };

    //1. 에포나의뢰 체크 
    // const handleEponaCheck = (characterId) => {
    //     const updatedCharacters = characters.map((character) => {
    //         if (character.id === characterId) {
    //             if (character.eponaCheck === 0) {
    //                 character.eponaCheck = 1;
    //             } else if (character.eponaCheck === 1) {
    //                 character.eponaCheck = 2;
    //             } else if (character.eponaCheck === 2) {
    //                 character.eponaCheck = 3;
    //             } else if (character.eponaCheck === 3) {
    //                 character.eponaCheck = 0;
    //             }
    //             const updateContent = {
    //                 characterId: character.id,
    //                 characterName: character.characterName,
    //                 eponaCheck: character.eponaCheck,
    //                 chaosCheck: character.chaosCheck,
    //                 guardianCheck: character.guardianCheck,
    //             };
    //             call("/v2/character/day-content/check", "PATCH", updateContent)
    //                 .then((response) => { })
    //                 .catch((error) => { showMessage(error.errorMessage); });
    //         }
    //         return character;
    //     });
    //     setCharacters(updatedCharacters);
    // };

    // //1-2. 에포나의뢰 체크 All 
    // const handleEponaCheckAll = (e, characterId) => {
    //     e.preventDefault();
    //     const updatedCharacters = characters.map((character) => {
    //         if (character.id === characterId) {
    //             if (character.eponaCheck < 3) {
    //                 character.eponaCheck = 3;
    //             } else {
    //                 character.eponaCheck = 0;
    //             }
    //             const updateContent = {
    //                 characterId: character.id,
    //                 characterName: character.characterName,
    //                 eponaCheck: character.eponaCheck,
    //                 chaosCheck: character.chaosCheck,
    //                 guardianCheck: character.guardianCheck,
    //             };
    //             call("/v2/character/day-content/check", "PATCH", updateContent)
    //                 .then((response) => { })
    //                 .catch((error) => { showMessage(error.errorMessage); });
    //         }
    //         return character;
    //     });
    //     setCharacters(updatedCharacters);
    // };


    // //2.카오스던전 체크 
    // const handleChaosCheck = (characterId) => {
    //     const updatedCharacters = characters.map((character) => {
    //         if (character.id === characterId) {
    //             if (character.chaosCheck === 0) {
    //                 character.chaosCheck = 1;
    //             } else if (character.chaosCheck === 1) {
    //                 character.chaosCheck = 2;
    //             } else if (character.chaosCheck === 2) {
    //                 character.chaosCheck = 0;
    //             }
    //             const updateContent = {
    //                 characterId: character.id,
    //                 characterName: character.characterName,
    //                 eponaCheck: character.eponaCheck,
    //                 chaosCheck: character.chaosCheck,
    //                 guardianCheck: character.guardianCheck,
    //             };
    //             call("/v2/character/day-content/check", "PATCH", updateContent)
    //                 .then((response) => { })
    //                 .catch((error) => { showMessage(error.errorMessage); });
    //         }
    //         return character;
    //     });
    //     setCharacters(updatedCharacters);
    // };

    // //2.카오스던전 체크 All 
    // const handleChaosCheckAll = (e, characterId) => {
    //     e.preventDefault();
    //     const updatedCharacters = characters.map((character) => {
    //         if (character.id === characterId) {
    //             if (character.chaosCheck < 2) {
    //                 character.chaosCheck = 2;
    //             } else {
    //                 character.chaosCheck = 0;
    //             }
    //             const updateContent = {
    //                 characterId: character.id,
    //                 characterName: character.characterName,
    //                 eponaCheck: character.eponaCheck,
    //                 chaosCheck: character.chaosCheck,
    //                 guardianCheck: character.guardianCheck,
    //             };
    //             call("/v2/character/day-content/check", "PATCH", updateContent)
    //                 .then((response) => { })
    //                 .catch((error) => { showMessage(error.errorMessage); });
    //         }
    //         return character;
    //     });
    //     setCharacters(updatedCharacters);
    // };


    // //3. 가디언토벌 체크
    // const handleGuardianCheck = (characterId) => {
    //     const updatedCharacters = characters.map((character) => {
    //         if (character.id === characterId) {
    //             if (character.guardianCheck === 0) {
    //                 character.guardianCheck = 1;
    //             } else {
    //                 character.guardianCheck = 0;
    //             }
    //             const updateContent = {
    //                 characterId: character.id,
    //                 characterName: character.characterName,
    //                 eponaCheck: character.eponaCheck,
    //                 chaosCheck: character.chaosCheck,
    //                 guardianCheck: character.guardianCheck,
    //             };
    //             call("/v2/character/day-content/check", "PATCH", updateContent)
    //                 .then((response) => { })
    //                 .catch((error) => { showMessage(error.errorMessage); });
    //         }
    //         return character;
    //     });
    //     setCharacters(updatedCharacters);
    // };

    // //3-1. 가디언토벌 체크 All
    // const handleGuardianCheckAll = (e, characterId) => {
    //     e.preventDefault();
    //     const updatedCharacters = characters.map((character) => {
    //         if (character.id === characterId) {
    //             if (character.guardianCheck === 0) {
    //                 character.guardianCheck = 1;
    //             } else {
    //                 character.guardianCheck = 0;
    //             }
    //             const updateContent = {
    //                 characterId: character.id,
    //                 characterName: character.characterName,
    //                 eponaCheck: character.eponaCheck,
    //                 chaosCheck: character.chaosCheck,
    //                 guardianCheck: character.guardianCheck,
    //             };
    //             call("/v2/character/day-content/check", "PATCH", updateContent)
    //                 .then((response) => { })
    //                 .catch((error) => { showMessage(error.errorMessage); });
    //         }
    //         return character;
    //     });
    //     setCharacters(updatedCharacters);
    // };


    //-------------------------캐릭터 데이터 업데이트 -------------------------
    //1.캐릭터 휴식게이지 업데이트
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
                            characterId: updatedCharacter.id,
                            characterName: updatedCharacter.characterName,
                            chaosGauge: updatedCharacter.chaosGauge,
                            guardianGauge: updatedCharacter.guardianGauge,
                            eponaGauge: updatedCharacter.eponaGauge,
                        };

                        setShowLinearProgress(true);

                        return call("/v2/character/day-content/gauge", "PATCH", updateContent)
                            .then((response) => {
                                setShowLinearProgress(false);
                                updatedCharacter.chaosGold = response.chaosGold;
                                updatedCharacter.guardianGold = response.guardianGold;
                                return updatedCharacter;
                            })
                            .catch((error) => {
                                setShowLinearProgress(false);
                                showMessage(error.errorMessage);
                                return character;
                            });
                    }
                    return character;
                });
                const updatedCharactersWithGold = await Promise.all(updatedCharacters);
                setCharacters(updatedCharactersWithGold);
            }
        }
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


    /**
     * 각종 정보창 모달 관련
     */
    // 모달 열기/닫기 상태 관리
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    // 모달 열기 함수
    const openContentModal = (character, category) => {
        setModalTitle("" + character.characterName + " " + category + " 평균 데이터");
        if (category === "카오스던전") {
            var modalContent = (
                <div className="chaosVisual">
                    <span className="tip">API 실시간 경매장 가격으로 평균 값을 가져옵니다.</span>
                    <p>컨텐츠 <strong>{character.chaos.name}</strong></p>
                    <div className="flex">
                        <ul>
                            <strong>거래 가능 재화</strong>
                            <li>파괴석 <em>{character.chaos.destructionStone}개</em></li>
                            <li>수호석 <em>{character.chaos.guardianStone}개</em></li>
                            <li>1레벨보석 <em>{character.chaos.jewelry}개</em></li>
                        </ul>
                        <ul>
                            <strong>거래 불가 재화</strong>
                            <li>돌파석 <em>{character.chaos.leapStone}개</em></li>
                            <li>실링 <em>{character.chaos.shilling}개</em></li>
                            <li>파편 <em>{character.chaos.honorShard}개</em></li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            modalContent = (
                <div class="chaosVisual">
                    <span className="tip">API 실시간 경매장 가격으로 평균 값을 가져옵니다.</span>
                    <p>컨텐츠 <strong>{character.guardian.name}</strong></p>
                    <div className="flex one">
                        <ul>
                            <strong>거래 가능 재화</strong>
                            <li>파괴석 <em>{character.guardian.destructionStone}개</em></li>
                            <li>수호석 <em>{character.guardian.guardianStone}개</em></li>
                            <li>돌파석 <em>{character.guardian.leapStone}개</em></li>
                        </ul>
                    </div>
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
        call("/member/characterList-v3/" + serverName, "GET", null)
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

    // 도전 어비스/가디언 체크(v2 업데이트 완료)
    const updateChallenge = async (character, content) => {
        setShowLinearProgress(true);
        const updateContent = {
            serverName: character.serverName,
            content: content
        };
        try {
            const response = await call("/v2/character/challenge", "PATCH", updateContent);
            setCharacters(response);
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
                setCharacters={setCharacters}
                showMessage={showMessage}
                setShowCharacterSortForm={setShowCharacterSortForm}
            />
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
                {/* pub 아코디언 위치 수정 */}
                {/* 캐릭터 순서 변경 폼 */}
                {showCharacterSortForm && <CharacterSortForm
                    characters={characters}
                    setCharacters={setCharacters}
                    setShowLinearProgress={setShowLinearProgress}
                    showMessage={showMessage}
                    itemsPerRow={itemsPerRow}
                    setShowCharacterSortForm={setShowCharacterSortForm}
                />}
                {/* pub 아코디언 위치 수정 */}
                <div className="setting-wrap">
                    <div>
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
                    </div>
                    <button
                        className={`content-button ${characters.length > 0 && characters[0].challengeGuardian === true ? "done" : ""}`}
                        onClick={() => updateChallenge(characters[0], "Guardian")} style={{ cursor: "pointer" }}
                    >
                        도전 가디언 토벌
                        <div className="content-button-text" onClick={() => updateChallenge(characters[0], "Guardian")}>
                            {characters.length > 0 && (characters[0]?.challengeGuardian === true ? <DoneIcon /> : "")}
                        </div>
                    </button>
                    <button
                        className={`content-button ${characters.length > 0 && characters[0].challengeAbyss === true ? "done" : ""}`}
                        onClick={() => updateChallenge(characters[0], "Abyss")} style={{ cursor: "pointer" }}
                    >
                        도전 어비스 던전
                        <div className="content-button-text" onClick={() => updateChallenge(characters[0], "Abyss")}>
                            {characters.length > 0 && (characters[0]?.challengeAbyss === true ? <DoneIcon /> : "")}
                        </div>
                    </button>
                </div>
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
                                            {character.goldCharacter ? "골드 획득 지정" : ""} {/* pub 문구변경 */}
                                        </div>
                                        <span>@{character.serverName}  {character.characterClassName}</span>
                                        <h3 style={{ margin: 0 }}>{character.characterName}</h3>
                                        <h2 style={{ margin: 0 }}>Lv. {character.itemLevel}</h2>
                                    </div>
                                    <p className="title">일일 숙제</p>{/* pub 추가 */}
                                    <div className="content-wrap" style={{ display: character.settings.showEpona ? "block" : "none" }}>
                                        <div className="content" style={{ cursor: "pointer" }}
                                            onClick={() => updateDayContent(character.id, "epona")}
                                            onContextMenu={(e) => updateDayContentAll(e, character.id, "epona")}>
                                            {/* pub 순서변경 */}
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
                                            {/* pub 순서변경 */}
                                        </div>
                                        <div className="content gauge-box" style={{ height: 24, padding: 0, position: "relative", cursor: "pointer" }}
                                            onContextMenu={(e) => handleDayContentGuage(e, character.id, "epona")}
                                            onClick={(e) => handleDayContentGuage(e, character.id, "epona")}>
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
                                            <SearchIcon onClick={() => openContentModal(character, "카오스던전")} style={{ cursor: "pointer" }} />
                                            {/* pub 순서변경 */}
                                        </div>
                                        <div className="content gauge-box" style={{ height: 24, padding: 0, position: "relative", cursor: "pointer" }}
                                            onContextMenu={(e) => handleDayContentGuage(e, character.id, "chaos")}
                                            onClick={(e) => handleDayContentGuage(e, character.id, "chaos")}>
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
                                            <SearchIcon onClick={() => openContentModal(character, "가디언토벌")} style={{ cursor: "pointer" }} />
                                        </div>
                                        <div className="content gauge-box" style={{ height: 24, padding: 0, position: "relative", cursor: "pointer" }}
                                            onContextMenu={(e) => handleDayContentGuage(e, character.id, "guardian")}
                                            onClick={(e) => handleDayContentGuage(e, character.id, "guardian")}>
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
                                <WeekTodoWrap
                                    characters={characters}
                                    setCharacters={setCharacters}
                                    character={character}
                                    setModalTitle={setModalTitle}
                                    setModalContent={setModalContent}
                                    setOpenModal={setOpenModal}
                                    setShowLinearProgress={setShowLinearProgress}
                                    showMessage={showMessage}
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
                    <div className="miniModal" 
                        style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#ffffff",
                        padding: "20px 30px 20px 20px", width: "auto", overflowY: "auto",
                        maxHeight: 450,
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
