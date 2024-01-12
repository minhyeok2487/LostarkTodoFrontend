import React, {forwardRef} from 'react';

export const Item = forwardRef(({id, withOpacity, isDragging, style, ...props}, ref) => {
    const inlineStyles = {
        opacity: withOpacity ? '0.5' : '1',
        transformOrigin: '50% 50%',
        borderRadius: '5px',
        cursor: isDragging ? 'grabbing' : 'grab',
        boxShadow: isDragging ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        backgroundImage: props.character.characterImage !== null ? `url(${props.character.characterImage})` : "",
        backgroundPosition: (props.character.characterClassName === "도화가" || props.character.characterClassName === "기상술사") ? "left 25px top -70px" : "left 25px top -35px",
        backgroundColor: "gray",
        ...style,
    };
    return (
        <div className="character-info-mini" ref={ref} style={inlineStyles} {...props}>
            <p>{props.character.characterName}</p>
            <p>Lv. {props.character.itemLevel}</p>
        </div>
    );
});