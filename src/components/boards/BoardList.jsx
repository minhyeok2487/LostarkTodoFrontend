import React from 'react';
import { Link } from 'react-router-dom';
import "./Board.css";

//게시글 목록
const BoardList = ({ boardList }) => {
    return (
        <div>
            <div class="board board--list" id="list">
                {/* <!-- 리스트 --> */}
                <div class="list list--default">
                    <ul>
                        {/* <!-- 전체 공지 --> */}
                        {boardList.map((board) => (
                            <li key={board.id} class="">
                                <Link to={`/boards/${board.id}`}>
                                    <div class="list__category" aria-label="카테고리">
                                        {board.notice && <span class="icon icon--notice">공지</span>}
                                    </div>
                                    <div class="list__subject" aria-label="제목">
                                        <span class="list__title">{board.title}</span>
                                        {/* <span class="icon icon--new">새 글</span> */}
                                    </div>
                                    <div class="list__read" aria-label="조회수">{board.views}</div>
                                    <div class="list__date" aria-label="등록일">{new Date(board.regDate).toLocaleString()}</div>
                                </Link>
                            </li>
                        ))}
                        {/* <!-- // 전체 공지 --> */}
                    </ul>
                </div>
                {/* <!-- // 리스트 --> */}
            </div>
        </div>
    );
};

export default BoardList;