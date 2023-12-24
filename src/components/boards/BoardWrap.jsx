import React from 'react';
import SearchBox from "../search/SearchBox";
import BoardList from "./BoardList";
import PageNation from "../../fragments/PageNation";
import BoardText from "./BoardText";

const BoardWrap = ({
                       boardList,
                       noticeList,
                       handlePageClick,
                       totalPages,
                       currentPage,
                   }) => {
    return (
        <div>
            <div className="content content--notice">
                <BoardText/>
                {/* 리스트 검색 */}
                {/*<SearchBox placeholder={"검색어를 입력해주세요."} data={boardList} />*/}

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
                {/* <div>*/}
                {/*    <Link to="/boards/insert">글쓰기</Link>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default BoardWrap;