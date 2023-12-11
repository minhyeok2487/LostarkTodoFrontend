import React, { useEffect, useState } from 'react';
import * as boards from '../../apis/boards';
import BoardMain from '../../components/boards/BoardMain';
import SearchBox from '../../components/search/SearchBox';
import BoardList from '../../components/boards/BoardList';
import PageNation from '../../fragments/PageNation';

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
            const data = await boards.list(page);
            setBoardList(data.boardDtoList);
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
                const data = await boards.list(page);
                setBoardList(data.boardDtoList);
                setCurrentPage(page);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <BoardMain />
            <div className="content content--notice">
                {/* 리스트 검색 */}
                <SearchBox placeholder={"검색어를 입력해주세요."} data={boardList} />
                {/* // 리스트 검색 */}

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
                {/* // 페이징 */}
                {/* <div>
                    <Link to="/boards/insert">글쓰기</Link>
                </div> */}
            </div>
        </div>
    );
};

export default BoardListContainer;
