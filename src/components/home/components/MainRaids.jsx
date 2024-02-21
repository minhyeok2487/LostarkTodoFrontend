import React from 'react';

const MainRaids = ({homeRaid}) => {
    return (
        <div className="main-raids">
            <div className="main-raids-header">
                <h2>레이드 별 현황</h2>
            </div>
            <div className="main-raids-info">
                <p>레이드 완주율</p>
            </div>
            <div className="main-raids-content">
                {homeRaid.map((raid, index) => (
                    <div key={index} className="radis-content-box">
                        <p>{raid.name}</p>
                        <p>{raid.count} / {raid.totalCount} 캐릭 중</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainRaids;