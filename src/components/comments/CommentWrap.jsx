import React from 'react';
import CommentList from "./CommentList";
import PageNation from "../../fragments/PageNation";

const CommentWrap = ({
                         addComment,
                         rootComments,
                         getReplies,
                         activeComment,
                         setActiveComment,
                         deleteComment,
                         updateComment,
                         currentUser,
                         currentPage,
                         handlePageClick,
                         totalPages
                     }) => {
    return (
        <div>
            <CommentList
                addComment={addComment}
                rootComments={rootComments}
                getReplies={getReplies}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
                currentUser={currentUser}
                currentPage={currentPage}
            />
            {/* 페이징 버튼 */}
            <PageNation
                handlePageClick={handlePageClick}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default CommentWrap;