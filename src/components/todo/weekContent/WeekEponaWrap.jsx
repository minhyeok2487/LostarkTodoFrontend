import React from 'react';
import {call} from "../../../service/api-service";
import CloseIcon from "@mui/icons-material/Close";

const WeekEponaWrap = ({
                           character,
                           weekEponaCheck,
                           weekEponaCheckAll
                       }) => {
    return (
        <div className="content-wrap">
            <div
                className="content"
                style={{
                    height: 35,
                    position: "relative",
                    justifyContent: "space-between",
                    fontSize: 14, //pub 수정
                }}
            >
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center", cursor: "pointer"}}
                     onClick={() => weekEponaCheck(character.id)}
                     onContextMenu={(e) => weekEponaCheckAll(e, character.id)}
                >
                    <button
                        className={`content-button ${character.weekEpona === 3 ? "done" :
                            character.weekEpona === 1 ? "ing" :
                                character.weekEpona === 2 ? "ing2" : ""}`}
                        style={{cursor: "pointer"}}
                    >
                        <CloseIcon/>
                    </button>
                    <div
                        className={`${character.weekEpona === 3 ? "text-done" : ""}`}
                        style={{width: "100%"}}
                    >
                        주간에포나
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekEponaWrap;