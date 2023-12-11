import React from 'react';
import TodoProfit from '../../components/todo/TodoProfit';

const TodoProfitsContainer = ({ characters }) => {
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

    return (
        <TodoProfit
            totalDayGold={totalDayGold}
            getDayGold={getDayGold}
            totalWeekGold={totalWeekGold}
            getWeekGold={getWeekGold}
        />
    );
};

export default TodoProfitsContainer;