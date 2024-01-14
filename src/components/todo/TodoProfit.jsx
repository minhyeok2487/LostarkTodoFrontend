import React from 'react';

const TodoProfit = ({ characters }) => {
    // Check if characters is an array
    if (!Array.isArray(characters)) {
        console.error('Invalid characters data:', characters);
        return null; // or handle the error in another way
    }

    //1. 예상 일일 수익
    const totalDayGold = characters.reduce((accumulator, character) => {
        if (character.settings.showChaos) {
            accumulator += character.chaosGold;
        }
        if (character.settings.showGuardian) {
            accumulator += character.guardianGold;
        }
        return accumulator;
    }, 0);

    //2. 일일 수익
    const getDayGold = characters.reduce((accumulator, character) => {
        if (character.chaosCheck >= 1) {
            for (var i = 0; i < character.chaosCheck; i++) {
                accumulator += character.chaosGold / 2;
            }
        }
        if (character.guardianCheck === 1) {
            accumulator += character.guardianGold;
        }
        return accumulator;
    }, 0);

    //3. 예상 주간 수익
    const totalWeekGold = characters.reduce((accumulator, character) => {
        if (character.goldCharacter) {
            character.todoList.forEach((todo) => {
                accumulator += todo.gold;
            });
        }
        return accumulator;
    }, 0);

    //4. 주간 수익
    const getWeekGold = characters.reduce((accumulator, character) => {
        if (character.goldCharacter) {
            accumulator += character.weekGold;
        }
        return accumulator;
    }, 0);

    const percentage = (getWeekGold / totalWeekGold * 100).toFixed(1);

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
                  {isNaN(percentage) ? (
                      <em style={{left:"30.0%"}}>골드 획득 캐릭터를 지정해주세요</em>
                  ) : (
                      <>
                          <i style={{ width: `${percentage}%` }}></i>
                          <em style={{ textAlign: "center" }}>{percentage} %</em>
                      </>
                  )}
                </span>
                <p className={`${getWeekGold / totalWeekGold}` === 1 ? "on" : ""}>{getWeekGold.toLocaleString()} / <span>{totalWeekGold.toLocaleString()}</span>G</p>
            </div>
        </div>
    );
};

export default TodoProfit;