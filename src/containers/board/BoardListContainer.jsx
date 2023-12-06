import React, { useEffect, useState } from 'react';
import { call } from "../../service/api-service";
import * as boards from '../../apis/boards';
import { Link } from 'react-router-dom';
import SearchBox from '../../components/search/SearchBox';
import BoardList from '../../components/boards/BoardList';
import DiscordIcon from '../../icons/DiscordIcon';

// 게시글 목록
const BoardListContainer = () => {
    // state 설정
    const [boardList, setBoardList] = useState([]);
    const [noticeList, setNoticeList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // 게시글 목록 데이터
    const getBoardList = async (page) => {
        await call(`/v2/boards?page=${page}`, "GET", null)
            .then((response) => {
                setBoardList(response.boardDtoList);
                setTotalPages(response.totalPages);
                setNoticeList(response.noticeList);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getBoardList(currentPage);
    }, [currentPage]);

    const handlePageClick = async (page) => {
        if (page <= totalPages) {
            // const data = (await boards.list(page)).data;
            // setBoardList(data.boardDtoList);
            // setCurrentPage(page);
        }
    };

    // Generate an array with page numbers based on totalPages
    const generatePageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <a
                    key={i}
                    href="javascript: void(0);"
                    className={`pagination__number ${currentPage === i ? 'pagination__number--active' : ''}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </a>
            );
        }
        return pageNumbers;
    };


    return (
        <div>
            <div className="comments">
                <div className="noticeBox box01">
                    <p className="notice">공지사항</p>
                    <div className="cont">
                        <ul>
                            <li>개발자 : <DiscordIcon /> 마볼링#2884 <a href="https://open.kakao.com/o/snL05upf" target='_blank'>오픈카톡</a></li>
                            <li>UI담당자 : <DiscordIcon /> 얀비#7431</li>
                        </ul>
                    </div>
                    <div className="cont">
                        <p>사용해주시고 많은 의견주셔서 너무 감사합니다. 최대한 빠르게 업데이트 하도록 해보겠습니다.</p>
                        <ul>
                            <li>서버에 접속이 안되는 경우, 보통 업데이트 중이므로 1~2분 후 접속이 가능합니다.</li>
                            <li>슬라임/메데이아의 경우 서버별로 다르고, 길드가 직접 운영하기 때문에 추가가 어려울 것 같습니다.</li>
                        </ul>
                    </div>
                    <div className="cont">
                        <p style={{ fontWeight: "bold" }}>개발자에게 커피 한잔</p>
                        <ul>
                            <li>보내주신 소중한 후원금은 서버 유지 및 발전 비용으로 사용됩니다.</li>
                            <li>카카오뱅크 3333-08-6962739</li>
                            <li>예금주 : 이민혁</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="content content--notice">
                <h2 className="title">공지사항</h2>
                {/* 리스트 검색 */}
                <SearchBox placeholder={"검색어를 입력해주세요."} data={boardList} />
                {/* // 리스트 검색 */}

                {/* 메인공지 */}
                <BoardList boardList={noticeList}></BoardList>

                {/* 업데이트 공지 */}
                <BoardList boardList={boardList}></BoardList>
                {/* 페이징 */}
                <div className="pagination" aria-label="페이지네이션">
                    <a href="javascript: void(0);" className="pagination__first" onClick={() => handlePageClick(1)}>
                        처음
                    </a>
                    <a href="javascript: void(0);" className="pagination__prev" onClick={() => handlePageClick(currentPage - 1)}>
                        이전
                    </a>
                    {generatePageNumbers()}
                    <a href="javascript: void(0);" className="pagination__next" onClick={() => handlePageClick(currentPage + 1)}>
                        다음
                    </a>
                    <a href="javascript: void(0);" className="pagination__last" onClick={() => handlePageClick(totalPages)}>
                        마지막
                    </a>
                </div>
                {/* // 페이징 */}
                {/* <div>
                    <Link to="/boards/insert">글쓰기</Link>
                </div> */}
            </div>
        </div>
    );
};

export default BoardListContainer;
