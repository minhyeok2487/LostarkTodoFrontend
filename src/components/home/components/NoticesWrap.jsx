import React, {useEffect, useState} from 'react';
import * as notices from "../../../apis/notices";

const NoticesWrap = ({
    dataList,
    type
}) => {
    const isRecent = (date) => {
        const currentDate = new Date();
        const boardDate = new Date(date);
        const timeDifference = currentDate - boardDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        return daysDifference < 2;
    };
    return (
        <div className="notice-board-list">
            <ul className="board-ul">
                {dataList.map((data) => (
                    <li key={data.id} className="board-item">
                        <div className="board-link">
                            <div className="board-category" aria-label="카테고리">
                                <span className="category-span">공지</span>
                            </div>
                            <div className="board-title" aria-label="제목">
                                {type === "Lostark" && <a href={`${data.link}`} target="_blank" className="title-span">{data.title}</a>}
                                {type === "LoaTodo" && <a href={`/boards/${data.id}`} target="_blank" className="title-span">{data.title}</a>}
                            </div>
                            {isRecent(data.date) && <div className="board-new">N</div>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoticesWrap;