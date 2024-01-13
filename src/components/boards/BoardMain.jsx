import React, {useEffect, useState} from 'react';
import BoardList from "./BoardList";
import PageNation from "../../fragments/PageNation";
import BoardText from "./BoardText";
import * as boards from "../../apis/boards";

const BoardMain = ({setIsLoading}) => {
    // state 설정
    const [boardList, setBoardList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // 게시글 목록 데이터
    const getBoardList = async (page) => {
        try {
            setIsLoading(true);
            const data = await boards.listDefault(page);
            setBoardList(data.boardResponseDtoList);
            setTotalPages(data.totalPages);
            setNoticeList(data.noticeList);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBoardList(currentPage);
    }, [currentPage]);

    // 페이지 버튼 클릭
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
    return (
        <div>
            <div className="content content--notice">
                {/*상단 문구*/}
                <BoardText />

                {/* 메인공지 */}
                <BoardList boardList={noticeList}></BoardList>

                {/* 업데이트 공지 */}
                <BoardList boardList={boardList}></BoardList>

                {/* 페이징 */}
                <PageNation
                    handlePageClick={handlePageClick}
                    totalPages={totalPages}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default BoardMain;