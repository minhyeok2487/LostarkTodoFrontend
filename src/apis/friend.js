import { call } from "./api";

// 깐부 캐릭터 순서 변경 저장
export const saveSort = async (friendUsername, characters) => {
    try {
        return await call("/v2/friends/characterList/sorting/" +friendUsername, "PATCH", characters);
    } catch (error) {
        alert(error.errorMessage);
        throw error;
    }
}