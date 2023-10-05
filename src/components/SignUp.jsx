import React, { useState } from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { signup } from "../service/api-service";
import { Link } from "react-router-dom";
import './Todo.css';
import LinearIndeterminate from '../fragments/LinearIndeterminate';

function SignUp() {
  const [showLinearProgress, setShowLinearProgress] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowLinearProgress(true);
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
    const data = new FormData(event.target);
    const apiKey = data.get("apiKey");
    const characterName = data.get("characterName");
    signup({
      apiKey: apiKey, characterName: characterName
    })
      .then((response) => {
        setShowLinearProgress(false);
        alert("완료되었습니다.");
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.errorMessage);
      });
  };


  return (

    <>
      {showLinearProgress && <LinearIndeterminate />}
      <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" textAlign={"center"}>
                캐릭터 정보 추가
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="apiKey"
                variant="outlined"
                required
                fullWidth
                id="apiKey"
                label="로스트아크 ApiKey"
              />
              <Link to="https://canfactory.tistory.com/1081" target="_blank" variant="body2">
                apikey발급을 모르십니까?
              </Link>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="characterName"
                variant="outlined"
                required
                fullWidth
                id="characterName"
                label="대표캐릭터"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                캐릭터 정보 추가
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
