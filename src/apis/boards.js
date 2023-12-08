import { call } from "./api";

// 전체 조회
export const list = async (page) => {
    try {
        const response = await call(`/v2/boards?page=${page}`, "GET", null);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// 단건 조회
export const select = async (no) => {
    try {
        const response = await call(`/v2/boards/${no}`, "GET", null);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// 등록
export const insert = async (title, content) => {
    const updateContent = {
        title : title,
        content : content
    }
    try {
        const response = await call("/v2/boards", "POST", updateContent);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// // 수정
// export const update = (no, title, writerId, content) => axiosInstance.put("/boards", { no, title, writerId, content });

// // 삭제
// export const remove = (no) => axiosInstance.delete(`/boards/${no}`);
