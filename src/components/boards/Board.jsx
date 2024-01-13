import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import * as boards from "../../apis/boards";

//게시글 조회
const Board = () => {
    //url경로에 있는 param
    const { no } = useParams();

    // state 설정
    const [board, setBoard] = useState([]);

    // 게시글 데이터
    const getBoard = async () => {
        try {
            const data = await boards.select(no);
            setBoard(data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        getBoard();
    }, []);

    // 게시글 출력
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
        </div>
    );
};

export default Board;