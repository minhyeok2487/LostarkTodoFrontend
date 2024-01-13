import React, {useState} from "react";
import * as auth from "../../apis/auth";
import InputBox from "./utils/InputBox";
import {Link, useNavigate} from "react-router-dom";

function SignUpCharacters({setIsLoading}) {
    const [apiKey, setApiKey] = useState("");
    const [apiKeyMessage, setApiKeyMessage] = useState("");
    const [character, setCharacter] = useState("");
    const [characterMessage, setCharacterMessage] = useState("");

    const navigate = useNavigate();

    // 메시지 리셋
    function messageReset() {
        setApiKeyMessage("");
        setCharacterMessage("");
    }

    // 유효성 검사
    function validation() {
        if (!apiKey || !character) {
            if (!apiKey) {
                setApiKeyMessage("ApiKey를 입력해주세요.");
            }
            if (!character) {
                setCharacterMessage("대표캐릭터를 입력해주세요.");
            }
            return;
        }
    }

    const addCharacter = async () => {
        messageReset();
        validation();
        try {
            setIsLoading(true);
            await auth.addCharacters(apiKey, character);
            alert("완료되었습니다.");
            navigate("/");
        } catch (error) {
            if (error.errorMessage === "존재하지 않는 캐릭터명 입니다.") {
                setCharacterMessage(error.errorMessage);
            } else if (error.errorMessage === "올바르지 않은 apiKey 입니다." ||
                error.errorMessage === "사용한도 (1분에 100개)를 초과했습니다.") {
                setApiKeyMessage(error.errorMessage);
            } else {
                alert(error.errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="auth-container">
            <div className="mention">
                <p>캐릭터 정보 추가</p>
            </div>
            <div className="signup-wrap">
                <InputBox
                    className={"apikey"}
                    type={"text"}
                    id={"apikey-input-box"}
                    placeholder={"로스트아크 ApiKey"}
                    value={apiKey}
                    setValue={setApiKey}
                    onKeyPress={addCharacter}
                    message={apiKeyMessage}
                />
                <InputBox
                    className={"character"}
                    type={"text"}
                    id={"character-input-box"}
                    placeholder={"대표 캐릭터"}
                    value={character}
                    setValue={setCharacter}
                    onKeyPress={addCharacter}
                    message={characterMessage}
                />
                <button className="login-btn" onClick={addCharacter}>캐릭터 정보 추가</button>
                <div className="link-wrap">
                    <Link className="signup" to="/">홈으로</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpCharacters;
