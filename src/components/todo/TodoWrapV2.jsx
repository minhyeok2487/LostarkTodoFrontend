import React from 'react';
import { call } from "../../service/api-service";
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const TodoWrapV2 = ({
    characters,
    setCharacters,
    character,
    setModalTitle,
    setModalContent,
    setOpenModal,
    setShowLinearProgress,
    showMessage
}) => {
    //1.캐릭터 주간숙제 추가 폼
    const openAddTodoForm = (characterName, goldCharacter) => {
        setModalTitle(characterName + " 주간 숙제 관리");
        call("/character/week/v3/" + characterName, "GET", null).then((response) => {
            const todosByCategory = {};

            response.forEach((todo) => {
                if (!todosByCategory[todo.weekCategory]) {
                    todosByCategory[todo.weekCategory] = {
                        노말: [],
                        하드: [],
                    };
                }
                if (todo.weekContentCategory === '노말') {
                    todosByCategory[todo.weekCategory]['노말'].push(todo);
                } else {
                    todosByCategory[todo.weekCategory]['하드'].push(todo);
                }
            });
            const content = Object.entries(todosByCategory).map(
                ([weekCategory, todos], index) => (
                    <div key={index}>
                        <p>{weekCategory}</p>
                        <div className="week-category-wrap" style={{ flexDirection: "column" }}>
                            {Object.entries(todos).map(([weekContentCategory, todo], todoIndex) => (
                                (todo.length > 0 &&
                                    <div key={todoIndex} style={{ display: 'flex' }}>
                                        <button
                                            key={todo.id}
                                            className="button"
                                            onClick={() => updateWeekTodoAll(characterName, todo)}
                                            style={{ backgroundColor: "#F6CEF5" }}
                                        >
                                            {weekContentCategory} ({todo.reduce((sum, todoItem) => sum + todoItem.gold, 0)}G)
                                        </button>
                                        {todo.map((todoItem) => (
                                            <button
                                                key={todoItem.id}
                                                className={`button ${todoItem.checked === true ? "done" : ""}`}
                                                onClick={() => updateWeekTodo(characterName, todoItem)}
                                            >
                                                {todoItem.gate}관문 ({todoItem.gold}G)
                                            </button>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )
            );

            const modalContent = (
                <div>
                    <Button
                        variant="contained"
                        onClick={() => updateGoldCharacter(characterName)}
                        style={{ cursor: "pointer" }}
                    >
                        골드 획득 캐릭터 지정 {goldCharacter ? "해제" : ""}
                    </Button>
                    {content}
                </div>
            );

            setModalContent(modalContent);
            setOpenModal(true);
        });
    };

    //2-1. 캐릭터 주간 숙제 업데이트(추가/삭제)
    const updateWeekTodo = (characterName, content) => {
        setShowLinearProgress(true);

        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                call("/character/week/v3/" + characterName, "POST", content)
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

    //2-2.캐릭터 주간 숙제 업데이트 All(추가/삭제)
    const updateWeekTodoAll = (characterName, content) => {
        setShowLinearProgress(true);

        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                call("/character/week/v3/all/" + characterName, "POST", content)
                    .then((response) => {
                        setShowLinearProgress(false);
                        openAddTodoForm(characterName, response.goldCharacter);
                        character.todoList = response.todoList;
                    })
                    .catch((error) => {
                        setShowLinearProgress(false);
                        alert(error.errorMessage);
                    });
            }
            return character;
        });
        setCharacters(updatedCharacters);
    };

    //3-1. 주간숙제 체크
    const updateWeekCheck = async (characterName, todo) => {
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                var updatedCharacter = {
                    ...character
                };
                const updateContent = {
                    characterName: characterName,
                    weekCategory: todo.weekCategory,
                    currentGate: todo.currentGate,
                    totalGate: todo.totalGate
                };
                return call("/character/week/v3/check", "PATCH", updateContent)
                    .then((response) => {
                        setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        setShowLinearProgress(false);
                        alert(error.errorMessage);
                        return null;
                    });
            }
            return character;
        });
        const updatedCharactersWithTodo = await Promise.all(updatedCharacters);
        setCharacters(updatedCharactersWithTodo);
    };

    //3-2. 캐릭터 주간숙제 체크 All
    const updateWeekCheckAll = async (e, characterName, todo) => {
        e.preventDefault();
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                var updatedCharacter = {
                    ...character
                };
                const updateContent = {
                    characterName: characterName,
                    weekCategory: todo.weekCategory,
                };
                return call("/character/week/v3/check/all", "PATCH", updateContent)
                    .then((response) => {
                        setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        setShowLinearProgress(false);
                        alert(error.errorMessage);
                        return null;
                    });
            }
            return character;
        });
        const updatedCharactersWithTodo = await Promise.all(updatedCharacters);
        setCharacters(updatedCharactersWithTodo);
    };

    //4.골드획득 캐릭터 업데이트(v2 업데이트 완료)
    const updateGoldCharacter = (characterName) => {
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                var updatedCharacter = {
                    characterId: character.id,
                    characterName: character.characterName
                };
                call("/v2/character/gold-character/", "PATCH", updatedCharacter)
                    .then((response) => {
                        setShowLinearProgress(false);
                        character.goldCharacter = response.goldCharacter;
                        setOpenModal(false);
                        if (character.goldCharacter) {
                            showMessage(characterName + "골드 획득 캐릭터 지정");
                        } else {
                            showMessage(characterName + "골드 획득 캐릭터 지정 해제");
                        }
                    })
                    .catch((error) => {
                        showMessage(error.errorMessage);
                        setShowLinearProgress(false);
                    });
            }
            return character;
        });
        setCharacters(updatedCharacters);
    };

    //5. 주간숙제 메모 노출/미노출
    const changeShow = (todoId) => {
        const inputField = document.getElementById("input_field_" + todoId);
        if (inputField.style.display === "none") {
            inputField.style.display = "block";
        } else {
            inputField.style.display = "none";
        }
    }

    //6. 주간숙제 메모
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
                        call("/character/week/v3/message", "PATCH", updateContent)
                            .then((response) => {
                                setShowLinearProgress(false);
                                const inputFieldIcon = document.getElementById("input_field_icon_" + todoId);
                                const inputField = document.getElementById("input_field_" + todoId);
                                if (response.message === "" || response.message === null) {
                                    inputFieldIcon.style.display = "block";
                                    inputField.style.display = "none";
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

    return (
        <div className="character-wrap">
            <div className="content" style={{ padding: 0, display: character.settings.showWeekTodo ? "block" : "none" }}>
                <p className="title">주간 숙제</p>{/* pub 추가 */}
                <p className="txt">마우스 우클릭 시 한번에 체크됩니다</p>{/* pub 추가 */}
                <button
                    className={"content-button"}
                    onClick={() => openAddTodoForm(character.characterName, character.goldCharacter)}
                    style={{ width: '101%', fontWeight: "bold", fontSize: 16 }}
                >
                    편집{/* pub 추가 */}
                </button>
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
                                fontSize: 14, //pub 수정
                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", cursor:"pointer" }}>
                                {/* 여기서 부터 */}
                                <button
                                    className={`content-button ${todo.check ? "done" : ""}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => updateWeekCheck(character.characterName, todo)}
                                    onContextMenu={(e) => updateWeekCheckAll(e, character.characterName, todo)}
                                >
                                    {todo.check ? <DoneIcon /> : <CloseIcon />}
                                </button>
                                {/* 여기까지 클릭 버튼 */}
                                {/* 여기서 부터 */}
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
                                    <div
                                        className={`${todo.check ? "text-done" : ""}`}
                                        onClick={() => updateWeekCheck(character.characterName, todo)}
                                        onContextMenu={(e) => updateWeekCheckAll(e, character.characterName, todo)}
                                        dangerouslySetInnerHTML={{ __html: todo.name.replace(/\n/g, "<br />") }} // pub 이부분 원래로 원복
                                    >
                                    </div>
                                    <div
                                        className={`${todo.check ? "text-done" : ""}`}
                                        onClick={() => updateWeekCheck(character.characterName, todo)}
                                        onContextMenu={(e) => updateWeekCheckAll(e, character.characterName, todo)}
                                    >
                                        <span class="gold">{character.goldCharacter ? todo.gold + " G" : ""}</span>  {/* pub span gold 추가 */}
                                    </div>
                                    <div className={"input-field"} id={"input_field_" + todo.id} style={{ display: todo.message === null || todo.message === "" ? "none" : "block" }}>
                                        <input type="text" spellCheck="false" defaultValue={todo.message} style={{ width: "90%" }}
                                            onBlur={(e) => updateWeekMessage(character.id, todo.id, e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    updateWeekMessage(character.id, todo.id, e.target.value);
                                                    e.target.blur();
                                                }
                                            }}
                                            placeholder="메모 추가"
                                        />
                                    </div>
                                </div>
                                {/* 여기까지 출력 글씨 */}
                                {/* 여기서 부터 */}
                                <div>
                                    {todo.message === null || todo.message === "" ? <AddBoxIcon id={"input_field_icon_" + todo.id} onClick={() => changeShow(todo.id)} /> : ""}
                                </div>
                                {/* 여기까지 "+" 버튼 */}
                            </div>
                        </div>
                        <div className="content gauge-box" style={{ height: 16, padding: 0, position: "relative" }}> {/* pub guage-box 클래스추가 */}
                            {Array.from({ length: todo.totalGate }, (_, index) => (
                                <div key={`${todo.id}-${index}`} className="gauge-wrap"
                                    style={{
                                        backgroundColor: todo.currentGate > index ? "#fee1dd" : "", // pub
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
        </div>
    );
};

export default TodoWrapV2;