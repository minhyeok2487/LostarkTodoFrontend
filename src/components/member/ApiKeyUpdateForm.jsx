import React, { useState } from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { call } from "../../service/api-service";
import { Link } from "react-router-dom";
import LinearIndeterminate from '../../fragments/LinearIndeterminate';

function ApiKeyUpdateForm() {
  const [showLinearProgress, setShowLinearProgress] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowLinearProgress(true);
    // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
    const data = new FormData(event.target);
    const updateData = {
      apiKey: data.get("apiKey")
    }
    call("/member/api-key", "PATCH", updateData)
      .then((response) => {
        setShowLinearProgress(false);
        alert("완료되었습니다.");
        window.location.href = "/";
      })
      .catch((error) => {
        setShowLinearProgress(false);
        alert(error.errorMessage);
      });
  };

  return (

    <>
      {showLinearProgress && <LinearIndeterminate />}
      <Container component="main" maxWidth="xs" >
        <form noValidate onSubmit={handleSubmit} style={{marginTop:"30%"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" textAlign={"center"} style={{color:"var(--text-color)"}}>
                API KEY 업데이트
              </Typography>
            </Grid>
            <Grid item xs={12} >
              <TextField
                name="apiKey"
                variant="outlined"
                required
                fullWidth
                id="apiKey"
                label="로스트아크 ApiKey"
              />
              <Link to="https://canfactory.tistory.com/1081" target="_blank" variant="body2" style={{color:"var(--text-color)"}}>
                apikey발급을 모르십니까?
              </Link>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                API KEY 업데이트
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default ApiKeyUpdateForm;
