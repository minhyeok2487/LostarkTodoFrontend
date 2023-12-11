import { call } from "./api";

// 전체 조회
export const list = async () => {
    try {
        const response = await call("/v2/member/characterList", "GET", null);
        return response;
    } catch (error) {
        if (error.errorMessage[0] === "등록된 캐릭터가 없습니다.") {
            window.location.href = "/signup";
        } else {
            alert(error.errorMessage);
            localStorage.setItem("ACCESS_TOKEN", null);
            window.location.href = "/login";
        }
        throw error;
    }
}

// 일일 숙제 단일 체크
export const updateDayContent = async (characterId, characterName, category) => {
    const updateContent = {
        characterId: characterId,
        characterName: characterName
    };
    try {
        return await call("/v2/character/day-content/check/" + category, "PATCH", updateContent);
    } catch (error) {
        throw error;
    }
}

// 일일 숙제 전체 체크
export const updateDayContentAll = async (characterId, characterName, category) => {
    const updateContent = {
        characterId: characterId,
        characterName: characterName
    };
    try {
        return await call("/v2/character/day-content/check/" + category + "/all", "PATCH", updateContent);
    } catch (error) {
        alert(error.errorMessage);
        throw error;
    }
}

// 캐릭터 순서 변경 저장
export const saveSort = async (characters) => {
    try {
        return await call("/member/characterList/sorting", "PATCH", characters);
    } catch (error) {
        alert(error.errorMessage);
        throw error;
    }
}

// 캐릭터 휴식 게이지 수정
export const updateDayContentGuage = async (characterId, characterName, chaosGauge, guardianGauge, eponaGauge) => {
    const updateContent = {
        characterId: characterId,
        characterName: characterName,
        chaosGauge: chaosGauge,
        guardianGauge: guardianGauge,
        eponaGauge: eponaGauge,
    };
    try {
        return await call("/v2/character/day-content/gauge", "PATCH", updateContent);
    } catch (error) {
        alert(error.errorMessage);
        throw error;
    }
}

// 도전 어비스/가디언 체크(v2 업데이트 완료)
export const updateChallenge = async (character, content) => {
    const updateContent = {
        serverName: character.serverName,
        content: content
    };
    try {
        return await call("/v2/character/challenge", "PATCH", updateContent);
    } catch (error) {
        alert(error.errorMessage);
        throw error;
    }
}
