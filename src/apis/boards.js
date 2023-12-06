import { call } from "../service/api-service";

// 목록
// export const list = (page) => axiosInstance.get("/v2/boards?page=" + page);

// export const list = (page) => {
//     call("/v2/boards?page=" + page, "GET", null)
//         .then((response) => {
//             return response;
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }


// // 조회
// export const select = (no) => axiosInstance.get(`/v2/boards/${no}`);

// // 등록
// export const insert = (title, content) => axiosInstance.post("/v2/boards", { title, content });

// // 수정
// export const update = (no, title, writerId, content) => axiosInstance.put("/boards", { no, title, writerId, content });

// // 삭제
// export const remove = (no) => axiosInstance.delete(`/boards/${no}`);
