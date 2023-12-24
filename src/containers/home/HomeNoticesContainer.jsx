import React, {useEffect, useState} from 'react';
import * as notices from "../../apis/notices";
import HomeNotices from "../../components/home/HomeNotices";

const HomeBoardContainer = ({
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

    return (<HomeNotices
        noticesList={noticesList}
    />);
};

export default HomeBoardContainer;