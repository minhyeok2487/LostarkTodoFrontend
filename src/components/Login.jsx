import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button
} from "@mui/material";
import '../App.css';
import { socialLogin } from "../service/api-service";


function Login() {
  const handleSociallogin = (provider) => {
    socialLogin(provider);
  }
  const testLogin = () => {
    const token = process.env.REACT_APP_TEST_TOKEN;
    localStorage.setItem("ACCESS_TOKEN", token);
    window.location.href = "/";
  }

  return (
    <>
      <Container component="main" maxWidth="xs" style={{height:"90vh" }}>
        <Grid container spacing={2} style={{marginTop:"30%"}}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" textAlign={"center"} style={{color:"var(--text-color)"}}>
              로그인 후 이용해주세요
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => handleSociallogin("google")} fullWidth variant="contained">
              구글 로그인
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography onClick={() => testLogin()} variant="body1" style={{cursor:"pointer", textAlign:"center", color:"blueviolet"}}>
              테스트 계정 사용해보기
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Login;