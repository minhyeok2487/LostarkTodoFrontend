import React from 'react';

const TodoWeekContainer = ({
    characters,
    setCharacters,
    character,
    setModalTitle,
    setModalContent,
    setOpenModal,
    setIsLoading,
    showMessage
}) => {
    //1.캐릭터 주간숙제 추가 폼
    const openAddTodoForm = (characterId, characterName, goldCharacter) => {
        setModalTitle(characterName + " 주간 숙제 관리");
        call("/v2/character/week/form/" + characterId + "/" + characterName, "GET", null)
            .then((response) => {
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
                                                onClick={() => updateWeekTodoAll(characterId, characterName, todo)}
                                                style={{
                                                    backgroundColor: todo.reduce((count, todoItem) => count + (todoItem.checked ? 1 : 0), 0) === todo.length ? "#1ddfee" : "#fee1dd",
                                                    border: todo.reduce((count, todoItem) => count + (todoItem.checked ? 1 : 0), 0) === todo.length ? "1px solid black" : "",
                                                    fontWeight: todo.reduce((count, todoItem) => count + (todoItem.checked ? 1 : 0), 0) === todo.length ? "bold" : "",
                                                }}
                                            >
                                                {weekContentCategory} <em>{todo.reduce((sum, todoItem) => sum + todoItem.gold, 0)}G</em>
                                            </button>
                                            {todo.map((todoItem) => (
                                                <button
                                                    key={todoItem.id}
                                                    className="button"
                                                    style={{
                                                        border: todoItem.checked ? "1px solid black" : "",
                                                        fontWeight: todoItem.checked ? "bold" : ""
                                                    }}
                                                    onClick={() => updateWeekTodo(characterId, characterName, todoItem)}
                                                >
                                                    {todoItem.gate}관문 <em>{todoItem.gold}G</em>
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
    const updateWeekTodo = (characterId, characterName, content) => {
        setShowLinearProgress(true);

        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                call("/v2/character/week/raid/" + characterId + "/" + characterName, "POST", content)
                    .then((response) => {
                        setShowLinearProgress(false);
                        openAddTodoForm(characterId, characterName, response.goldCharacter);
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
    const updateWeekTodoAll = (characterId, characterName, content) => {
        setShowLinearProgress(true);

        const updatedCharacters = characters.map((character) => {
            if (character.characterName === characterName) {
                call("/v2/character/week/raid/" + characterId + "/" + characterName + "/all", "POST", content)
                    .then((response) => {
                        setShowLinearProgress(false);
                        openAddTodoForm(characterId, characterName, response.goldCharacter);
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
                    characterId: character.id,
                    characterName: characterName,
                    weekCategory: todo.weekCategory,
                    currentGate: todo.currentGate,
                    totalGate: todo.totalGate
                };
                return call("/v2/character/week/raid/check", "PATCH", updateContent)
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
    const updateWeekCheckAll = async (e, characterName, todo) => {
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
                return call("/v2/character/week/raid/check/all", "PATCH", updateContent)
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
                            characterId: character.id,
                            characterName: character.characterName,
                            todoId: todoId,
                            message: message,
                        };
                        call("/v2/character/week/message", "PATCH", updateContent)
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
        <div>

        </div>
    );
};

export default TodoWeekContainer;