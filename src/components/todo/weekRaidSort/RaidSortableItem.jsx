import React from "react";
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {RaidItem} from "./RaidItem";

export function RaidSortableItem(props) {
    const { isDragging, attributes, listeners, setNodeRef, transform, transition }
        = useSortable({ id: props.id });

    const style = {
        transition: transition || undefined,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <RaidItem
            ref={setNodeRef}
            style={style}
            withOpacity={isDragging}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
};