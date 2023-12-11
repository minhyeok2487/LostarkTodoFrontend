import React from 'react';
import Comment from './Comment';
import CommentInsertForm from './CommentInsertForm';

const CommentList = ({ 
    addComment,
    rootComments,
    getReplies,
    activeComment,
    setActiveComment,
    deleteComment,
    updateComment,
    currentUser,
    currentPage
}) => {
    return (
        <div className="comments">
            {/* 
                p.big - 제일 큰 공지
                p.date - 날짜
                div.cont - 내용
                p.update - 개발 예정
                p.modify - 수정 예정
            */}
            <h2>방명록</h2>
            <p>하고싶으신 말씀 자유롭게 남겨주세요!</p>
            <div className="noticeBox box05">
                <CommentInsertForm submitLabel="작성하기" handleSubmit={addComment} />
                <div className="comments-container">
                    {rootComments.map((rootComment) => (
                        <Comment
                            key={rootComment.id}
                            comment={rootComment}
                            replies={getReplies(rootComment.id)}
                            activeComment={activeComment}
                            setActiveComment={setActiveComment}
                            addComment={addComment}
                            deleteComment={deleteComment}
                            updateComment={updateComment}
                            currentUser={currentUser}
                            currentPage={currentPage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentList;