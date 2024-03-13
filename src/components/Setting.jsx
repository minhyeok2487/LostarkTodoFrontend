import React, { useState, useEffect } from "react";
import '../App.css';
import { call } from "../service/api-service";
import LinearIndeterminate from '../fragments/LinearIndeterminate';
import {FormControl, FormControlLabel, Grid, MenuItem, Select} from "@mui/material";
import Switch from '@mui/material/Switch';


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

    const handleChange = async (event, characterId, characterName, settingName) => {
        try {
            setShowLinearProgress(true);
            const updatedCharacters = await Promise.all(
                characters.map(async (character) => {
                    if (character.id === characterId) {
                        try {
                            const updateContent = {
                                characterId: characterId,
                                characterName: characterName,
                                value: event.target.checked,
                                name: settingName
                            };

                            const updatedCharacter = await call("/v2/character/settings", "PATCH", updateContent)
                                .then((response) => {
                                    return response;
                                })
                                .catch((error) => {
                                    alert(error.errorMessage);
                                });
                            return updatedCharacter;
                        } catch (error) {
                            return {
                                ...character
                            };
                        }
                    }
                    return character;
                })
            );
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updating day content:', error);
        } finally {
            setShowLinearProgress(false);
        }
    };



    const selectSetting = (characterId, characterName, setting, settingName) => (
        <FormControlLabel
            control={
                <Switch
                    id={`${characterName}_${settingName}`}
                    onChange={(event) => handleChange(event, characterId, characterName, settingName)}
                    checked={setting}
                />
            }
            label={setting ? "출력" : "미출력"}
            labelPlacement="start"
        />
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
                                        <span>@{character.serverName}  {character.characterClassName}</span>
                                        <h3 style={{ margin: 0 }}>{character.characterName}</h3>
                                        <h2 style={{ margin: 0 }}>Lv. {character.itemLevel}</h2>
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content" style={{ justifyContent: "space-around" }}>
                                            <div>
                                                <span style={{fontWeight:"bold"}}>캐릭터 출력</span>
                                            </div>
                                            {selectSetting(character.characterId, character.characterName, character.showCharacter, "showCharacter")}
                                        </div>
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
                                <div className="character-wrap" style={{marginTop:10}}>
                                    <p className="title" style={{paddingTop:8}}>주간 숙제</p>
                                    <div className="content-wrap">
                                        <div className="content" style={{ justifyContent: "space-around" }}>
                                            <div>
                                                주간 레이드
                                                {selectSetting(character.characterId, character.characterName, character.showWeekTodo, "showWeekTodo")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content" style={{ justifyContent: "space-around" }}>
                                            <div>
                                                주간 에포나
                                                {selectSetting(character.characterId, character.characterName, character.showWeekEpona, "showWeekEpona")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content" style={{ justifyContent: "space-around" }}>
                                            <div>
                                                실마엘 교환
                                                {selectSetting(character.characterId, character.characterName, character.showSilmaelChange, "showSilmaelChange")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content-wrap">
                                        <div className="content" style={{ justifyContent: "space-around" }}>
                                            <div>
                                                큐브 티켓
                                                {selectSetting(character.characterId, character.characterName, character.showCubeTicket, "showCubeTicket")}
                                            </div>
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