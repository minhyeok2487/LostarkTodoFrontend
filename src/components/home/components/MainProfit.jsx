import React from 'react';

const MainProfit = ({characters}) => {
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
            <div className="content-box">
                <div>
                    <p>일일 숙제</p>
                    <p>완료 {getDay} / 총 {totalDay}</p>
                </div>
                <span className="bar">
                    <i style={{width: `${getDay}/${totalDay}%`}}></i>
                </span>
            </div>
            <div className="content-box">
                <div>
                    <p>주간 숙제</p>
                    <p>완료 {getWeek} / 총 {totalWeek}</p>
                </div>
                <span className="bar">
                    <i style={{width: `${getWeek}/${totalWeek}%`}}></i>
                </span>
            </div>
            <p>이번주 @@@@@@ 만큼 벌었어요!!</p>
        </div>
    );
};

export default MainProfit;