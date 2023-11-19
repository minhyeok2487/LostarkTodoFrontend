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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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
    const handleChange = (event, friend) => {
        const index = friends.indexOf(friend);

        setTabValue(index);
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

    const handleRequest = (category, fromMember) => {
        call("/v2/friends/" + fromMember + "/" + category, "PATCH", null)
            .then((response) => {
                setFriends(response);
            })
            .catch((error) => {
                showMessage(error.errorMessage);
            });
    }

    // 모달 열기 함수
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
                            </div>}
                        {friend.areWeFriend !== "깐부 요청 받음" && <div>권한 : {friend.areWeFriend}</div>}
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

    //일일 숙제 체크 관련
    const updateDayContent = async (characterId, category, authority) => {
        if (!authority) {
            showMessage("권한이 없습니다.");
            return;
        }
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                var updatedCharacter = {
                    ...character,
                };
                const updateContent = {
                    characterId: character.id,
                    characterName: character.characterName,
                };
                return call("/v2/friends/day-content/check/" + category, "PATCH", updateContent)
                    .then((response) => {
                        setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        setShowLinearProgress(false);
                        showMessage(error.errorMessage);
                        updatedCharacter[`${category}Check`] = 0;
                        return updatedCharacter;
                    });
            }
            return character;
        });
        const updatedCharactersResult = await Promise.all(updatedCharacters);
        setCharacters(updatedCharactersResult);
    };

    const updateDayContentAll = async (e, characterId, category, authority) => {
        e.preventDefault();
        if (!authority) {
            showMessage("권한이 없습니다.");
            return;
        }
        setShowLinearProgress(true);
        const updatedCharacters = characters.map((character) => {
            if (character.id === characterId) {
                var updatedCharacter = {
                    ...character,
                };
                const updateContent = {
                    characterId: character.id,
                    characterName: character.characterName,
                };
                return call("/v2/friends/day-content/check/" + category + "/all", "PATCH", updateContent)
                    .then((response) => {
                        setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        setShowLinearProgress(false);
                        showMessage(error.errorMessage);
                        updatedCharacter[`${category}Check`] = 0;
                        return updatedCharacter;
                    });
            }
            return character;
        });
        const updatedCharactersResult = await Promise.all(updatedCharacters);
        setCharacters(updatedCharactersResult);
    };

    const [showLinearProgress, setShowLinearProgress] = useState(false);
    return (
        <>
            {showLinearProgress && <LinearIndeterminate />}
            <div className="wrap">
                <div>
                    <p>임시 디자인으로 모바일은 화면이 이상할 수 있습니다.</p>
                </div>
                <div>
                    <TextField id="find-character" label="캐릭터 닉네임 입력" variant="outlined" size="small" />
                    <Button variant="outlined" onClick={() => findCharacter()}>검색</Button>
                </div>
                <div className="todo-wrap" >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "100vw", maxWidth: "1280px" }}>
                        <Tabs value={tabValue} onChange={(event, friend) => handleChange(event, friend)} aria-label="basic tabs example">
                            {/* <Tab label="깐부 리스트" {...a11yProps(0)} /> */}
                            {friends.map((friend, index) =>
                                friend.areWeFriend === "깐부" && (
                                    <Tab
                                        label={friend.nickName}
                                        {...a11yProps(index)}
                                        key={friend.id}
                                        onClick={(event) => handleChange(event, friend)}
                                    />
                                )
                            )}
                        </Tabs>
                    </Box>
                    {/* <CustomTabPanel value={tabValue} index={0} sx={{ width: "100%" }}>
                        <TableContainer className="setting-table-wrap">
                            <Table aria-label="simple table" className="setting-table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell style={{ color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }} >id</TableCell>
                                        <TableCell style={{ color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }} align="right">이메일</TableCell>
                                        <TableCell style={{ color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }} align="right">별명</TableCell>
                                        <TableCell style={{ color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }} align="right">상태</TableCell>
                                        <TableCell style={{ color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }} align="center">일일 숙제 출력 권한</TableCell>
                                        <TableCell style={{ color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }} align="center">일일 숙제 체크 권한</TableCell>
                                        <TableCell style={{ color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }} align="center">레이드 출력 권한</TableCell>
                                        <TableCell style={{ color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }} align="center">레이드 체크 권한</TableCell>
                                        <TableCell style={{ color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }} align="center">주간 숙제 출력 권한</TableCell>
                                        <TableCell style={{ color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }} align="center">주간 숙제 수정 권한</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {friends.map((friend, index) => (
                                        <TableRow
                                            key={friend.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell style={{ color: "var(--text-color)" }} component="th" scope="row">
                                                {index}
                                            </TableCell>
                                            <TableCell style={{ color: "var(--text-color)", transition: "color 0.5s" }} align="right">{friend.friendUsername}</TableCell>
                                            <TableCell style={{ color: "var(--text-color)", transition: "color 0.5s" }} align="right">{friend.nickName}</TableCell>
                                            <TableCell style={{ color: "var(--text-color)", transition: "color 0.5s" }} align="right">
                                                {friend.areWeFriend === "깐부 요청 진행중" && <div style={{ color: 'blue' }}>{friend.areWeFriend}</div>}
                                                {friend.areWeFriend === "깐부 요청 받음" &&
                                                    <div>
                                                        <Button variant="outlined" onClick={() => handleRequest("ok", friend.friendUsername)}>수락</Button>
                                                        <Button variant="outlined" color="error" onClick={() => handleRequest("reject", friend.friendUsername)}>거절</Button>
                                                    </div>}
                                                {friend.areWeFriend === "깐부" && <div style={{ fontWeight: "bold" }}>{friend.areWeFriend}</div>}
                                                {friend.areWeFriend === "요청 거부" && <div style={{ color: 'red' }}>{friend.areWeFriend}</div>}
                                            </TableCell>
                                            <TableCell align="center">
                                                <div>{selectSetting(friend.id, friend.toFriendSettings.showDayTodo, "showDayTodo")}</div>
                                                <div>상대방 권한 : {friend.fromFriendSettings.showDayTodo.toString()}</div>
                                            </TableCell>
                                            <TableCell align="center">
                                                <div>{selectSetting(friend.id, friend.toFriendSettings.checkDayTodo, "checkDayTodo")}</div>
                                                <div>상대방 권한 : {friend.fromFriendSettings.checkDayTodo.toString()}</div>
                                            </TableCell>
                                            <TableCell align="center">
                                                <div>{selectSetting(friend.id, friend.toFriendSettings.showRaid, "showRaid")}</div>
                                                <div>상대방 권한 : {friend.fromFriendSettings.showRaid.toString()}</div>
                                            </TableCell>
                                            <TableCell align="center">
                                                <div>{selectSetting(friend.id, friend.toFriendSettings.checkRaid, "checkRaid")}</div>
                                                <div>상대방 권한 : {friend.fromFriendSettings.checkRaid.toString()}</div>
                                            </TableCell>
                                            <TableCell align="center">
                                                <div>{selectSetting(friend.id, friend.toFriendSettings.showWeekTodo, "showWeekTodo")}</div>
                                                <div>상대방 권한 : {friend.fromFriendSettings.showWeekTodo.toString()}</div>
                                            </TableCell>
                                            <TableCell align="center">
                                                <div>{selectSetting(friend.id, friend.toFriendSettings.checkWeekTodo, "checkWeekTodo")}</div>
                                                <div>상대방 권한 : {friend.fromFriendSettings.checkWeekTodo.toString()}</div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CustomTabPanel> */}
                    <CustomTabPanel value={tabValue} index={tabValue}>
                        {characters !== null && <div className="setting-wrap">
                            <button
                                style={{ cursor: "pointer" }}
                                onClick={() => openSettingForm(tabValue)}
                            >
                                설정
                            </button>
                        </div>}
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
                                        {friendSetting.showDayTodo && <div>
                                            <div className="content-wrap">
                                                <div className="content"
                                                    onClick={() => updateDayContent(character.id, "epona", friendSetting.checkDayTodo)}
                                                    onContextMenu={(e) => updateDayContentAll(e, character.id, "epona", friendSetting.checkDayTodo)}
                                                    style={{ cursor: "pointer" }}
                                                >
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
                                                <div className="content" onClick={() => updateDayContent(character.id, "chaos", friendSetting.checkDayTodo)}
                                                    onContextMenu={(e) => updateDayContentAll(e, character.id, "chaos", friendSetting.checkDayTodo)}
                                                    style={{ cursor: "pointer" }}>
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
                                                <div className="content" onClick={() => updateDayContent(character.id, "guardian", friendSetting.checkDayTodo)}
                                                    onContextMenu={(e) => updateDayContentAll(e, character.id, "guardian", friendSetting.checkDayTodo)}
                                                    style={{ cursor: "pointer" }}>
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
                                        </div>}
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
                                        friendSetting={friendSetting}
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
