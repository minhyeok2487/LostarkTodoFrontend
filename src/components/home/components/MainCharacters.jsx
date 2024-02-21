import React from 'react';
import ToggleButton from "../../utils/ToggleButton";
import SelectLabels from "../../utils/SelectLabels";
import { Grid } from "@mui/material";

const MainCharacters = ({ serverList, server, setServer, characters }) => {
    return (
        <div className="main-characters"
            // 개발 후 스타일 지우기
            // style={{background:"#aaaaaa"}}
        >
            <div className="characters-info">
                <div className="characters-info-header">
                    <h1>대표 캐릭터</h1>
                    {/* <SelectLabels valueList={serverList} value={server} setValue={setServer}/> */}
                </div>
                {/* Render selected character info */}
                <div className="represent">
                    <span className="img"></span>
                    <span className="name">마볼링</span>
                    <span className="level">Lv.1650.00</span>
                    <span className="info">@루페온 도화가</span>
                </div>
                <div>평균 아이템 레벨 : Lv.1650.00</div>
                <div className="characters-info-summary">
                    <span className="summary check">총 6캐릭</span>
                    <span className="summary">딜러 4캐릭</span>
                    <span className="summary">서폿 2캐릭</span>
                </div>
            </div>
            <div className="character-list">
                <Grid container className="character-item">
                    {characters.map((character, index) => (
                        <Grid key={index} item xs={4}>
                            <div className="character-info-box">
                                <span>@{character.serverName} {character.characterClassName}</span>
                                <h3>{character.characterName}</h3>
                                <h2>Lv. {character.itemLevel}</h2>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default MainCharacters;
