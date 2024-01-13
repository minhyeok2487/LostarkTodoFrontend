import React, {useState, useEffect} from "react";
import '../../App.css';
import '../../style/Auth.css'
import * as auth from "../../apis/auth";
import EmailTimer from "./utils/EmailTimer";
import SocialLoginBtns from "./utils/SocialLoginBtns";
import InputBox from "./utils/InputBox";
import {emailRegex, passwordRegex} from "./utils/Regex";
import {Link, useNavigate} from "react-router-dom";

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

    const navigate = useNavigate();

    useEffect(() => {
        // 로그인 상태이면 home으로 리다이렉트
        const isLogin = window.localStorage.getItem("username");
        if (isLogin) {
            navigate('/');
        }
    }, []);

    // 메시지 리셋
    function messageReset() {
        setUsernameMessage("");
        setAuthNumberMessage("");
        setPasswordMessage("");
        setEqualPasswordMessage("");
    }

    // 메일 전송
    const submitMail = async () => {
        messageReset();
        if (!username) {
            setUsernameMessage("이메일을 입력해주세요.");
            return;
        }
        if (!emailRegex(username)) {
            setUsernameMessage("이메일 형식을 입력해주세요.");
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
        messageReset();
        if (!authNumber || isNaN(authNumber)) {
            setAuthNumberMessage("인증번호를 올바르게 입력해주세요.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await auth.authMail(username, authNumber);
            if (response.success) {
                setStartTimer(false);
                const usernameInput = document.getElementById("email-input-box");
                usernameInput.readOnly = true;
                const authEmailInput = document.getElementById("email-auth-input-box");
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
        messageReset();
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

        if (!emailRegex(username)) {
            setUsernameMessage("올바른 이메일 형식을 입력해주세요.");
            return;
        }

        if (!passwordRegex(password)) {
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
                navigate("/login");
            }
        } catch (error) {
            setPasswordMessage("이메일 또는 패스워드가 일치하지 않습니다.");
            setUsernameMessage("이메일 또는 패스워드가 일치하지 않습니다.");
        }
    }

    return (
        <div className="auth-container">
            <div className="mention">
                <p>모코코만큼 환영합니다.</p>
            </div>
            <div className="signup-wrap">
                <div className="input-btn-wrap">
                    <div className="input-btn">
                        <InputBox
                            className={"login"}
                            type={"email"}
                            id={"email-input-box"}
                            placeholder={"이메일"}
                            value={username}
                            setValue={setUsername}
                            onKeyPress={submitMail}
                            message={usernameMessage}
                        />
                        <button className="email-submit-btn" onClick={submitMail}>전송</button>
                    </div>
                    <EmailTimer startTimer={startTimer}/>
                </div>
                <div className="input-btn-wrap">
                    <div className="input-btn">
                        <InputBox
                            className={"email_auth"}
                            type={"text"}
                            id={"email-auth-input-box"}
                            placeholder={"인증번호 확인 (숫자)"}
                            value={authNumber}
                            setValue={setAuthNumber}
                            onKeyPress={authMail}
                            message={authNumberMessage}
                        />
                        <button className="email-auth-btn" onClick={authMail}>확인</button>
                    </div>
                </div>
                <InputBox
                    className={"password"}
                    type={"password"}
                    id={"password-input-box"}
                    placeholder={"비밀번호 (8~20자 영문, 숫자)"}
                    value={password}
                    setValue={setPassword}
                    onKeyPress={signUp}
                    message={passwordMessage}
                />
                <InputBox
                    className={"password"}
                    type={"password"}
                    id={"password-equal-input-box"}
                    placeholder={"비밀번호 확인"}
                    value={equalPassword}
                    setValue={setEqualPassword}
                    onKeyPress={signUp}
                    message={equalPasswordMessage}
                />
                <button className="login-btn" onClick={signUp}>회원가입</button>
                <div className="link-wrap">
                    <Link className="signup" to="/login">뒤로가기</Link>
                </div>
            </div>
            <div className="bar">또는</div>
            <SocialLoginBtns/>
        </div>
    );
}

export default SignUp;
