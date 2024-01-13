// 유효성 검사 함수

// 이메일 유효성 검사
export const emailRegex = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

// 패스워드 유효성 검사 (8~20자 영문, 숫자)
export const passwordRegex = (value) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/
    return passwordRegex.test(value);
}