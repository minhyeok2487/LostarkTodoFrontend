import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

//게시글 조회
const Board = ({ board, no }) => {
    const createMarkup = () => {
        return { __html: board.content };
    };
    return (
        <div className="board-container">
            <div className="board-info">
                <p className="notice-title">공지 | {board.title}</p>
                <p className="reg-date">{new Date(board.regDate).toLocaleString()}</p>
            </div>
            <div className="board-content" dangerouslySetInnerHTML={createMarkup()} />
            {/* <Link to={`/boards/update/${no}`}>수정</Link> */}
        </div>
    );
};

export default Board;