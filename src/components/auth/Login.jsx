import React, {useState} from "react";
import '../../App.css';
import '../../style/Auth.css'
import * as auth from "../../apis/auth";
import Logo from "../../utils/Logo";
import InputBox from "./utils/InputBox";
import {emailRegex} from "./utils/Regex";
import SocialLoginBtns from "./utils/SocialLoginBtns";

function Login({message = null, isDarkMode, loginName, setLoginName}) {
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    // 유효성 검사
    function validation() {
        if (!username || !password) {
            if (!username) {
                setUsernameMessage("이메일을 입력해주세요.");
            }
            if (!password) {
                setPasswordMessage("비밀번호를 입력해주세요.");
            }
            return;
        }

        if (!emailRegex(username)) {
            setUsernameMessage("이메일 형식을 입력해주세요.");
            return;
        }
    }

    // 메시지 리셋
    function messageReset() {
        setUsernameMessage("");
        setPasswordMessage("");
    }

    // 로그인 기능
    const login = async () => {
        messageReset();
        validation();
        try {
            const response = await auth.login(username, password);
            if (response.token) {
                // 로컬 스토리지에 토큰과 username 저장
                localStorage.setItem("ACCESS_TOKEN", response.token);
                localStorage.setItem("username", username);
                setLoginName(username);
                // token이 존재하는 경우 홈으로 이동
                window.location.href='/';
            }
        } catch (error) {
            setPasswordMessage("이메일 또는 패스워드가 일치하지 않습니다.");
            setUsernameMessage("이메일 또는 패스워드가 일치하지 않습니다.");
        }
    }

    return (
        <div className="auth-container">
            {/*메시지 받으면 보임 (ex. 비로그인 상태에서 숙제, 깐부탭 클릭 시)*/}
            <Logo isDarkMode={isDarkMode}/>
            <div className="message">{message}</div>
            <div className="login-wrap">
                <InputBox
                    className={"login"}
                    type={"email"}
                    id={"email-input-box"}
                    placeholder={"이메일"}
                    value={username}
                    setValue={setUsername}
                    onKeyPress={login}
                    message={usernameMessage}
                />
                <InputBox
                    className={"password"}
                    type={"password"}
                    id={"password-input-box"}
                    placeholder={"비밀번호"}
                    value={password}
                    setValue={setPassword}
                    onKeyPress={login}
                    message={passwordMessage}
                />
                <button className="login-btn" onClick={login}>로그인</button>
                <div className="link-wrap">
                    <a className="signup" href="/signup">회원가입</a>
                    {/*<a className="find-password" onClick={() => alert("기능 준비중입니다. 잠시만 기다려주세요.")}>비밀번호를*/}
                    {/*    잊어버렸어요</a>*/}
                </div>
            </div>
            <div className="bar">또는</div>
            <SocialLoginBtns/>
        </div>
    );
}

export default Login;