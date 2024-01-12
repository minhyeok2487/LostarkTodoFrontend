import React, { useState } from 'react';
import { closestCenter, DndContext, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import {Item} from "./Item";

const SortWrap = ({ characters, setCharacters, itemsPerRow, setItemsSwapState }) => {
    const [activeId, setActiveId] = useState(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    function handleDragStart(event) {
        const { active } = event;
        setActiveId(active.id);
        setItemsSwapState(true);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        if (active.id !== over.id) {
            setCharacters((characters) => {
                const oldIndex = characters.findIndex(el => el.id === active.id);
                const newIndex = characters.findIndex(el => el.id === over.id);

                if (oldIndex !== -1 && newIndex !== -1) {
                    const updatedCharacters = arrayMove(characters, oldIndex, newIndex);

                    // Update sortNumber based on the new order
                    const updatedCharactersWithSortNumber = updatedCharacters.map((character, index) => ({
                        ...character,
                        sortNumber: index,
                    }));

                    return updatedCharactersWithSortNumber;
                }

                return characters;
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
            <SortableContext items={characters} strategy={rectSortingStrategy}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
                        gridGap: 10,
                        padding: 5,
                    }}
                >
                    {characters.map(({ id, ...character }) => (
                        <SortableItem key={id.toString()} id={id} character={character} />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <Item character={characters.find(el => el.id === activeId)} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default SortWrap;
