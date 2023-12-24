import { call } from "./api";

/*전체 조회*/
export const list = async (page, size) => {
    try {
        const response = await call(`/v3/notices?page=${parseInt(page)}&size=${parseInt(size)}`, "GET", null);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}