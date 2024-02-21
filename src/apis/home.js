import {call} from "./api";

// 홈 데이터 호출
export const getHomeData = async () => {
    try {
        return await call("/v3/home", "GET", null);
    } catch (error) {
        throw error;
    }
}
