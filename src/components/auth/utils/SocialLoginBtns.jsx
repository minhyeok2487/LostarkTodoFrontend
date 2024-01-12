import React from 'react';
import * as auth from "../../../apis/auth";

const SocialLoginBtns = () => {
    const handleSocialLogin = (provider) => {
        auth.socialLogin(provider);
    }

    return (
        <div className="auth-login-btns">
            <button type="button" className="login-with-google-btn" onClick={() => handleSocialLogin("google")}>
                구글 로그인으로 시작하기
            </button>
        </div>
    );
};

export default SocialLoginBtns;