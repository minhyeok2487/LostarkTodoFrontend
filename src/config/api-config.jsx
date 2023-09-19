let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:8080"
} else {
    backendHost = "https://api.loatodo.com";
}

// 백엔드 프론트 통합 배포 테스트
export const API_BASE_URL = `${backendHost}`;