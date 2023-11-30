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
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FriendTodoWrap from "./FriendTodoWrap";


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
    const [friendSetting, setFriendSetting] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [state, setState] = useState(null);
    const [friendUsername, setFriendUsername] = useState(null);
    const handleChange = (event, friend) => {
        const index = friends.indexOf(friend);

        setTabValue(index);
        setState(friend.areWeFriend);
        setFriendUsername(friend.username);
        setCharacters(friend.characterList);
        setFriendSetting(friend.fromFriendSettings);
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
                if (response !== null) {
                    setFriends(response);
                    console.log(response);
                    setTabValue(0);
                    setState(response[0].areWeFriend);
                    setFriendUsername(response[0].username);
                    setCharacters(response[0].characterList);
                    setFriendSetting(response[0].fromFriendSettings);
                }
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
                    <p>{character.username.substring(0, 5) + '*'.repeat(character.username.length - 5)}
                        <Button variant="outlined" onClick={() => requestFriend(character.areWeFriend, character.username)}
                            style={{ marginLeft: 10 }}>
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
    //------------------------- 설정 버튼 관련 -------------------------
    const openSettingForm = (friendsId) => {
        const friend = friends[friendsId];

        setModalTitle(friend.nickName + " 권한 설정");
        var modalContent = (
            <div>
                <div>
                    <p>
                        {friend.areWeFriend === "깐부 요청 받음" &&
                            <div>
                                <Button variant="outlined" onClick={() => handleRequest("ok", friend.friendUsername)}>수락</Button>
                                <Button variant="outlined" color="error" onClick={() => handleRequest("reject", friend.friendUsername)}>거절</Button>
                            </div>
                        }
                        {friend.areWeFriend !== "깐부 요청 받음" &&
                            <div>
                                권한 : {friend.areWeFriend}
                                <Button variant="outlined" color="error" onClick={() => handleRequest("delete", friend.friendUsername)}>깐부 삭제</Button>
                            </div>
                        }
                    </p>
                </div>
                <div>
                    <p>일일 숙제 출력 권한</p>
                    <div>{selectSetting(friend.id, friend.toFriendSettings.showDayTodo, "showDayTodo")}
                        상대방 권한 : {friend.fromFriendSettings.showDayTodo.toString()}</div>
                </div>
                <div>
                    <p>일일 숙제 체크 권한</p>
                    <div>{selectSetting(friend.id, friend.toFriendSettings.checkDayTodo, "checkDayTodo")}
                        상대방 권한 : {friend.fromFriendSettings.checkDayTodo.toString()}</div>
                </div>
                <div>
                    <p>레이드 출력 권한</p>
                    <div>{selectSetting(friend.id, friend.toFriendSettings.showRaid, "showRaid")}
                        상대방 권한 : {friend.fromFriendSettings.showRaid.toString()}</div>
                </div>
                <div>
                    <p>레이드 체크 권한</p>
                    <div>{selectSetting(friend.id, friend.toFriendSettings.checkRaid, "checkRaid")}
                        상대방 권한 : {friend.fromFriendSettings.checkRaid.toString()}</div>
                </div>
                <div>
                    <p>주간 숙제 출력 권한</p>
                    <div>{selectSetting(friend.id, friend.toFriendSettings.showWeekTodo, "showWeekTodo")}
                        상대방 권한 : {friend.fromFriendSettings.showWeekTodo.toString()}</div>
                </div>
                <div>
                    <p>주간 숙제 체크 권한</p>
                    <div>{selectSetting(friend.id, friend.toFriendSettings.checkWeekTodo, "checkWeekTodo")}
                        상대방 권한 : {friend.fromFriendSettings.checkWeekTodo.toString()}</div>
                </div>
            </div>
        );
        setModalContent(modalContent);
        setOpenModal(true);
    };

    const selectSetting = (friendId, setting, settingName) => (
        <FormControl size="small">
            <Select
                id={`${friendId}_${settingName}`}
                onChange={(event) => updateSetting(event, friendId, settingName)}
                defaultValue={setting ? "true" : "false"}
                sx={{ bgcolor: setting ? '#FA5858' : "#81BEF7", color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }}
            >
                <MenuItem value={true} >true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
            </Select>
        </FormControl>
    );

    const updateSetting = (event, friendId, settingName) => {
        setShowLinearProgress(true);
        const updateContent = {
            id: friendId,
            name: settingName,
            value: event.target.value
        };
        call("/v2/friends/settings", "PATCH", updateContent)
            .then((response) => {
                setShowLinearProgress(false);
                var point = document.getElementById(`${friendId}_${settingName}`);
                point.style.backgroundColor = event.target.value ? '#FA5858' : "#81BEF7";
            })
            .catch((error) => {
                alert(error.errorMessage);
            });
    };

    const handleRequest = (category, fromMember) => {
        const confirmMessage = category === "delete" ? "정말 삭제 하시겠습니까?" : null;
    
        const userConfirmed = confirmMessage ? window.confirm(confirmMessage) : true;
    
        if (userConfirmed) {
            setShowLinearProgress(true);
            call(`/v2/friends/${fromMember}/${category}`, "PATCH", null)
                .then((response) => {
                    setShowLinearProgress(false);
                    window.location.replace("/friends");
                })
                .catch((error) => {
                    showMessage(error.errorMessage);
                });
        }
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
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "100vw", maxWidth: "1280px" }}>
                        <Tabs value={tabValue} onChange={(event, friend) => handleChange(event, friend)} aria-label="basic tabs example">
                            {friends.map((friend, index) =>
                                <Tab
                                    label={friend.nickName}
                                    {...a11yProps(index)}
                                    key={friend.id}
                                    onClick={(event) => handleChange(event, friend)}
                                    style={{color:"var(--text-color)"}}
                                />
                            )}
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabValue} index={tabValue}>
                        {characters !== null && <div className="setting-wrap">
                            <button
                                className="content-button"
                                style={{ cursor: "pointer", marginBottom: 0 }}
                                onClick={() => openSettingForm(tabValue)}
                            >
                                깐부 설정
                            </button>
                        </div>}
                        {state === "깐부" && <FriendTodoWrap
                            characters={characters}
                            setCharacters={setCharacters}
                            friends={friends}
                            setFriends={setFriends}
                            tabValue={tabValue}
                            friendSetting={friendSetting}
                            showMessage={showMessage}
                            setShowLinearProgress={setShowLinearProgress}
                            setModalTitle={setModalTitle}
                            setModalContent={setModalContent}
                            setOpenModal={setOpenModal}
                        />}
                        {/* {state === "요청 거부" && <div style={{ color: 'red' }}>{areWeFriend}</div>} */}
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
