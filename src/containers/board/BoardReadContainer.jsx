import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import * as boards from '../../apis/boards';
import Board from '../../components/boards/Board';

// 게시글 조회
const BoardReadContainer = () => {
    const { no } = useParams(); //url경로에 있는 param

    // state 설정
    const [board, setBoard] = useState([]);

    // 게시글 목록 데이터
    const getBoard = async () => {
        try {
            const data = (await boards.select(no)).data;
            setBoard(data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        getBoard();
    }, []);

    return (
        <div>
            <Board board={board} no={no}></Board>
        </div>
    );
};

export default BoardReadContainer;