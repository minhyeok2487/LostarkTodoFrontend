import React, {useEffect, useState} from 'react';
import * as boards from "../../apis/boards";
import HomeBoards from "../../components/home/HomeBoards";

const HomeBoardContainer = ({
                                setIsLoading,
                                showMessage
                            }) => {
    const [boardList, setBoardList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // 사이트 공지사항  데이터
    const getBoardList = async (page, size) => {
        setIsLoading(true);
        try {
            const data = await boards.listV3(page, size);
            setBoardList(data.boardResponseDtoList);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBoardList(currentPage, 5);
    }, [currentPage]);

    return (<HomeBoards
        boardList={boardList}
        totalPages={totalPages}
        currentPage={currentPage}
    />);
};

export default HomeBoardContainer;