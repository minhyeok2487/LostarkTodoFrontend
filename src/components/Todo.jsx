import React, { useState, useEffect } from "react";
import './Todo.css';
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
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';

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
            character.todoList.map((todo) => {
                if (todo.check === true) {
                    accumulator += todo.gold;
                }
                return null;
            });
        }
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


    //-------------------------디자인 관련 -------------------------
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
    //1.전체 캐릭터 데이터 업데이트
    const updateCharacterList = () => {
        setShowLinearProgress(true);

        call("/member/characterList", "PATCH", null)
            .then((response) => {
                setShowLinearProgress(false);
                showMessage("정보 업데이트가 완료되었습니다.");
                setCharacters(response);
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
    const openAddTodoForm = (characterName, goldCharacter) => {
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
                    <Button variant="contained" onClick={() => updateGoldCharacter(characterName)} style={{ cursor: "pointer" }}>
                        골드 획득 캐릭터 지정 {goldCharacter ? "해제" : ""}
                    </Button>
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

    //4.캐릭터 주간 숙제 업데이트(추가/삭제)
    const updateWeekTodo = (characterName, content) => {
        setShowLinearProgress(true);

        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                call("/character/week/" + characterName, "POST", content)
                    .then((response) => {
                        setShowLinearProgress(false);
                        openAddTodoForm(characterName, response.goldCharacter);
                        character.todoList = response.todoList;
                    })
                    .catch((error) => {
                        alert(error.errorMessage);
                        setShowLinearProgress(false);
                    });
            }
            return character;
        });
        setCharacters(updatedCharacters);

    };

    //5.골드획득 캐릭터 업데이트
    const updateGoldCharacter = (characterName) => {
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                const updateContent = {
                    characterName: characterName,
                };
                call("/character/gold-character", "POST", updateContent)
                    .then((response) => {
                        setShowLinearProgress(false);
                        character.goldCharacter = response.goldCharacter;
                        setOpenModal(false);
                    })
                    .catch((error) => {
                        alert(error.errorMessage);
                        setShowLinearProgress(false);
                    });
            }
            return character;
        });

        setCharacters(updatedCharacters);
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
                            message: todo.check,
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

    const updateWeekMessage = (characterId, todoId, message) => {
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                const updatedTodoList = character.todoList.map((todo) => {
                    if (todo.id === todoId) {
                        const updateContent = {
                            characterName: character.characterName,
                            todoId: todoId,
                            message: message,
                        };
                        call("/character/week/message", "PATCH", updateContent)
                            .then((response) => {
                                setShowLinearProgress(false);
                                const inputFieldIcon = document.getElementById("input_field_icon_" + todoId);
                                if(response.message==="" || response.message===null) {
                                    inputFieldIcon.style.display = "block";
                                } else {
                                    inputFieldIcon.style.display = "none";
                                }
                                const updatedTodo = { ...todo, message: response.message };
                                return updatedTodo;
                            })
                            .catch((error) => {
                                console.error("Error updating todo message:", error.errorMessage);
                                return todo; // Return the original todo in case of an error
                            });
                    }
                    return todo;
                });
                return { ...character, todoList: updatedTodoList };
            }
            return character;
        });

        // Update the state outside the loop
        setCharacters(updatedCharacters);
    };

    const changeShow = (todoId) => {
        const inputField = document.getElementById("input_field_" + todoId);
        if(inputField.style.display === "none") {
            inputField.style.display = "block";
        } else {
            inputField.style.display = "none";
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
            {showLinearProgress && <LinearIndeterminate />}
            <div className="wrap">
                <div className="setting-wrap">
                    <div className="content-box" style={{ backgroundColor: "antiquewhite" }}>일일 수익 : {getDayGold.toFixed(2)} / <span style={{ color: "gray" }}>&nbsp;{totalDayGold.toFixed(2)}</span>&nbsp;Gold </div>
                    <div className="content-box" style={{ backgroundColor: "lightsteelblue" }}>주간 수익 : {getWeekGold.toLocaleString()} / <span style={{ color: "gray" }}>&nbsp;{totalWeekGold.toLocaleString()}</span>&nbsp;Gold</div>
                    <Accordion style={{ backgroundColor: "#D7DBDD", width: "100%" }} className="sort-wrap">
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
                                    rowHeight={90}
                                    style={{ height: 90 * Math.ceil(characters.length / itemsPerRow) }}
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
                                                    <h3>Lv. {character.itemLevel}</h3>
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
                    <Button variant="contained" onClick={() => updateCharacterList()} style={{ cursor: "pointer" }}>
                        캐릭터 정보 업데이트
                    </Button>
                </div>
                <div className="todo-wrap">
                    <Grid container spacing={1.5} overflow={"hidden"} style={{ marginBottom: 20 }}>
                        {characters.map((character) => (
                            <Grid key={character.sortNumber} item >
                                <div style={{ width: "280px" }}>
                                    <div className="character-info"
                                        style={{
                                            backgroundImage: character.characterImage !== null ? `url(${character.characterImage})` : "",
                                            backgroundPosition: character.characterClassName === "도화가" || character.characterClassName === "기상술사" ? "left 10px top -100px" : "left 10px top -40px",
                                            backgroundColor: "gray", // 배경색을 회색으로 설정
                                        }}>
                                        <div className={character.goldCharacter ? "gold-border" : ""}>
                                            {character.goldCharacter ? "골드 획득 지정 캐릭터" : ""}
                                        </div>
                                        <h5 style={{ marginTop: character.goldCharacter ? "0" : "" }}>@{character.serverName}  {character.characterClassName}</h5>
                                        <p>{character.characterName}</p>
                                        <h3>Lv. {character.itemLevel}</h3>
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content">
                                            <div
                                                className={`${character.eponaCheck === true ? "text-done" : ""}`}>
                                                <span>에포나의뢰 & 출석체크</span>
                                            </div>
                                            <button
                                                className={`content-button ${character.eponaCheck === true ? "done" : ""}`}
                                                onClick={() => handleEponaCheck(character.id)}
                                            >
                                                {character.eponaCheck === true ? <DoneIcon /> : <CloseIcon />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content">
                                            <div
                                                className={`${character.chaosCheck === 2 ? "text-done" : ""}`}
                                            >
                                                카오스던전 ({character.chaosGold} gold)
                                            </div>
                                            <SearchIcon onClick={() => openContentModal(character.characterName, "카오스던전")} style={{ cursor: "pointer" }} />
                                            <button
                                                className={`content-button ${character.chaosCheck === 0 ? "" :
                                                    character.chaosCheck === 1 ? "ing" : "done"
                                                    }`}
                                                onClick={() => handleChaosCheck(character.id)}
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
                                            <span style={{ position: "absolute", left: 75, top: 5, color: "white", backgroundColor: "rgba(0,0,0,0.3)", width: 140, textAlign: "center", borderRadius: 4 }}>
                                                휴식게이지 : {character.chaosGauge}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content">
                                            <div
                                                className={`${character.guardianCheck === 1 ? "text-done" : ""}`}
                                            >
                                                가디언토벌 ({character.guardianGold} gold)
                                            </div>
                                            <SearchIcon onClick={() => openContentModal(character.characterName, "가디언토벌")} style={{ cursor: "pointer" }} />
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
                                            <span style={{ position: "absolute", left: 75, top: 5, color: "white", backgroundColor: "rgba(0,0,0,0.3)", width: 140, textAlign: "center", borderRadius: 4 }}>
                                                휴식게이지 : {character.guardianGauge}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="content" style={{ padding: 0, marginTop: 5 }}>
                                        <button
                                            className={"content-button"}
                                            onClick={() => openAddTodoForm(character.characterName, character.goldCharacter)}
                                            style={{ width: '100%', fontSize: 17 }}
                                        >
                                            주간숙제 관리
                                        </button>
                                    </div>
                                    <div className="character-todo">
                                        {character.todoList.map((todo) => (
                                            <div
                                                key={todo.id}
                                                className="content"
                                                style={{
                                                    height: 35,

                                                    position: "relative",
                                                    backgroundColor: "lightsteelblue",
                                                    justifyContent: "space-between",
                                                    borderRadius: 5,
                                                    marginTop: 2,
                                                    boxShadow:
                                                        "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                                                }}
                                            >
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                    <div>
                                                        {todo.message === null || todo.message === "" ? <AddBoxIcon id={"input_field_icon_" + todo.id} onClick={() => changeShow(todo.id)} /> : ""}
                                                    </div>
                                                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                        <div
                                                            className={`${todo.check === true ? "text-done" : ""}`}
                                                        >
                                                            {todo.name}
                                                        </div>
                                                        <div className={"input-field"} id={"input_field_" + todo.id} style={{ display: todo.message === null || todo.message === "" ? "none" : "block" }}>
                                                            <input type="text" spellCheck="false" defaultValue={todo.message}
                                                                onBlur={(e) => updateWeekMessage(character.id, todo.id, e.target.value)}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        updateWeekMessage(character.id, todo.id, e.target.value);
                                                                        e.target.blur();
                                                                    }
                                                                }} 
                                                                placeholder="간단한 메모 추가"
                                                                />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    style={{ width: "100px", height: "100%" }}
                                                    className={`content-button ${todo.check === true ? "done" : ""}`}
                                                    onClick={() => updateWeekCheck(character.id, todo.id)}
                                                >
                                                    {character.goldCharacter ? "[" + todo.gold + " gold]" : ""}
                                                    <div style={{ position: "absolute", top: 15, right: 50, color: "black" }}>{todo.check === true ? <DoneIcon /> : ""}</div>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

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
            </div >

            < Notification
                message={snackbarMessage}
                open={openSnackbar}
                handleClose={handleSnackbarClose}
            />

        </>
    );
}
