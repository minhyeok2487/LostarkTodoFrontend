import React from 'react';
import ToggleButton from "../../utils/ToggleButton";
import SelectLabels from "../../utils/SelectLabels";
import { Grid } from "@mui/material";

const MainCharacters = ({ serverList, server, setServer, characters }) => {
    return (
        <div className="main-characters"
             // 개발 후 스타일 지우기
             style={{background:"#aaaaaa"}}
        >
            <div className="characters-info">
                <div className="characters-info-header">
                    <h1>대표 캐릭터</h1>
                    <SelectLabels valueList={serverList} value={server} setValue={setServer}/>
                </div>
                {/* Render selected character info */}
                <div>Lv.1650.00 @루페온 도화가 캐릭터이름1</div>
                <div>평균 아이템 레벨 : Lv.1650.00</div>
                <div className="characters-info-summary">
                    <button className="summary-button check">총 6캐릭</button>
                    <button className="summary-button">딜러 4캐릭</button>
                    <button className="summary-button">서폿 2캐릭</button>
                </div>
            </div>
            <div className="character-list">
                <Grid container spacing={1.5} overflow={"hidden"}>
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
