import React from 'react';
import {Link} from "react-router-dom";

const HomeBoards = ({
                        boardList,
                        totalPages,
                        currentPage
                    }) => {
    return (
        <div className="" >
            <div className="">
                <a href="/boards">사이트 공지사항</a>
            </div>
            <div className="">
                <ul>
                    {boardList.map((board) => (
                        <li key={board.id} className="">
                            <Link to={`/boards/${board.id}`}>
                                <div className="" aria-label="카테고리">
                                    <span className="">공지</span>
                                </div>
                                <div className="" aria-label="제목">
                                    <span className="">{board.title}</span>
                                </div>
                                <div className="" aria-label="조회수">{board.views}</div>
                                <div className="" aria-label="등록일">{new Date(board.regDate).toLocaleString()}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomeBoards;