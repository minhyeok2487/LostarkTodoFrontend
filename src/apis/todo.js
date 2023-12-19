import { call } from "./api";

// 전체 조회
export const list = async () => {
    try {
        const response = await call("/v2/member/characterList", "GET", null);
        return response;
    } catch (error) {
        if (error.errorMessage === "등록된 캐릭터가 없습니다.") {
            window.location.href = "/signup";
        } else {
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
        throw error;
    }
}

// 캐릭터 순서 변경 저장
export const saveSort = async (characters) => {
    try {
        return await call("/member/characterList/sorting", "PATCH", characters);
    } catch (error) {
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
        throw error;
    }
}

// 캐릭터 주간숙제 추가 폼 데이터 호출
export const getTodoFormData = async (characterId, characterName) => {
    try {
        return await call("/v2/character/week/form/" + characterId + "/" + characterName, "GET", null);
    } catch (error) {
        throw error;
    }
}

// 캐릭터 주간 숙제 업데이트(추가/삭제)
export const updateWeekTodo = async (characterId, characterName, content) => {
    try {
        return await call("/v2/character/week/raid/" + characterId + "/" + characterName, "POST", content);
    } catch (error) {
        alert(error.errorMessage);
        throw error;
    }
}

// 캐릭터 주간 숙제 업데이트 All(추가/삭제)
export const updateWeekTodoAll = async (characterId, characterName, content) => {
    try {
        return await call("/v2/character/week/raid/" + characterId + "/" + characterName + "/all", "POST", content);
    } catch (error) {
        throw error;
    }
}

// 캐릭터 주간숙제 체크
export const updateWeekCheck = async (characterId, characterName, weekCategory, currentGate, totalGate) => {
    const updateContent = {
        characterId: characterId,
        characterName: characterName,
        weekCategory: weekCategory,
        currentGate: currentGate,
        totalGate: totalGate
    };
    try {
        return await call("/v2/character/week/raid/check", "PATCH", updateContent);
    } catch (error) {
        throw error;
    }
}

export const updateWeekCheckAll = async (characterId, characterName, weekCategory) => {
    const updateContent = {
        characterId: characterId,
        characterName: characterName,
        weekCategory: weekCategory
    };
    try {
        return await call("/v2/character/week/raid/check/all", "PATCH", updateContent);
    } catch (error) {
        throw error;
    }
}

// 골드획득 캐릭터 업데이트
export const updateGoldCharacter = async (characterId, characterName) => {
    const updateContent = {
        characterId: characterId,
        characterName: characterName,
    };
    try {
        return await call("/v2/character/gold-character/", "PATCH", updateContent);
    } catch (error) {
        alert(error.errorMessage);
        throw error;
    }
}

export const updateWeekMessage = async (characterId, todoId, message) => {
    const updateContent = {
        characterId: characterId,
        todoId: todoId,
        message: message
    };
    try {
        return await call("/v2/character/week/message", "PATCH", updateContent);
    } catch (error) {
        throw error;
    }
}

/*주간 에포나 체크*/
export const weekEponaCheck = async (characterId, characterName) => {
    const updateContent = {
        id: characterId,
        characterName: characterName
    };
    try {
        return await call("/v2/character/week/epona", "PATCH", updateContent);
    } catch (error) {
        throw error;
    }
}

/*주간 에포나 체크 All*/
export const weekEponaCheckAll = async (characterId, characterName) => {
    const updateContent = {
        id: characterId,
        characterName: characterName
    };
    try {
        return await call("/v2/character/week/epona/all", "PATCH", updateContent);
    } catch (error) {
        throw error;
    }
}

/*실마엘 교환 체크*/
export const silmaelChange = async (characterId, characterName) => {
    const updateContent = {
        id: characterId,
        characterName: characterName
    };
    try {
        return await call("/v2/character/week/silmael", "PATCH", updateContent);
    } catch (error) {
        throw error;
    }
}

/*큐브 티켓 추가*/
export const addCubeTicket = async (characterId, characterName) => {
    const updateContent = {
        id: characterId,
        characterName: characterName
    };
    try {
        return await call("/v2/character/week/cube/add", "PATCH", updateContent);
    } catch (error) {
        throw error;
    }
}

/*큐브 티켓 감소*/
export const substractCubeTicket = async (characterId, characterName) => {
    const updateContent = {
        id: characterId,
        characterName: characterName
    };
    try {
        return await call("/v2/character/week/cube/substract", "PATCH", updateContent);
    } catch (error) {
        throw error;
    }
}

export const getCubeContent = async (name) => {
    try {
        return await call("/v2/character/cube/" + name, "GET", null);
    } catch (error) {
        throw error;
    }
}