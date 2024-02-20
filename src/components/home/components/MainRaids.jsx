import React from 'react';

const MainRaids = () => {
    return (
        <div className="main-raids"
            // 개발 후 스타일 지우기
            //  style={{background:"#B0E0E6"}}
        >
            <div className="main-raids-header">
                <h2>레이드 별 현황</h2>
            </div>
            <div className="main-raids-info">
                <p>레이드 완주율</p>
            </div>
            <div className="main-raids-content">
                <div className="radis-content-box">
                    <p>일리아칸</p>
                    <p>2 / 6캐릭 중</p>
                </div>
                <div className="radis-content-box">
                    <p>카양겔</p>
                    <p>0 / 5캐릭 중</p>
                </div>
                <div className="radis-content-box">
                    <p>카멘</p>
                    <p>0 / 3캐릭 중</p>
                </div>
                <div className="radis-content-box">
                    <p>상아탑</p>
                    <p>0 / 4캐릭 중</p>
                </div>
                <div className="radis-content-box">
                    <p>에키드나</p>
                    <p>0 / 2캐릭 중</p>
                </div>
            </div>
        </div>
    );
};

export default MainRaids;