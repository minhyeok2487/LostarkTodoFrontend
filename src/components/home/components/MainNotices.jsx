import React, {useEffect, useState} from 'react';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import NoticesWrap from "./NoticesWrap";
import * as notices from "../../../apis/notices";
import * as boards from "../../../apis/boards";

const MainNotices = () => {
    const [noticeGroup, setNoticeGroup] = React.useState('로스트아크');
    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            setNoticeGroup(newValue);
        }
    };

    const [noticesList, setNoticesList] = useState([]);
    const [boardList, setBoardList] = useState([]);

    // 로스트아크 공지사항  데이터
    const getNoticesList = async (page, size) => {
        try {
            const data = await notices.list(page, size);
            setNoticesList(data.noticesList);
        } catch (error) {
            console.log(error);
        }
    }

    // 사이트 공지사항  데이터
    const getBoardList = async (page, size) => {
        try {
            const data = await boards.list(page, size);
            setBoardList(data.boardResponseDtoList);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBoardList(1, 5);
        getNoticesList(1, 5);
    }, []);

    return (
        <div className="main-notices"
            // 개발 후 스타일 지우기
            // style={{background:"#98FB98"}}
        >
            <div className="main-notices-header">
                <h2>소식</h2>
                <ToggleButtonGroup
                    color={"primary"}
                    value={noticeGroup}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="로스트아크">로스트아크</ToggleButton>
                    <ToggleButton value="로아투두">로아투두</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="notice-board-container">
                {noticeGroup === "로스트아크" &&
                    <>
                        {/* <div className="notice-board-header">
                            <a href="https://lostark.game.onstove.com/News/Notice/List" target="_blank" className="notice-board-link">로스트아크 공지사항</a>
                        </div> */}
                        <NoticesWrap dataList={noticesList} type={"Lostark"} />
                    </>
                }
                {noticeGroup === "로아투두" &&
                    <>
                        {/* <div className="notice-board-header">
                            <a href="/boards" className="notice-board-link" target="_blank">LoaTodo 공지사항</a>
                        </div> */}
                        <NoticesWrap dataList={boardList} type={"LoaTodo"} />
                    </>
                }
            </div>
        </div>
    );
};

export default MainNotices;