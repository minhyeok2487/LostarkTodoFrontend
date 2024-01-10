import React, { useState, useEffect } from "react";
import '../../App.css';
import './Auth.css'
import * as auth from "../../apis/auth";

function Login({message = null, isDarkMode, loginName, setLoginName}) {
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    useEffect(() => {
        const usernameInput = document.getElementById("username");
        if (usernameInput) {
            usernameInput.style.borderColor = usernameMessage ? "red" : "";
        }

        const passwordInput = document.getElementById("password");
        if (passwordInput) {
            passwordInput.style.borderColor = passwordMessage ? "red" : "";
        }

        if (loginName) {
            window.location.href = "/";
        }
    }, [usernameMessage, passwordMessage, loginName]);

    const handleSocialLogin = (provider) => {
        auth.socialLogin(provider);
    }

    const login = async () => {
        setUsernameMessage("");
        setPasswordMessage("");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(username) || !username || !password) {
            if (!emailRegex.test(username)) {
                setUsernameMessage("올바른 이메일 형식을 입력해주세요.");
            }
            if (!username) {
                setUsernameMessage("이메일을 입력해주세요.");
            }
            if (!password) {
                setPasswordMessage("비밀번호를 입력해주세요.");
            }
            return;
        }

        try {
            const response = await auth.login({username: username, password: password});
            if (response.token) {
                // 로컬 스토리지에 토큰과 username 저장
                localStorage.setItem("ACCESS_TOKEN", response.token);
                localStorage.setItem("username", username);
                setLoginName(username);
                // token이 존재하는 경우 Todo 화면으로 리디렉트
                window.location.href = "/";
            }
        } catch (error) {
            setPasswordMessage("이메일 또는 패스워드가 일치하지 않습니다.");
            setUsernameMessage("이메일 또는 패스워드가 일치하지 않습니다.");
        }
    }
    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            login();
        }
    };

    return (
        <>
            <div className="auth-container">
                {/*메시지 받으면 보임*/}
                <div className="message">{message}</div>
                <div className="logo">
                    {isDarkMode ? (
                        <img alt="logo" src='/logo_white.png'/>
                    ) : (
                        <img alt="logo" src='/logo.png'/>
                    )}
                </div>
                <div className="login-wrap">
                    <div className="input-login-box">
                        <input type="email"
                               id="username"
                               placeholder="이메일"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               onKeyPress={handleOnKeyPress}
                               required
                        />
                        {usernameMessage && <span className="input-warn-message">{usernameMessage}</span>}
                    </div>
                    <div className="input-password-box">
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleOnKeyPress}
                            required
                        />
                        {passwordMessage && <span className="input-warn-message">{passwordMessage}</span>}
                    </div>
                    <button className="login-btn" onClick={login}>로그인</button>
                    <div className="link-wrap">
                        <a className="signup" href="/signup">회원가입</a>
                        <a className="find-password" onClick={()=>alert("기능 준비중입니다. 잠시만 기다려주세요.")}>비밀번호를 잊어버렸어요</a>
                    </div>
                </div>
                <div className="bar">또는</div>
                <div className="auth-login-btns">
                    <button type="button" className="login-with-google-btn" onClick={() => handleSocialLogin("google")}>
                        구글 로그인으로 시작하기
                    </button>
                </div>
            </div>
        </>
    );
}

export default Login;