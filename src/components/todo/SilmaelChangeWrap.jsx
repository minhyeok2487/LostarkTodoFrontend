import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const SilmaelChangeWrap = () => {
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
                    {/* 여기서 부터 */}
                    <button
                        className={`content-button`}
                        style={{ cursor: "pointer" }}
                    >
                        <CloseIcon />
                    </button>
                    {/* 여기까지 클릭 버튼 */}
                    {/* 여기서 부터 */}
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%" }}>
                        실마엘 혈석 교환
                    </div>
                    {/* 여기까지 출력 글씨 */}
                </div>
            </div>
        </div>
    );
};

export default SilmaelChangeWrap;