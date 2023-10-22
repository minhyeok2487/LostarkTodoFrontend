import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const WeekEponaWrap = () => {
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
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", cursor: "pointer" }}>
                    <button
                        className={`content-button`}
                        style={{ cursor: "pointer" }}
                    >
                        <CloseIcon />
                    </button>
                    <div style={{ width: "100%" }}>
                        주간에포나
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekEponaWrap;