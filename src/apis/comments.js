import { call } from "./api";

// 전체 조회
export const list = async (page) => {
    try {
        const response = await call(`/v3/comments?page=${page}`, "GET", null);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// 게시글 추가
export const addComment = async (text, parentId = null) => {
    const updateContent = {
        body: text,
        parentId: parentId
    };
    try {
        const response = await call("/v3/comments", "POST", updateContent);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// 게시글 수정
export const updateComment = async (text, commentId, page) => {
    const updateContent = {
        body: text,
        id: commentId
    };
    try {
        const response = await call(`/v3/comments?page=${page}`, "PATCH", updateContent);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

// 게시글 삭제
export const deleteComment = async (commentId) => {
    const updateContent = {
        id: commentId,
    };
    if (window.confirm("삭제하시겠습니까?")) {
        try {
            const response = await call("/v3/comments", "DELETE", updateContent);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};