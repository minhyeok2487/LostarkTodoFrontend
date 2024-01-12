import React, {useState} from "react";
import * as auth from "../../apis/auth";
import {Link} from "react-router-dom";
import LinearIndeterminate from '../../fragments/LinearIndeterminate';
import {Button, Container, Grid, TextField, Typography} from "@mui/material";

function SignUpCharacters({message = null}) {
    const [showLinearProgress, setShowLinearProgress] = useState(false);

    const handleSubmit = async (event) => {
        try {
            setShowLinearProgress(true);
            event.preventDefault();
            // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
            const data = new FormData(event.target);
            const apiKey = data.get("apiKey");
            const characterName = data.get("characterName");
            await auth.addCharacters(apiKey, characterName);
            alert("완료되었습니다.");
            window.location.reload();

        } catch (error) {
            alert(error.errorMessage);
        } finally {
            setShowLinearProgress(false);
        }
    };


    return (
        <>
            {showLinearProgress && <LinearIndeterminate/>}
            <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
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
                            <p>api 에러시, 복사 하기전 사이트에 번역이 켜있으면 끄고 복사해주세요! </p>
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

export default SignUpCharacters;
