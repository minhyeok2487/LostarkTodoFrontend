import React from 'react';
import './Fragments.css';

const PageNation = ({
    handlePageClick,
    currentPage,
    totalPages,
}) => {
    const generatePageNumbers = () => {
        const pageNumbers = [];
        if(totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <button
                        key={i}
                        className={`pagination__number ${currentPage === i ? 'pagination__number--active' : ''}`}
                        onClick={() => handlePageClick(i)}
                        role="link"
                    >
                        {i}
                    </button>
                );
            }
        } else {
            if (currentPage < 6) {
                for (let i = 1; i <= 10; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            className={`pagination__number ${currentPage === i ? 'pagination__number--active' : ''}`}
                            onClick={() => handlePageClick(i)}
                            role="link"
                        >
                            {i}
                        </button>
                    );
                }
            } else {
                var lastPage = currentPage+4;
                if(lastPage > totalPages) {
                    lastPage = totalPages;
                }
                for (let i = currentPage-5; i <= lastPage; i++) {
                    pageNumbers.push(
                        <button
                            key={i}
                            className={`pagination__number ${currentPage === i ? 'pagination__number--active' : ''}`}
                            onClick={() => handlePageClick(i)}
                            role="link"
                        >
                            {i}
                        </button>
                    );
                }
            }
        }

        return pageNumbers;
    };

    return (
        <div className="pagination" aria-label="페이지네이션">
            <button className="pagination__first" onClick={() => handlePageClick(1)}>
                처음
            </button>
            <button className="pagination__prev" onClick={() => handlePageClick(currentPage - 1)}>
                이전
            </button>
            {generatePageNumbers()}
            <button className="pagination__next" onClick={() => handlePageClick(currentPage + 1)}>
                다음
            </button>
            <button className="pagination__last" onClick={() => handlePageClick(totalPages)}>
                마지막
            </button>
        </div>
    );
};

export default PageNation;