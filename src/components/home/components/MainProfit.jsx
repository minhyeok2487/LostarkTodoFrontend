import React from 'react';

const MainProfit = () => {
    // className="content-box" 이름 바꾸기
    return (
        <div className="main-profit"
            // 개발 후 스타일 지우기
            style={{background:"#ffffe0"}}
        >
            <h1>내 숙제</h1>
            <div className="content-box">
                <div>
                    <p>일일 숙제</p>
                    <p>완료 4 / 완료 8</p>
                </div>
                <span className="bar">
                    <i style={{width: "50%"}}></i>
                </span>
            </div>
            <div className="content-box">
                <div>
                    <p>주간 숙제</p>
                    <p>완료 16 / 완료 40</p>
                </div>
                <span className="bar">
                    <i style={{width: "50%"}}></i>
                </span>
            </div>
            <p>이번주 @@@@@@ 만큼 벌었어요!!</p>
        </div>
    );
};

export default MainProfit;