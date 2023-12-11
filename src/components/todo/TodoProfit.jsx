import React from 'react';

const TodoProfit = ({
    getDayGold,
    totalDayGold,
    getWeekGold,
    totalWeekGold
}) => {
    return (
        <div className="setting-wrap">
            <div className="content-box">
                <p>일일 수익</p>
                <span className="bar">
                    <i style={{ width: `${getDayGold / totalDayGold * 100}%` }}></i>
                    <em style={{ textAlign: "center" }}>{(getDayGold / totalDayGold * 100).toFixed(1)} %</em>
                </span>
                <p>{getDayGold.toFixed(2)} / <span>{totalDayGold.toFixed(2)}</span>G</p>
            </div>
            <div className="content-box">
                <p>주간 수익</p>
                <span className="bar">
                    <i style={{ width: `${getWeekGold / totalWeekGold * 100}%` }}></i>
                    <em style={{ textAlign: "center" }}>{(getWeekGold / totalWeekGold * 100).toFixed(1)} %</em>
                </span>
                <p className={`${getWeekGold / totalWeekGold}` === 1 ? "on" : ""}>{getWeekGold.toLocaleString()} / <span>{totalWeekGold.toLocaleString()}</span>G</p>
            </div>
        </div>
    );
};

export default TodoProfit;