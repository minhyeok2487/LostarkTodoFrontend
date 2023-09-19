import React, { useState, useEffect } from "react";
import './Todo.css';
import Navbar from '../fragments/Navbar';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { call } from "../service/api-service";
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';


function TodoSortForm() {
    const navigate = useNavigate();
    const [characters, setCharacters] = useState([]);
    const [notification, setNotification] = useState(null); // 상태 추가

    // 초기 캐릭터 정보 불러오기
    useEffect(() => {
        call("/member/characterList", "GET", null)
            .then((response) => {
                setCharacters(response);
            });
    }, []);


    const onDragEnd = (result) => {
        if (!result.destination) {
            return; // Item was dropped outside of the list
        }

        // Reorder characters array based on the drag-and-drop result
        const reorderedCharacters = [...characters];
        const movedCharacter = reorderedCharacters.splice(result.source.index, 1)[0]; // Remove the item from the source index
        reorderedCharacters.splice(result.destination.index, 0, movedCharacter); // Insert the item at the destination index

        // Update the sortNumber of characters based on their new order
        reorderedCharacters.forEach((character, index) => {
            character.sortNumber = index;
        });

        // Update the state with the reordered characters
        setCharacters(reorderedCharacters);
    };

    const grid = 5;

    const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        color: "white",

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle
    });

    const getListStyle = isDraggingOver => ({
        margin: "0 0 0 40px",
        padding: grid,
        width: 300,
        background: isDraggingOver ? "lightblue" : "lightgrey",
    });

    const save = () => {
        setNotification("진행중...");
        call("/member/characterList/sorting", "PATCH", characters)
            .then((response) => {
                alert("순서 업데이트가 완료되었습니다.");
                navigate("/");
            });
    };

    return (
        <div>
            <Navbar />
            <Box height={20} />
            <Button onClick={() => save()} style={{ border: "1px solid blue" }}>저장</Button>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="characterList">
                    {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {characters.map((character, index) => (
                                <Draggable key={character.id.toString()} draggableId={character.id.toString()} index={index}>
                                    {(provided) => (
                                        <div key={character.id.toString()} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}>
                                            <h3>Lv. {character.itemLevel} {character.characterClassName} : {character.characterName}</h3>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div
                className={`notification ${notification ? "show" : ""}`}
            >
                {notification}
            </div>
        </div>
    );
}

export default TodoSortForm;
