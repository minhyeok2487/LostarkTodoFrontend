import React from 'react';
import Skeleton from "@mui/material/Skeleton";

const MainRaids = ({homeRaid, isLoading}) => {
    return (
        <div className="main-raids">
            <div className="main-raids-header">
                <h2>레이드 별 현황</h2>
            </div>
            {isLoading ? <Skeleton variant="rounded" width="100%" height="90%" sx={{marginTop:2}} /> :
                <>
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
                </>}
        </div>
    );
};

export default MainRaids;