import React, {useState, useEffect} from "react";
import '../../App.css';
import './Auth.css'
import * as auth from "../../apis/auth";
import AuthTimer from "./AuthTimer";

function SignUp({setIsLoading}) {
    const [username, setUsername] = useState("");
    const [usernameMessage, setUsernameMessage] = useState("");
    const [startTimer, setStartTimer] = useState(false);
    const [authNumber, setAuthNumber] = useState("");
    const [authNumberMessage, setAuthNumberMessage] = useState("");
    const [authEmail, setAuthEmail] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");
    const [equalPassword, setEqualPassword] = useState("")
    const [equalPasswordMessage, setEqualPasswordMessage] = useState("");

    useEffect(() => {
        const isLogin = window.localStorage.getItem("username");
        if (isLogin) {
            window.location.href = "/";
        }
        // Update styles when usernameMessage changes
        const usernameInput = document.getElementById("username");
        if (usernameInput) {
            usernameInput.style.borderColor = usernameMessage ? "red" : "";
        }

        const authEmailInput = document.getElementById("email_auth");
        if (authEmailInput) {
            authEmailInput.style.borderColor = authNumberMessage ? "red" : "";
        }

        // Update styles when passwordMessage changes
        const passwordInput = document.getElementById("password");
        if (passwordInput) {
            passwordInput.style.borderColor = passwordMessage ? "red" : "";
        }

        const equalPasswordInput = document.getElementById("equal_password");
        if (equalPasswordInput) {
            equalPasswordInput.style.borderColor = equalPasswordMessage ? "red" : "";
        }

    }, [usernameMessage, passwordMessage, authNumberMessage, equalPasswordMessage]);

    const handleSocialLogin = (provider) => {
        auth.socialLogin(provider);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,20}$/


    function setMessage() {
        setUsernameMessage("");
        setAuthNumberMessage("");
        setPasswordMessage("");
        setEqualPasswordMessage("");
    }

    const submitMail = async () => {
        setMessage();
        if (!username) {
            setUsernameMessage("이메일을 입력해주세요.");
            return;
        }
        if (!emailRegex.test(username)) {
            setUsernameMessage("올바른 이메일 형식을 입력해주세요.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await auth.submitMail(username);
            if (response.success) {
                setStartTimer(true);
            }
        } catch (error) {
            setUsernameMessage(error.errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const authMail = async () => {
        setMessage();
        if (!authNumber) {
            setAuthNumberMessage("인증번호를 입력해주세요.");
        }

        try {
            setIsLoading(true);
            const response = await auth.authMail(username, authNumber);
            if (response.success) {
                setStartTimer(false);
                const usernameInput = document.getElementById("username");
                usernameInput.readOnly = true;
                const authEmailInput = document.getElementById("email_auth");
                authEmailInput.readOnly = true;
                setAuthEmail(true);
            } else {
                setAuthNumberMessage(response.message);
            }
        } catch (error) {
            setAuthNumberMessage(error.errorMessage);
        } finally {
            setIsLoading(false);
        }
    }

    const signUp = async () => {
        setMessage();
        if (!username || !authNumber || !password || !equalPassword) {
            if (!username) {
                setUsernameMessage("이메일을 입력해주세요.");
            }
            if (!password) {
                setPasswordMessage("비밀번호를 입력해주세요.");
            }
            if (!authNumber) {
                setAuthNumberMessage("인증번호를 입력해주세요.");
            }
            if (!equalPassword) {
                setEqualPasswordMessage("비밀번호 확인을 입력해주세요.");
            }
            return;
        }

        if (!emailRegex.test(username)) {
            setUsernameMessage("올바른 이메일 형식을 입력해주세요.");
            return;
        }

        if (!passwordRegex.test(password)) {
            setPasswordMessage("비밀번호는 8~10자 영문, 숫자 조합이어야 합니다.");
            return;
        }

        if (password !== equalPassword) {
            setPasswordMessage("비밀번호가 일치하지 않습니다.");
            setEqualPasswordMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        if (!authEmail) {
            setUsernameMessage("이메일 인증이 정상처리되지 않았습니다.")
            setAuthNumberMessage("이메일 인증이 정상처리되지 않았습니다.");
            return;
        }

        try {
            const response = await auth.signup(username, authNumber, password, equalPassword);
            if (response.success) {
                alert("회원가입이 정상처리 되었습니다.");
                window.location.href = "/login";
            }
        } catch (error) {
            setPasswordMessage("이메일 또는 패스워드가 일치하지 않습니다.");
            setUsernameMessage("이메일 또는 패스워드가 일치하지 않습니다.");
        }
    }

    return (
        <>
            <div className="auth-container">
                <div className="mention">
                    <p>모코코만큼 환영합니다.</p>
                </div>
                <div className="signup-wrap">
                    <div className="input-login-box">
                        <div className="email-box">
                            <input type="email"
                                   id="username"
                                   placeholder="이메일"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}
                                   required
                            />
                            <button className="email-submit-btn" onClick={submitMail}>전송</button>
                        </div>
                        {usernameMessage && <span className="input-warn-message">{usernameMessage}</span>}
                        <AuthTimer startTimer={startTimer}/>
                    </div>
                    <div className="input-login-box">
                        <div className="email-box">
                            <input type="text"
                                   id="email_auth"
                                   placeholder="인증번호 확인(숫자)"
                                   value={authNumber}
                                   onChange={(e) => {
                                       const numericValue = e.target.value.replace(/\D/g, '');
                                       setAuthNumber(numericValue);
                                   }}
                                   required
                            />
                            <button className="email-auth-btn" onClick={authMail}>확인</button>
                        </div>
                        {authNumberMessage && <span className="input-warn-message">{authNumberMessage}</span>}
                    </div>
                    <div className="input-password-box">
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호 (8 ~ 20자 영문, 숫자 조합)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordMessage && <span className="input-warn-message">{passwordMessage}</span>}
                    </div>
                    <div className="input-password-box">
                        <input
                            type="password"
                            id="equal_password"
                            placeholder="비밀번호 확인"
                            value={equalPassword}
                            onChange={(e) => setEqualPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="login-btn" onClick={signUp}>회원가입</button>
                    <div className="link-wrap">
                        <a className="signup" href="./login">뒤로가기</a>
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

export default SignUp;
