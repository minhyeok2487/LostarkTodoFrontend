import React from 'react';
import * as todoApi from '../../apis/todo';
import TodoWeekRaid from "../../components/todo/TodoWeekRaid";
import {Button} from "@mui/material";

const TodoWeekRaidContainer = ({
                                   characters,
                                   setCharacters,
                                   character,
                                   setModalTitle,
                                   setModalContent,
                                   setOpenModal,
                                   setIsLoading,
                                   showMessage
                               }) => {
    /*캐릭터 주간숙제 추가 폼*/
    const getAddTodoFormData = async (characterId, characterName) => {
        try {
            return await todoApi.getTodoFormData(characterId, characterName);
        } catch (e) {
            console.error('Error getAddTodoFormData:', e);
        }
    };

    const makeAddTodoForm = (characterId, characterName, goldCharacter, goldCheckVersion, data) => {
        setModalTitle(characterName + " 주간 숙제 관리");
        const todosByCategory = {};
        const todosGoldCheck = {};

        data.forEach((todo) => {
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
            if (!todosGoldCheck[todo.weekCategory]) {
                todosGoldCheck[todo.weekCategory] = todo.goldCheck;
            } else {
                todosGoldCheck[todo.weekCategory] = todosGoldCheck[todo.weekCategory] || todo.goldCheck;
            }
        });

        const content = Object.entries(todosByCategory).map(([weekCategory, todos], index) => (
            <div key={index} className="week-form-wrap">
                <div className="week-category-name">
                    <p>{weekCategory}</p>
                    {goldCheckVersion &&
                        (todosGoldCheck[weekCategory] ?
                            <button className="gold-check-btn checked"
                                    onClick={() => updateWeekGoldCheck(weekCategory, characterName, !todosGoldCheck[weekCategory])}>
                                골드 획득 지정 해제
                            </button> :
                            <button className="gold-check-btn"
                                    onClick={() => updateWeekGoldCheck(weekCategory, characterName, !todosGoldCheck[weekCategory])}>
                                골드 획득 지정
                            </button>
                        )
                    }
                </div>
                <div className="week-category-wrap" style={{flexDirection: "column"}}>
                    {Object.entries(todos).map(([weekContentCategory, todo], todoIndex) => ((todo.length > 0 &&
                        <div key={todoIndex} style={{display: 'flex'}}>
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
                                {weekContentCategory}
                                <em>{todo.reduce((sum, todoItem) => sum + todoItem.gold, 0)}G</em>
                            </button>
                            {todo.map((todoItem) => (<button
                                key={todoItem.id}
                                className="button"
                                style={{
                                    border: todoItem.checked ? "1px solid black" : "",
                                    fontWeight: todoItem.checked ? "bold" : ""
                                }}
                                onClick={() => updateWeekTodo(characterId, characterName, todoItem)}
                            >
                                {todoItem.gate}관문 <em>{todoItem.gold}G</em>
                            </button>))}
                        </div>)))}
                </div>
            </div>));

        const modalContent = (
            <div>
                <div style={{display:'flex', flexDirection:"row", justifyContent:"space-around"}}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => updateGoldCharacter(characterName)}
                        style={{cursor: "pointer"}}
                    >
                        골드 획득 캐릭터 지정 {goldCharacter ? "해제" : ""}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => updateGoldCheckVersion(characterId)}
                        style={{cursor: "pointer"}}
                    >
                        골드 획득 체크 방식 : {goldCheckVersion ? "체크 방식" : "상위 3개"}
                    </Button>
                </div>
                {content}
            </div>
        );
        setModalContent(modalContent);
        setOpenModal(true);
    }

    const openAddTodoForm = async (characterId, characterName, goldCharacter, goldCheckVersion) => {
        const data = await getAddTodoFormData(characterId, characterName);
        makeAddTodoForm(characterId, characterName, goldCharacter, goldCheckVersion, data);
    };

    /*2-1. 캐릭터 주간 숙제 업데이트(추가/삭제)*/
    const updateWeekTodo = async (characterId, characterName, content) => {
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.characterName === characterName) {
                    try {
                        const response = await todoApi.updateWeekTodo(characterId, characterName, content);
                        await openAddTodoForm(characterId, characterName, response.goldCharacter, response.settings.goldCheckVersion);
                        character.todoList = response.todoList;
                        return character;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updateWeekTodo:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /*2-2.캐릭터 주간 숙제 업데이트 All(추가/삭제)*/
    const updateWeekTodoAll = async (characterId, characterName, content) => {
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.characterName === characterName) {
                    try {
                        const response = await todoApi.updateWeekTodoAll(characterId, characterName, content);
                        await openAddTodoForm(characterId, characterName, response.goldCharacter, response.settings.goldCheckVersion);
                        character.todoList = response.todoList;
                        return character;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updateWeekTodo All:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /*3-1.주간숙제 체크*/
    const updateWeekCheck = async (characterName, todoContent) => {
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                let updatedCharacter;
                if (character.characterName === characterName) {
                    try {
                        updatedCharacter = await todoApi.updateWeekCheck(character.id, characterName,
                            todoContent.weekCategory, todoContent.currentGate, todoContent.totalGate);
                        return updatedCharacter;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updateWeekCheck:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /*3-2. 캐릭터 주간숙제 체크 All*/
    const updateWeekCheckAll = async (e, characterName, todoContent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                let updatedCharacter;
                if (character.characterName === characterName) {
                    try {
                        updatedCharacter = await todoApi.updateWeekCheckAll(character.id, characterName, todoContent.weekCategory);
                        return updatedCharacter;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updateWeekCheckAll:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /*4.골드획득 캐릭터 업데이트(v2 업데이트 완료)*/
    const updateGoldCharacter = async (characterName) => {
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.characterName === characterName) {
                    try {
                        const response = await todoApi.updateGoldCharacter(character.id, characterName);
                        character.goldCharacter = response.goldCharacter;
                        setOpenModal(false);
                        if (character.goldCharacter) {
                            showMessage(characterName + "골드 획득 캐릭터 지정");
                        } else {
                            showMessage(characterName + "골드 획득 캐릭터 지정 해제");
                        }
                        return character;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updateWeekTodo All:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateGoldCheckVersion = async (characterId) => {
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.id === characterId) {
                    try {
                        const response = await todoApi.updateGoldCheckVersion(character.id, character.characterName);
                        character.settings.goldCheckVersion = response.settings.goldCheckVersion;
                        character.todoList = response.todoList;
                        await openAddTodoForm(character.id, character.characterName, character.goldCharacter, character.settings.goldCheckVersion);
                        return character;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updateWeekTodo All:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // 컨텐츠 골드 획득 지정
    const updateWeekGoldCheck = async (weekCategory, characterName, updateValue) => {
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.characterName === characterName) {
                    try {
                        const response = await todoApi.updateCheckGold(character.id, characterName, weekCategory, updateValue);
                        makeAddTodoForm(character.id, characterName, character.goldCharacter, character.settings.goldCheckVersion, response.weekContentDtoList);
                        return response.characterDto;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updateWeekGoldCheck:', error);
        } finally {
            setIsLoading(false);
        }
    }

    /*5. 주간숙제 메모 노출/미노출*/
    const changeShow = async (characterId, todoId) => {
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                const updatedTodoList = character.todoList.map((todo) => {
                    if (todo.id === todoId) {
                        if (todo.message === null) {
                            return {...todo, message: ""};
                        }
                    }
                    return todo;
                });
                return {...character, todoList: updatedTodoList};
            }
            return character;
        });
        setCharacters(updatedCharacters);
    }

    /*6. 주간숙제 메모*/
    const updateWeekMessage = async (characterId, todoId, message) => {
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.id === characterId) {
                    const updatedTodoList = await Promise.all(character.todoList.map(async (todo) => {
                        if (todo.id === todoId) {
                            try {
                                const response = await todoApi.updateWeekMessage(character.id, todoId, message);
                                return {...todo, message: response.message};
                            } catch (error) {
                                showMessage(error);
                                return {
                                    ...todo,
                                };
                            }
                        }
                        return todo;
                    }));
                    return {...character, todoList: updatedTodoList};
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updateWeekMessage:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TodoWeekRaid
            character={character}
            characters={characters}
            setCharacters={setCharacters}
            openAddTodoForm={openAddTodoForm}
            updateWeekCheck={updateWeekCheck}
            updateWeekCheckAll={updateWeekCheckAll}
            changeShow={changeShow}
            updateWeekMessage={updateWeekMessage}
            setIsLoading={setIsLoading}
            showMessage={showMessage}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            setOpenModal={setOpenModal}
        />);
};

export default TodoWeekRaidContainer;