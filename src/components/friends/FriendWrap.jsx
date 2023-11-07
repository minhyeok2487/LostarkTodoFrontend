import React, { useState, useEffect } from "react";
import { call } from "../../service/api-service";
import SearchIcon from '@mui/icons-material/Search';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from "@mui/material";
import Notification from '../../fragments/Notification';
import LinearIndeterminate from '../../fragments/LinearIndeterminate';
import WeekTodoWrap from "../todo/WeekTodoWrap";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

//------------------------- 탭관련 -------------------------
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    );
}
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
//-----------------------------------------------------

export default function FriendWrap() {
    const [tabValue, setTabValue] = useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const [characters, setCharacters] = useState([]); //캐릭터 리스트
    const [servers, setServers] = useState([]); //서버 리스트
    const [selectedServer, setSelectedServer] = useState(null);
    const [showLinearProgress, setShowLinearProgress] = useState(false);

    //Notification 관련
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const showMessage = (message) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };

    //------------------------- 페이지 로드시 호출 -------------------------
    useEffect(() => {
        // 서버 정보 불러오기
        call("/member/characterList/server", "GET", null)
            .then((response) => {
                setServers(response);
                // 서버 정보가 로드된 후 첫 번째 서버 정보를 사용하여 캐릭터 정보 불러오기
                const firstServerName = Object.keys(response)[0];
                setSelectedServer(firstServerName);
                call("/member/characterList-v3/" + firstServerName, "GET", null)
                    .then((characterResponse) => {
                        setCharacters(characterResponse);
                        console.log(characterResponse);
                    })

            })
            .catch((error) => {
                if (error.errorMessage[0] === "등록된 캐릭터가 없습니다.") {
                    window.location.href = "/signup";
                } else {
                    alert(error.errorMessage);
                    localStorage.setItem("ACCESS_TOKEN", null);
                    window.location.href = "/login";
                }
            });
    }, []);



    return (
        <>
            {showLinearProgress && <LinearIndeterminate />}
            <div className="wrap">
                <div className="todo-wrap" >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Item One" {...a11yProps(0)} />
                            <Tab label="Item Two" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabValue} index={0}>
                        <Grid container spacing={1.5} overflow={"hidden"}>
                            {characters.map((character) => (
                                <Grid key={character.id} item>
                                    <div className="character-wrap">
                                        <div className="character-info"
                                            style={{
                                                backgroundImage: character.characterImage !== null ? `url(${character.characterImage})` : "",
                                                backgroundPosition: character.characterClassName === "도화가" || character.characterClassName === "기상술사" ? "left 10px top -80px" : "left 10px top -30px",
                                                backgroundColor: "gray", // 배경색을 회색으로 설정
                                            }}>
                                            <div className={character.goldCharacter ? "gold-border" : ""}>
                                                {character.goldCharacter ? "골드 획득 지정" : ""} {/* pub 문구변경 */}
                                            </div>
                                            <span>@{character.serverName}  {character.characterClassName}</span>
                                            <h3 style={{ margin: 0 }}>{character.characterName}</h3>
                                            <h2 style={{ margin: 0 }}>Lv. {character.itemLevel}</h2>
                                        </div>
                                        <p className="title">일일 숙제</p>{/* pub 추가 */}
                                        <div className="content-wrap">
                                            <div className="content" >
                                                <button
                                                    className={`content-button ${character.eponaCheck === 3 ? "done" :
                                                        character.eponaCheck === 1 ? "ing" :
                                                            character.eponaCheck === 2 ? "ing2" : ""}`}
                                                >
                                                    {character.eponaCheck === 3 ? <DoneIcon /> : <CloseIcon />}
                                                </button>
                                                <div
                                                    className={`${character.eponaCheck === 3 ? "text-done" : ""}`}>
                                                    <span>에포나의뢰</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-wrap">
                                            <div className="content">
                                                {/* pub 순서변경 */}
                                                <button
                                                    className={`content-button ${character.chaosCheck === 0 ? "" :
                                                        character.chaosCheck === 1 ? "ing" : "done"}`}
                                                >
                                                    {character.chaosCheck === 2 ? <DoneIcon /> : <CloseIcon />}
                                                </button>
                                                <div
                                                    className={`${character.chaosCheck === 2 ? "text-done" : ""}`}
                                                >
                                                    <p>카오스던전</p>
                                                    <p className="gold">({character.chaosGold} gold)</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content-wrap">
                                            <div className="content" >
                                                <button
                                                    className={`content-button ${character.guardianCheck === 1 ? "done" : ""}`}
                                                >
                                                    {character.guardianCheck === 1 ? <DoneIcon /> : <CloseIcon />}
                                                </button>
                                                <div
                                                    className={`${character.guardianCheck === 1 ? "text-done" : ""}`}
                                                >
                                                    <p>가디언토벌</p>
                                                    <p className="gold">({character.guardianGold} gold)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <WeekTodoWrap
                                    characters={characters}
                                    setCharacters={setCharacters}
                                    character={character}
                                    setModalTitle={setModalTitle}
                                    setModalContent={setModalContent}
                                    setOpenModal={setOpenModal}
                                    setShowLinearProgress={setShowLinearProgress}
                                    showMessage={showMessage}
                                /> */}
                                </Grid>
                            ))}
                        </Grid>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        Item Two
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={2}>
                        Item Three
                    </CustomTabPanel>

                </div>
            </div >

            < Notification
                message={snackbarMessage}
                open={openSnackbar}
                handleClose={handleSnackbarClose}
            />
        </>
    );
}
