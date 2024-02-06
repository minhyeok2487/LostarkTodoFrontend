import {call} from "./api";

// 등록된 캐릭터 삭제
export const deleteUserCharacters = async () => {
    try {
        return await call("/v3/member/setting/characters", "DELETE", null);
    } catch (error) {
        throw error;
    }
}
