import React from 'react';

const HomeBoards = ({
                        boardList
                    }) => {
    const isRecent = (regDate) => {
        const currentDate = new Date();
        const boardDate = new Date(regDate);
        const timeDifference = currentDate - boardDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        return daysDifference < 3;
    };

    return (
        <div className="notice-board-container">
            <div className="notice-board-header">
                <a href="/boards" className="notice-board-link">LoaTodo 공지사항</a>
            </div>
            <div className="notice-board-list">
                <ul className="board-ul">
                    {boardList.map((board) => (
                        <li key={board.id} className="board-item">
                            <div className="board-link">
                                <div className="board-category" aria-label="카테고리">
                                    <span className="category-span">공지사항</span>
                                </div>
                                <div className="board-title" aria-label="제목">
                                    <a href={`/boards/${board.id}`} className="title-span">{board.title}</a>
                                </div>
                                {isRecent(board.regDate) && <div className="board-new">N</div>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomeBoards;