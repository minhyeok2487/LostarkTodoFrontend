import React from 'react';
import Skeleton from "@mui/material/Skeleton";

const MainProfit = ({characters, weekTotalGold, dayTotalGold, isLoading}) => {
    // className="content-box" 이름 바꾸기

    if (!Array.isArray(characters)) {
        console.error('Invalid characters data:', characters);
        return null;
    }

    //1. 총 일일 숙제
    const totalDay = characters.reduce((accumulator, character) => {
        if (character.settings.showChaos) {
            accumulator++;
        }
        if (character.settings.showGuardian) {
            accumulator++;
        }
        return accumulator;
    }, 0);

    //2. 일일 숙제
    const getDay = characters.reduce((accumulator, character) => {
        if (character.chaosCheck === 2) {
            accumulator++;
        }
        if (character.guardianCheck === 1) {
            accumulator++;
        }
        return accumulator;
    }, 0);

    //3. 총 주간 숙제
    const totalWeek = characters.reduce((accumulator, character) => {
        if (character.goldCharacter) {
            character.todoList.forEach((todo) => {
                accumulator++;
            });
        }
        return accumulator;
    }, 0);

    //4. 주간 숙제
    const getWeek = characters.reduce((accumulator, character) => {
        if (character.goldCharacter) {
            character.todoList.forEach((todo) => {
                if (todo.check) {
                    accumulator++;
                }
            });
        }
        return accumulator;
    }, 0);

    return (
        <div className="main-profit">
            <h1>내 숙제</h1>
            {isLoading ? <Skeleton variant="rounded" width="100%" height="85%" sx={{marginTop:2}} /> :
            <>
                <div className="main-profit-box days">
                    <div className="main-profit-text">
                        <span>일일 숙제</span>
                        <span>완료 {getDay} / 총 {totalDay}</span>
                    </div>
                    <span className="bar">
                        <i style={{ width: `${getDay / totalDay * 100}%` }}></i>
                        <em>{(getDay / totalDay * 100).toFixed(1)} %</em>
                    </span>
                </div>
                <div className="main-profit-box weeks">
                    <div className="main-profit-text">
                        <span>주간 숙제</span>
                        <span>완료 {getWeek} / 총 {totalWeek}</span>
                    </div>
                    <span className="bar">
                        <i style={{ width: `${getWeek / totalWeek * 100}%` }}></i>
                        <em>{(getWeek / totalWeek * 100).toFixed(1)} %</em>
                    </span>
                </div>
                <div>
                    <p>이번주 총 수익 : {(dayTotalGold + weekTotalGold).toFixed(2)} Gold
                        / 일일 : {dayTotalGold.toFixed(2)} / 주간 : {weekTotalGold}</p>
                </div>
            </>}
        </div>
    );
};

export default MainProfit;