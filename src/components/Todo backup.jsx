import React, { useState, useEffect } from "react";
import Navbar from '../fragments/Navbar';
import './Todo.css';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { call } from "../service/api-service";
import Typography from "@mui/material/Typography";
import SearchIcon from '@mui/icons-material/Search';
import Modal from "@mui/material/Modal";
import Divider from '@mui/material/Divider';
import SpeedDial from '@mui/material/SpeedDial';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
} from "react-grid-dnd";
import Notification from '../fragments/Notification';
import LinearIndeterminate from '../fragments/LinearIndeterminate';

export default function Todo() {
    const [characters, setCharacters] = useState([]); //캐릭터 리스트

    //------------------------- 페이지 로드시 호출 -------------------------
    useEffect(() => {
        // 초기 캐릭터 정보 불러오기
        call("/member/characterList", "GET", null)
            .then((response) => {
                setCharacters(response);
            })
            .catch((error) => {
                if (error.errorMessage[0] === "등록된 캐릭터가 없습니다.") {
                    alert(error.errorMessage);
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
        return accumulator + character.chaosGold + character.guardianGold;
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
        character.todoList.map((todo) => {
            accumulator += todo.gold;
            return null;
        });

        return accumulator;
    }, 0);

    //4. 주간 수익
    const getWeekGold = characters.reduce((accumulator, character) => {
        character.todoList.map((todo) => {
            if (todo.check === true) {
                accumulator += todo.gold;
            }
            return null;
        });
        return accumulator;
    }, 0);

    //------------------------- 일일 숙제 관련 -------------------------
    //1. 에포나의뢰 체크 
    const handleEponaCheck = (characterId) => {
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                character.eponaCheck = !character.eponaCheck;
                const updateContent = {
                    characterName: character.characterName,
                    eponaCheck: character.eponaCheck,
                    chaosCheck: character.chaosCheck,
                    guardianCheck: character.guardianCheck,
                };
                call("/character/check", "PATCH", updateContent).then((response) => { });
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
                call("/character/check", "PATCH", updateContent).then((response) => { });
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
                call("/character/check", "PATCH", updateContent).then((response) => { });
            }
            return character;
        });
        setCharacters(updatedCharacters);
    };


    //-------------------------캐릭터 순서 관련 -------------------------
    //1.반응형 사이트를 위한 메소드 -> 창 크기에 맞게 조절
    const [itemsPerRow, setItemsPerRow] = useState(calculateItemsPerRow());
    function calculateItemsPerRow() {
        const screenWidth = window.innerWidth;
        const width = 300;
        const row = 2;
        if (screenWidth > width * row) {
            return Math.ceil(screenWidth / width);
        } else {
            return row;
        }
    }

    //2.순서 변경 캐릭터 리스트 저장
    function onChange(sourceId, sourceIndex, targetIndex, targetId) {
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
    };


    //-------------------------캐릭터 데이터 업데이트 -------------------------
    //1.전체 캐릭터 데이터 업데이트
    const updateCharacterList = () => {
        setShowLinearProgress(true);

        call("/member/characterList", "PATCH", null)
            .then((response) => {
                setShowLinearProgress(false);
                showMessage("정보 업데이트가 완료되었습니다.");
            })
    };

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

                        return call("/character/gauge", "PATCH", updateContent)
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

    //3.캐릭터 주간숙제 추가 폼
    const openAddTodoForm = (characterName) => {
        setModalTitle(characterName + " 주간 숙제 관리");
        call("/character/week/" + characterName, "GET", null).then((response) => {
            const todosByCategory = {};

            // Group todos by category
            response.forEach((todo) => {
                if (!todosByCategory[todo.weekCategory]) {
                    todosByCategory[todo.weekCategory] = [];
                }
                todosByCategory[todo.weekCategory].push(todo);
            });

            // Create modal content based on categorized todos
            const modalContent = (
                <div>
                    {Object.entries(todosByCategory).map(([weekCategory, todos], index) => (
                        <div key={index}>
                            <span>{weekCategory}</span>
                            <div style={{ display: "flex" }}>
                                {todos.map((todo, todoIndex) => (
                                    <button
                                        key={todoIndex}
                                        className={`content-button ${todo.checked === true ? "done" : ""}`}
                                        onClick={() => updateWeekTodo(characterName, todo)}
                                        style={{ marginRight: "10px", marginBottom: 10, width: 130, height: 55, fontSize: 14 }}
                                    >
                                        {todo.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            );

            setModalContent(modalContent);
            setOpenModal(true);
        });
    };

    //4.캐릭터 주간 숙제 업데이트
    const updateWeekTodo = async (characterName, content) => {
        setShowLinearProgress(true);
    
        const updatedCharactersPromises = characters.map(async (character) => {
            if (character.characterName === characterName) {
                try {
                    const response = await call("/character/week/" + characterName, "POST", content);
                    setShowLinearProgress(false);
                    openAddTodoForm(characterName);
                    return { ...character, todoList: response };
                } catch (error) {
                    console.error(error);
            
                    return character; 
                }
            } else {
                return character;
            }
        });
    
        try {
            const updatedCharacters = await Promise.all(updatedCharactersPromises);
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error(error);
        }
    };







    // 캐릭터 주간숙제 체크
    const updateWeekCheck = (characterId, todoId) => {
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                const updatedTodoList = character.todoList.map((todo) => {
                    if (todo.id === todoId) {
                        const updateContent = {
                            characterName: character.characterName,
                            todoId: todoId,
                            todoCheck: todo.check,
                        };
                        call("/character/week/check", "PATCH", updateContent)
                            .then((response) => { });
                        return { ...todo, check: !todo.check };
                    }
                    return todo;
                });
                return { ...character, todoList: updatedTodoList };
            }
            return character;
        });
        setCharacters(updatedCharacters);

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
        setModalTitle("[" + character + "] " + category + " 평균 데이터");

        // 비동기 작업을 실행하고 작업이 완료되면 모달 컨텐츠를 업데이트하고 모달을 엽니다.
        call("/character/day-todo/" + character + "/" + category, "GET", null)
            .then((response) => {
                if (category === "카오스던전") {
                    var modalContent = (
                        <div>
                            <ul>
                                <p>이름 : {response.name}</p>
                                ---거래 가능 재화---
                                <li>파괴석 : {response.destructionStone}개</li>
                                <li>수호석 : {response.guardianStone}개</li>
                                <li>1레벨보석 : {response.jewelry}개</li>
                                ---거래 불가 재화---
                                <li>돌파석 : {response.leapStone}개</li>
                                <li>실링 : {response.shilling}개</li>
                                <li>파편 : {response.honorShard}개</li>
                            </ul>
                        </div>
                    );
                } else {
                    modalContent = (
                        <div>
                            <ul>
                                <p>이름 : {response.name}</p>
                                ---거래 가능 재화---
                                <li>파괴석 : {response.destructionStone}개</li>
                                <li>수호석 : {response.guardianStone}개</li>
                                <li>돌파석 : {response.leapStone}개</li>
                            </ul>
                        </div>
                    );
                }
                setModalContent(modalContent);
                setOpenModal(true);
            })
            .catch((error) => {
                alert(error.errorMessage);
            });
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

    return (
        <>
            <Navbar />
            {showLinearProgress && <LinearIndeterminate />}
            <Box sx={{ margin: '0 auto' }}>
                <div className="todo-wrap">
                    <div className="content-box" style={{ backgroundColor: "antiquewhite" }}>일일 수익 : {getDayGold.toFixed(2)} / <span style={{ color: "gray" }}>{totalDayGold.toFixed(2)}</span> Gold</div>
                    <div className="content-box" style={{ backgroundColor: "lightsteelblue" }}>주간 수익 : {getWeekGold.toLocaleString()} / <span style={{ color: "gray" }}>{totalWeekGold.toLocaleString()}</span> Gold</div>
                </div>
                <div className="todo-wrap">
                    <GridContextProvider onChange={onChange}>
                        <GridDropZone
                            id="characters"
                            boxesPerRow={itemsPerRow}
                            rowHeight={545}
                            style={{ width: `${235 * itemsPerRow}px`, height: 545 * Math.ceil(characters.length / itemsPerRow) }}
                        >
                            {characters.map((character) => (
                                <GridItem key={character.sortNumber} style={{ width: `${100 / itemsPerRow}%` }}>
                                    <div style={{ marginRight: 10 }}>
                                        <div className="character-info"
                                            style={{
                                                backgroundImage: character.characterImage !== null ? `url(${character.characterImage})` : "",
                                                backgroundPosition: character.characterClassName === "도화가" || character.characterClassName === "기상술사" ? "left 10px top -70px" : "left 10px top -40px",
                                                backgroundColor: "gray", // 배경색을 회색으로 설정
                                            }}>
                                            <h5>@{character.serverName}  {character.characterClassName}</h5>
                                            <p>{character.characterName}</p>
                                            <h3>Lv. {character.itemLevel}</h3>
                                        </div>
                                        <div className="character-todo" style={{ backgroundColor: "antiquewhite" }}>
                                            <div className="content">
                                                <Stack
                                                    divider={<Divider orientation="vertical" flexItem />}
                                                    direction="row" spacing={1} style={{ width: 100 + "%" }}
                                                >
                                                    <div
                                                        className={`${character.eponaCheck === true ? "text-done" : ""}`}
                                                        style={{
                                                            width: "60%", display: "flex", alignItems: "center"
                                                        }}>
                                                        <span>에포나의뢰 & 출석체크</span>
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex", alignItems: "center"
                                                        }}>
                                                        <button
                                                            className={`content-button ${character.eponaCheck === true ? "done" : ""}`}
                                                            onClick={() => handleEponaCheck(character.id)}
                                                        >
                                                            {character.eponaCheck === true ? <DoneIcon /> : <CloseIcon />}
                                                        </button>
                                                    </div>
                                                </Stack>
                                            </div>
                                            <div className="content">
                                                <Stack
                                                    divider={<Divider orientation="vertical" flexItem />}
                                                    direction="row" spacing={1} style={{ width: 100 + "%" }}
                                                >
                                                    <div
                                                        className={`${character.chaosCheck === 2 ? "text-done" : ""}`}
                                                        style={{
                                                            width: "60%", display: "flex", alignItems: "center"
                                                        }}>
                                                        <span>카오스던전 <br />({character.chaosGold} gold)</span>
                                                        <SearchIcon onClick={() => openContentModal(character.characterName, "카오스던전")} style={{ cursor: "pointer", zoom: 0.8 }} />
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex", alignItems: "center"
                                                        }}>
                                                        <button
                                                            className={`content-button ${character.chaosCheck === 0 ? "" :
                                                                character.chaosCheck === 1 ? "ing" : "done"
                                                                }`}
                                                            onClick={() => handleChaosCheck(character.id)}
                                                            onContextMenu={(e) => handleDayContentGuage(e, character.id, "chaos")}
                                                        >
                                                            {character.chaosCheck} ({character.chaosGauge})
                                                        </button>
                                                    </div>
                                                </Stack>
                                            </div>
                                            <div className="content">
                                                <Stack
                                                    divider={<Divider orientation="vertical" flexItem />}
                                                    direction="row" spacing={1} style={{ width: 100 + "%" }}
                                                >
                                                    <div
                                                        className={`${character.guardianCheck === 1 ? "text-done" : ""}`}
                                                        style={{
                                                            width: "60%", display: "flex", alignItems: "center"
                                                        }}
                                                    >
                                                        <span >가디언토벌 <br />({character.guardianGold} gold) </span>
                                                        <SearchIcon onClick={() => openContentModal(character.characterName, "가디언토벌")} style={{ cursor: "pointer", zoom: 0.8 }} />
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex", alignItems: "center"
                                                        }}>
                                                        <button
                                                            className={`content-button ${character.guardianCheck === 0 ? "" : "done"}`}
                                                            onClick={() => handleGuardianCheck(character.id)}
                                                            onContextMenu={(e) => handleDayContentGuage(e, character.id, "guardian")}
                                                        >
                                                            {character.guardianCheck} ({character.guardianGauge})
                                                        </button>
                                                    </div>
                                                </Stack>
                                            </div>
                                        </div>
                                        <div className="content" style={{ padding: 0, marginTop: 2 }}>
                                            <button
                                                className={"content-button"}
                                                onClick={() => openAddTodoForm(character.characterName)}
                                                style={{ width: 100 + '%', fontSize: 17 }}
                                            > 주간숙제 관리 </button>
                                        </div>
                                        <div style={{ backgroundColor: "lightsteelblue", height: 170 }} className="character-todo">
                                            <div>
                                                {character.todoList.map((todo) => (
                                                    <div key={todo.id} className="content">
                                                        <Stack
                                                            divider={<Divider orientation="vertical" flexItem />}
                                                            direction="row" spacing={1} style={{ width: 100 + "%" }}
                                                        >
                                                            <div
                                                                style={{
                                                                    width: "60%", display: "flex", alignItems: "center"
                                                                }}
                                                                className={`${todo.check === true ? "text-done" : ""}`}
                                                            >
                                                                <span>{todo.name} <br />({todo.gold} gold)</span>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display: "flex", alignItems: "center"
                                                                }}
                                                            >
                                                                <button
                                                                    className={`content-button ${todo.check === true ? "done" : ""}`}
                                                                    onClick={() => updateWeekCheck(character.id, todo.id)}
                                                                >
                                                                    {todo.check === true ? <DoneIcon /> : <CloseIcon />}
                                                                </button>
                                                            </div>
                                                        </Stack>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </GridItem>
                            ))}
                        </GridDropZone>
                    </GridContextProvider>
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
                        backgroundColor: "#dddddd",
                        padding: "20px", width: "auto", overflowY: "auto"
                    }}>
                        <Typography variant="h5" id="modal-title">
                            {modalTitle}
                        </Typography>
                        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", lineHeight: 2, fontWeight: "bold" }}>
                            {modalContent}
                        </pre>
                    </div>
                </Modal>
            </Box>
            <SpeedDial
                ariaLabel="SaveSorting"
                sx={{ position: 'fixed', bottom: 58, right: 45 }}
                icon={<SaveIcon />} onClick={() => saveSort()} style={{ cursor: "pointer" }}
            >
            </SpeedDial>
            <SpeedDial
                ariaLabel="캐릭터 정보 업데이트"
                sx={{ position: 'fixed', bottom: 58, right: 110 }}
                icon={<RefreshIcon />} onClick={() => updateCharacterList()} style={{ cursor: "pointer" }}
            >
            </SpeedDial>
            <Notification
                message={snackbarMessage}
                open={openSnackbar}
                handleClose={handleSnackbarClose}
            />

        </>
    );
}
