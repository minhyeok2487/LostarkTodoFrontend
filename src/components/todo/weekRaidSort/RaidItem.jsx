import React, {forwardRef} from 'react';
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from "@mui/icons-material/AddBox";

export const RaidItem = forwardRef(({id, withOpacity, isDragging, style, ...props}, ref) => {
    const inlineStyles = {
        opacity: withOpacity ? '0.5' : '1',
        transformOrigin: '50% 50%',
        borderRadius: '5px',
        cursor: isDragging ? 'grabbing' : 'grab',
        boxShadow: isDragging ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        ...style,
    };
    return (
        <div className="content-wrap" ref={ref} style={inlineStyles} {...props}>
            <div
                className="content"
                style={{
                    height: 75,
                    position: "relative",
                    justifyContent: "space-between",
                    fontSize: 14,
                }}
            >
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}>
                    <button
                        className={`content-button ${props.todo.check ? "done" : ""}`}
                    >
                        {props.todo.check ? <DoneIcon/> : <CloseIcon/>}
                    </button>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        width: "100%"
                    }}>
                        <div
                            className={`${props.todo.check ? "text-done" : ""}`}
                            dangerouslySetInnerHTML={{__html: props.todo.name.replace(/\n/g, "<br />")}} // pub 이부분 원래로 원복
                        >
                        </div>
                        <div
                            className={`${props.todo.check ? "text-done" : ""}`}
                        >
                            <span className="gold">{props.character.goldCharacter ? props.todo.gold + " G" : ""}</span> {/* pub span gold 추가 */}
                        </div>
                        <div className={"input-field"} id={"input_field_" + props.todo.id}>
                            {props.todo.message !== null && (
                                <input
                                    type="text"
                                    spellCheck="false"
                                    defaultValue={props.todo.message}
                                    style={{width: "90%"}}
                                    placeholder="메모 추가"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="content gauge-box"
                 style={{height: 16, padding: 0, position: "relative"}}> {/* pub guage-box 클래스추가 */}
                {Array.from({length: props.todo.totalGate}, (_, index) => (
                    <div key={`${props.todo.id}-${index}`} className="gauge-wrap"
                         style={{
                             backgroundColor: props.todo.currentGate > index ? "#ffbfb6" : "", // pub
                             width: 100 / props.todo.totalGate + "%",
                             alignItems: "center",
                             justifyContent: "center",
                             color: "var(--text-color)"
                         }}>
                        <span>{index + 1}관문</span>
                    </div>
                ))}
                <span className="gauge-text"></span>
            </div>
        </div>
    );
});