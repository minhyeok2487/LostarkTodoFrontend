import React from "react";
import {
  Container,
  Grid,
  Typography,
  Button
} from "@mui/material";
import { socialLogin } from "../service/api-service";


function Login() {
  const handleSociallogin = (provider) => {
    socialLogin(provider);
  }

  return (
    <>
      <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" textAlign={"center"}>
              로그인 후 이용해주세요
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => handleSociallogin("google")} fullWidth variant="contained" style={{ backgroundColor: '#000' }}>
              구글 로그인
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Login;