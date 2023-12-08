import React, { useState, useEffect } from 'react';
import * as comment from '../../apis/comments';
import CommentList from '../../components/comments/CommentList';
import PageNation from '../../components/fragments/PageNation';

// 방명록 리스트
const CommentListContainer = ({setIsLoading}) => {

    //state 설정
    const [backendComments, setBackendComments] = useState([]);
    const [rootComments, setRootComments] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // 방명록 데이터
    const getComment = async (page) => {
        setIsLoading(true);
        const data = await comment.list(page);
        setBackendComments(data.commentDtoList);
        setTotalPages(data.totalPages);
        setCurrentUser(data.memberResponseDto)
        isRootComments(data.commentDtoList);
        setIsLoading(false);
    }

    // 데이터 호출
    useEffect(() => {
        getComment(currentPage);
    }, [currentPage]);

    //게시글 추가
    const addComment = async (text, parentId = null) => {
        const data = await comment.addComment(text, parentId);
        setBackendComments(data.commentDtoList);
        setTotalPages(data.totalPages);
        isRootComments(data.commentDtoList);
        setCurrentPage(1);
        setActiveComment(null);
    };

    //게시글 수정
    const updateComment = async (text, commentId) => {
        const data = await comment.updateComment(text, commentId);
        setBackendComments(data);
        setActiveComment(null);
    };

    //게시글 삭제
    const deleteComment = async (commentId) => {
        const data = await comment.deleteComment(commentId);
        setBackendComments(data);
        setActiveComment(null);
    };

    //루트 코멘트인가?
    const isRootComments = (backendComments) => {
        setRootComments(backendComments.filter((backendComment) => backendComment.parentId === 0));
    }

    //답글인가? (루트 코멘트가 있는가?)
    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.regDate).getTime() - new Date(b.regDate).getTime()
            );

    // 페이징
    const handlePageClick = async (page) => {
        if (page <= totalPages) {
            try {
                const data = await comment.list(page);
                setBackendComments(data.commentDtoList);
                isRootComments(data.commentDtoList);
                setCurrentPage(page);
            } catch (error) {
                console.log(error);
            }
        }
    };

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
            />
            <PageNation
                handlePageClick={handlePageClick}
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default CommentListContainer;