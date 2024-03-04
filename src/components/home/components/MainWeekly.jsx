import React, { useState } from 'react';
import Skeleton from "@mui/material/Skeleton";

const MainWeekly = ({isLoading}) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePrevWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() - 7); // Move back by 7 days (1 week)
        setCurrentDate(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + 7); // Move forward by 7 days (1 week)
        setCurrentDate(newDate);
    };

    const handleDateBoxClick = (date) => {
        setCurrentDate(date);
    };

    const dayOfWeek = currentDate.getDay(); // 0 (일요일) ~ 6 (토요일)
    const offset = dayOfWeek >= 3 ? dayOfWeek - 3 : 4 + dayOfWeek;
    const wednesdayDate = new Date(currentDate);
    wednesdayDate.setDate(currentDate.getDate() - offset);
    const monthYearString = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

    return (
        <div className="main-weekly">
            <h2>주간 레이드 일정
                <div className="main-weekly-header">
                    <div>
                        <button className="arrow-prev" onClick={handlePrevWeek}>이전</button>
                        <span>{monthYearString}</span>
                        <button className="arrow-next" onClick={handleNextWeek}>다음</button>
                    </div>
                </div>
                <div className="btn-calendar">
                    <button>일정 추가</button>
                </div>
            </h2>
            {isLoading ? <Skeleton variant="rounded" width="100%" height="90%"/> :
                <>
                    <div className="main-weekly-date">
                        {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
                            const date = new Date(wednesdayDate);
                            date.setDate(wednesdayDate.getDate() + offset);
                            const classNames = `weekly-date-box${offset === (dayOfWeek >= 3 ? dayOfWeek - 3 : 4 + dayOfWeek) ? ' check' : ''}`;
                            return (
                                <div className={classNames} key={offset} onClick={() => handleDateBoxClick(date)}>
                                    <p className="date">{date.getDate()}</p>
                                    <p className="weekly">
                                        {['일', '월', '화', '수', '목', '금', '토'][date.getDay()]}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="main-weekly-content">
                        <p className="tit">{`${monthYearString} ${currentDate.getDate()}일 ${['일', '월', '화', '수', '목', '금', '토'][currentDate.getDay()]}`}</p>
                        {/*<ul>*/}
                        {/*    <li>캐릭터이름1 / 카멘 하드 / with. 깐부1, 깐부2</li>*/}
                        {/*    <li>캐릭터이름2 / 일리아칸 하드 / 메모메모메모</li>*/}
                        {/*</ul>*/}
                        <div className="content-container">
                            <img alt="wating-img" src="/images/준비중.png"/>
                            <p>기능 준비중입니다.</p>
                        </div>
                    </div>
                </>}
        </div>
    );
};

export default MainWeekly;