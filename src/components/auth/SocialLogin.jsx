import React from "react";
import { Navigate } from "react-router-dom";

// 소셜 로그인 기능
const SocialLogin = (props) => {
  const getUrlParameter = (name) => { // 쿼리 파라미터에서 값을 추출 해 주는 함수
    let search = window.location.search;
    let params = new URLSearchParams(search);
    return params.get(name);
  };

  const token = getUrlParameter("token");
  const username = getUrlParameter("username");
  // console.log("토큰 파싱: " + token);

  if (token) {
    // console.log("로컬스토리지에 토큰 저장" + token);
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("username", username);
    return (
      <Navigate
        to={{
          pathname: "/",
          state: { from: props.location },
        }}
      />
    );
  } else {
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: { from: props.location },
        }}
      />
    );
  }
};

export default SocialLogin;
