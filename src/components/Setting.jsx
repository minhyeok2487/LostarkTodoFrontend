import React, { useState, useEffect } from "react";
import '../App.css';
import { call } from "../service/api-service";
import LinearIndeterminate from '../fragments/LinearIndeterminate';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from "@mui/material";


export default function Setting() {
    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        call("/member/settings", "GET", null)
            .then((response) => {
                setCharacters(response);
            })
            .catch((error) => {
                alert(error.errorMessage);
            });
    }, []);

    const handleChange = (event, characterId, characterName, settingName) => {
        setShowLinearProgress(true);
        const updateContent = {
            characterId: characterId,
            characterName: characterName,
            value: event.target.value,
            name: settingName
        };
        call("/v2/character/settings", "PATCH", updateContent)
            .then((response) => {
                setShowLinearProgress(false);
                var point = document.getElementById(`${characterName}_${settingName}`);
                point.style.backgroundColor = event.target.value ? '#FA5858' : "#81BEF7";
            })
            .catch((error) => {
                alert(error.errorMessage);
            });
    };

    const selectSetting = (characterId, characterName, setting, settingName) => (
        <FormControl size="small">
            <Select
                id={`${characterName}_${settingName}`}
                onChange={(event) => handleChange(event, characterId, characterName, settingName)}
                defaultValue={setting ? "true" : "false"}
                sx={{ bgcolor: setting ? '#FA5858' : "#81BEF7", color: "var(--text-color)", fontWeight: "bold", transition: "color 0.5s" }}
            >
                <MenuItem value={true} >출력</MenuItem>
                <MenuItem value={false}>미출력</MenuItem>
            </Select>
        </FormControl>
    );
    const [showLinearProgress, setShowLinearProgress] = useState(false);
    return (
        <>
            {showLinearProgress && <LinearIndeterminate />}
            <div className="wrap">
                <div className="todo-wrap setting" >
                    <Grid container spacing={1.5} overflow={"hidden"}>
                        {characters.map((character) => (
                            <Grid key={character.sortNumber} item>
                                <div className="character-wrap">
                                    <div className="character-info"
                                        style={{
                                            backgroundImage: character.characterImage !== null ? `url(${character.characterImage})` : "",
                                            backgroundPosition: character.characterClassName === "도화가" || character.characterClassName === "기상술사" ? "left 10px top -80px" : "left 10px top -30px",
                                            backgroundColor: "gray", // 배경색을 회색으로 설정
                                        }}>
                                        {/* character.goldCharacter 변수 없음 */}
                                        <div className={character.goldCharacter ? "gold-border" : ""}>
                                            {character.goldCharacter ? "골드 획득 지정" : ""}
                                        </div>
                                        <span>@{character.serverName}  {character.characterClassName}</span>
                                        <h3 style={{ margin: 0 }}>{character.characterName}</h3>
                                        <h2 style={{ margin: 0 }}>Lv. {character.itemLevel}</h2>
                                        {selectSetting(character.characterId, character.characterName, character.showCharacter, "showCharacter")}
                                    </div>
                                    <p className="title">일일 숙제</p>
                                    <div className="content-wrap">
                                        <div className="content" style={{ justifyContent: "space-around" }}>
                                            <div>
                                                <span>에포나의뢰</span>
                                            </div>
                                            {selectSetting(character.characterId, character.characterName, character.showEpona, "showEpona")}
                                        </div>
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content" style={{ justifyContent: "space-around" }}>
                                            <div>
                                                <p>카오스던전</p>
                                            </div>
                                            {selectSetting(character.characterId, character.characterName, character.showChaos, "showChaos")}
                                        </div>
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content" style={{ justifyContent: "space-around" }}>
                                            <div>
                                                <p>가디언토벌</p>
                                            </div>
                                            {selectSetting(character.characterId, character.characterName, character.showGuardian, "showGuardian")}
                                        </div>
                                    </div>
                                </div>
                                <div className="character-wrap">
                                    <p className="title">주간 숙제</p>
                                    <div className="content" style={{ justifyContent: "space-around" }}>
                                        <div>
                                            주간 레이드
                                            {selectSetting(character.characterId, character.characterName, character.showWeekTodo, "showWeekTodo")}
                                        </div>
                                    </div>
                                    <div className="content" style={{ justifyContent: "space-around" }}>
                                        <div>
                                            주간 에포나
                                            {selectSetting(character.characterId, character.characterName, character.showWeekEpona, "showWeekEpona")}
                                        </div>
                                    </div>
                                    <div className="content" style={{ justifyContent: "space-around" }}>
                                        <div>
                                            실마엘 교환
                                            {selectSetting(character.characterId, character.characterName, character.showSilmaelChange, "showSilmaelChange")}
                                        </div>
                                    </div>
                                    <div className="content" style={{ justifyContent: "space-around" }}>
                                        <div>
                                            큐브 티켓
                                            {selectSetting(character.characterId, character.characterName, character.showCubeTicket, "showCubeTicket")}
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
        </>
    );
}