import React, { useState, useEffect } from "react";
import { call } from "../../service/api-service";
import SearchIcon from '@mui/icons-material/Search';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from "@mui/material";
import Notification from '../../fragments/Notification';
import LinearIndeterminate from '../../fragments/LinearIndeterminate';
import FriendWeekTodoWrap from "./FriendWeekTodoWrap";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Category } from "@mui/icons-material";


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

export default function FriendsWrap() {
    const [tabValue, setTabValue] = useState(0);
    const [friends, setFriends] = useState([]);
    const [characters, setCharacters] = useState([]);
    const handleChange = (event, friend) => {
        const index = friends.indexOf(friend);

        if (index !== -1) {
            setTabValue(index + 1);
            setCharacters(friend.characterList);
        } else {
            setTabValue(0);
            setCharacters([]);
        }
    };

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
        call("/v2/friends", "GET", null)
            .then((response) => {
                setFriends(response);
            })
            .catch((error) => { showMessage(error.errorMessage) });
    }, []);

    const findCharacter = () => {
        const characterName = document.getElementById('find-character').value;
        if (characterName === '') {
            showMessage("캐릭터명을 입력하여주십시오.");
        } else {
            call("/v2/friends/character/" + characterName, "GET", null)
                .then((response) => {
                    openFindCharacterFriend(response);
                })
                .catch((error) => {
                    showMessage(error.errorMessage);
                });
        }
    }

    /**
     * 각종 정보창 모달 관련
     */
    // 모달 열기/닫기 상태 관리
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    // 모달 열기 함수
    const openFindCharacterFriend = (findCharacterFriend) => {
        setModalTitle("검색 결과");
        var content = findCharacterFriend.map((character) => {
            return (
                <div key={character.id}>
                    <p>{character.username}
                        <Button variant="outlined" onClick={() => requestFriend(character.areWeFriend, character.username)}>
                            {character.areWeFriend}
                        </Button>
                    </p>
                </div>
            );
        });
        var modalContent = (
            <div>
                {content}
            </div>
        );
        setModalContent(modalContent);
        setOpenModal(true);
    };

    // 모달 닫기 함수
    const closeContentModal = () => {
        setOpenModal(false);
        setModalTitle("");
        setModalContent("");
    };

    const requestFriend = (category, fromMember) => {
        console.log(fromMember);
        if (category === "깐부 요청") {
            call("/v2/friends/" + fromMember, "POST", null)
                .then((response) => {
                    setFriends(response);
                    closeContentModal();
                })
                .catch((error) => {
                    showMessage(error.errorMessage);
                });
        }
    }

    const handleRequest = (category, fromMember) => {
        call("/v2/friends/" + fromMember + "/" + category, "PATCH", null)
            .then((response) => {
                setFriends(response);
            })
            .catch((error) => {
                showMessage(error.errorMessage);
            });
    }

    const [showLinearProgress, setShowLinearProgress] = useState(false);
    return (
        <>
            {showLinearProgress && <LinearIndeterminate />}
            <div className="wrap">
                <div>
                    <TextField id="find-character" label="캐릭터 닉네임 입력" variant="outlined" size="small" />
                    <Button variant="outlined" onClick={() => findCharacter()}>검색</Button>
                </div>
                <div className="todo-wrap" >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width:"100vw", maxWidth:"1280px"}}>
                        <Tabs value={tabValue} onChange={(event, friend) => handleChange(event, friend)} aria-label="basic tabs example">
                            <Tab label="깐부 리스트" {...a11yProps(0)} />
                            {friends.map((friend, index) =>
                                friend.areWeFriend === "깐부" && (
                                    <Tab
                                        label={friend.nickName}
                                        {...a11yProps(index + 1)}
                                        key={friend.id}
                                        onClick={(event) => handleChange(event, friend)}
                                    />
                                )
                            )}
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabValue} index={0}>
                        {friends.map((friend) => (
                            <div style={{ display: "flex", flexDirection: "row", margin:10 }} key={friend.id}>
                                <div style={{ marginRight: 10 }}>{friend.friendUsername}</div>
                                <div style={{ marginRight: 10 }}>{friend.nickName}</div>
                                {friend.areWeFriend === "깐부 요청 진행중" && <div style={{ color: 'blue' }}>{friend.areWeFriend}</div>}
                                {friend.areWeFriend === "깐부 요청 받음" &&
                                    <div>
                                        <Button variant="outlined" onClick={() => handleRequest("ok", friend.friendUsername)}>수락</Button>
                                        <Button variant="outlined" color="error" onClick={() => handleRequest("reject", friend.friendUsername)}>거절</Button>
                                    </div>}
                                {friend.areWeFriend === "깐부" && <div style={{ fontWeight: "bold" }}>{friend.areWeFriend}</div>}
                                {friend.areWeFriend === "요청 거부" && <div style={{ color: 'red' }}>{friend.areWeFriend}</div>}
                            </div>
                        ))}
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={tabValue}>
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
                                    <FriendWeekTodoWrap
                                        characters={characters}
                                        setCharacters={setCharacters}
                                        character={character}
                                        setModalTitle={setModalTitle}
                                        setModalContent={setModalContent}
                                        setOpenModal={setOpenModal}
                                        setShowLinearProgress={setShowLinearProgress}
                                        showMessage={showMessage}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </CustomTabPanel>
                </div>
                <Modal
                    open={openModal}
                    onClose={closeContentModal}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <div className="miniModal"
                        style={{
                            position: "absolute",
                            top: "50%", left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#ffffff",
                            padding: "20px 30px 20px 20px", width: "auto", overflowY: "auto",
                            maxHeight: 450,
                        }}>
                        <Typography variant="h5" id="modal-title" style={{ color: "white", backgroundColor: "black", borderRadius: 7, textAlign: "center" }}>
                            {modalTitle}
                        </Typography>
                        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", lineHeight: 2, fontWeight: "bold" }}>
                            {modalContent}
                        </pre>
                    </div>
                </Modal>
            </div >

            < Notification
                message={snackbarMessage}
                open={openSnackbar}
                handleClose={handleSnackbarClose}
            />
        </>
    );
}
