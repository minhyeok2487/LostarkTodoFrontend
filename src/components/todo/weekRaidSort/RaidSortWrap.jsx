import React, { useState } from 'react';
import { closestCenter, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import {RaidItem} from "./RaidItem";
import {RaidSortableItem} from "./RaidSortableItem";

const RaidSortWrap = ({character, setCharacters, characters}) => {
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    function handleDragStart(event) {
        const { active } = event;
        setActiveId(active.id);
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id !== over.id) {
            setCharacters((prevCharacters) => {
                const updateCharacter = prevCharacters.find(el => el.id === character.id);
                if (updateCharacter) {
                    const oldIndex = updateCharacter.todoList.findIndex(el => el.id === active.id);
                    const newIndex = updateCharacter.todoList.findIndex(el => el.id === over.id);

                    const updatedTodoList = arrayMove(updateCharacter.todoList, oldIndex, newIndex);
                    const updatedCharacters = prevCharacters.map((char) => {
                        return char.id === updateCharacter.id ? { ...char, todoList: updatedTodoList } : char;
                    });

                    return updatedCharacters;
                }

                return prevCharacters;
            });
        }

        setActiveId(null);
    }


    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={character.todoList} strategy={rectSortingStrategy}>
                <div>
                    {character.todoList.map(({ id, ...todo }) => (
                        <RaidSortableItem key={id.toString()} id={id} todo={todo} character={character} />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <RaidItem todo={character.todoList.find(el => el.id === activeId)} character={character} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default RaidSortWrap;
