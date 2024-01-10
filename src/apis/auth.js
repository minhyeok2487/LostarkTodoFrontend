import {call} from "./api";
import {API_BASE_URL} from "../config/api-config";

// 로그인
export const login = async (userDTO) => {
    try {
        return await call("/v3/auth/login", "POST", userDTO);
    } catch (error) {
        throw error;
    }
}

// 소셜 로그인
export function socialLogin(provider) {
    const frontendUrl = window.location.protocol + "//" + window.location.host;
    window.location.href = API_BASE_URL + "/auth/authorize/" + provider + "?redirect_url=" + frontendUrl;
}

// 로그아웃
export const logout = async () => {
    try {
        const response = await call("/v3/auth/logout", "GET", null);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// 1차 회원가입
export const signup = async (mail, number, password, equalPassword) => {
    const data = {
        mail: mail,
        number: number,
        password: password,
        equalPassword: equalPassword
    }
    try {
        const response = await call("/v3/auth/signup", "POST", data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// 캐릭터 정보 추가
export const addCharacters = async (apiKey, characterName) => {
    const data = {
        apiKey: apiKey,
        characterName: characterName
    }
    try {
        const response = await call("/v3/auth/character", "POST", data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// 이메일 전송
export const submitMail = async (mail) => {
    const data = {
      mail: mail
    };
    try {
        return await call("/v3/mail", "POST", data);
    } catch (error) {
        throw error;
    }
}

// 이메일 인증
export const authMail = async (mail, number) => {
    const data = {
        mail: mail,
        number: number
    };
    try {
        return await call("/v3/mail/auth", "POST", data);
    } catch (error) {
        throw error;
    }
}
