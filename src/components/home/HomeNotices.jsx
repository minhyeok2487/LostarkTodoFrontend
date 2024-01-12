import React, {useEffect, useState} from 'react';
import * as notices from "../../apis/notices";

const HomeNotices = ({
    setIsLoading,
    showMessage
}) => {
    const [noticesList, setNoticesList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // 사이트 공지사항  데이터
    const getNoticesList = async (page, size) => {
        setIsLoading(true);
        try {
            const data = await notices.list(page, size);
            setNoticesList(data.noticesList);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getNoticesList(currentPage, 5);
    }, [currentPage]);

    const isRecent = (date) => {
        const currentDate = new Date();
        const boardDate = new Date(date);
        const timeDifference = currentDate - boardDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        return daysDifference < 2;
    };
    return (
        <div className="notice-board-container">
            <div className="notice-board-header">
                <a href="/boards" className="notice-board-link">로스트아크 공지사항</a>
            </div>
            <div className="notice-board-list">
                <ul className="board-ul">
                    {noticesList.map((notices) => (
                        <li key={notices.id} className="board-item">
                            <div className="board-link">
                                <div className="board-category" aria-label="카테고리">
                                    <span className="category-span">{notices.type}</span>
                                </div>
                                <div className="board-title" aria-label="제목">
                                    <a href={`${notices.link}`} target="_blank" className="title-span">{notices.title}</a>
                                </div>
                                {isRecent(notices.date) && <div className="board-new">N</div>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomeNotices;