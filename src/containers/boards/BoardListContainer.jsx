import React, {useEffect, useState} from 'react';
import * as boards from '../../apis/boards';
import BoardWrap from "../../components/boards/BoardWrap";
import {listDefault} from "../../apis/boards";

// 게시글 목록
const BoardListContainer = () => {
    // state 설정
    const [boardList, setBoardList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // 게시글 목록 데이터
    const getBoardList = async (page) => {
        try {
            const data = await boards.listDefault(page);
            setBoardList(data.boardResponseDtoList);
            setTotalPages(data.totalPages);
            setNoticeList(data.noticeList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBoardList(currentPage);
    }, [currentPage]);

    const handlePageClick = async (page) => {
        if (page <= totalPages) {
            try {
                const data = await boards.listDefault(page);
                setBoardList(data.boardResponseDtoList);
                setCurrentPage(page);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (<BoardWrap
        boardList={boardList}
        noticeList={noticeList}
        handlePageClick={handlePageClick}
        totalPages={totalPages}
        currentPage={currentPage}
    />);
};

export default BoardListContainer;
