import React from 'react';
import {Link} from 'react-router-dom';
import "../../style/Board.css";

//게시글 목록
const BoardList = ({boardList}) => {
    return (
        <div className="board board--list" id="list">
            <div className="list list--default">
                <ul>
                    {boardList.map((board) => (
                        <li key={board.id} className="">
                            <Link to={`/boards/${board.id}`}>
                                <div className="list__category" aria-label="카테고리">
                                    {board.notice && <span className="icon icon--notice">공지</span>}
                                </div>
                                <div className="list__subject" aria-label="제목">
                                    <span className="list__title">{board.title}</span>
                                </div>
                                {/*<div className="list__read" aria-label="조회수">{board.views}</div>*/}
                                <div className="list__date"
                                     aria-label="등록일">{new Date(board.regDate).toLocaleDateString()}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BoardList;