import React from 'react';
import Skeleton from "@mui/material/Skeleton";

const MainCharacters = ({ characters, mainCharacter, isLoading }) => {
    const calAverageLevel = characters.reduce((accumulator, character) => {
        accumulator += character.itemLevel;
        return accumulator;
    }, 0);

    const supportList = ["바드", "도화가", "홀리나이트"];
    const countDealer = characters.reduce((accumulator, character) => {
        if (!supportList.includes(character.characterClassName)) {
            accumulator++
        }
        return accumulator;
    }, 0);

    const countSupport = characters.reduce((accumulator, character) => {
        if (supportList.includes(character.characterClassName)) {
            accumulator++
        }
        return accumulator;
    }, 0);


    return (
        <div className="main-characters">
            <div className="characters-info-header">
                <h1>대표 캐릭터</h1>
            </div>
            {isLoading ?
                <Skeleton variant="rounded" width="100%" height="100%" sx={{marginTop:3}} /> :
                <>
                    <div className="characters-info">
                        <div className="represent">
                            <span className="img"
                                  style={{
                                      backgroundImage: mainCharacter.characterImage !== null ? `url(${mainCharacter.characterImage})` : "",
                                      backgroundPosition: mainCharacter.characterClassName === "도화가" || mainCharacter.characterClassName === "기상술사" ? "50% 32%" : "50% 10%",
                                      backgroundColor: "black", // 캐릭터가 이미지가 없으면 배경색을 검정으로 설정
                                  }}>
                            ></span>
                            <span className="name">{mainCharacter.characterName}</span>
                            <span className="level">Lv. {mainCharacter.itemLevel}</span>
                            <span className="info">@{mainCharacter.serverName} </span>
                            <span className="info">{mainCharacter.characterClassName}</span>
                        </div>
                        <div className="character-list">
                            {characters.map((character, index) => (
                                <div key={index} className="character-info-box">
                                    <span className="character-server">@{character.serverName}</span>
                                    <span className="character-className">{character.characterClassName}</span>
                                    <span className="character-name">{character.characterName}</span>
                                    <span className="character-itemLevel">Lv. {character.itemLevel}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="characters-info">
                        <div className="characters-average">
                            <span className="characters-average-text">평균 아이템 레벨 : &nbsp;</span>
                            <span className="characters-average-level">Lv.{(calAverageLevel/characters.length).toFixed(2)}</span>
                        </div>
                        <div className="characters-info-summary">
                            <div className="summary">
                                <span>총 : &nbsp;</span>
                                <span>{characters.length} 캐릭</span>
                            </div>
                            <div className="summary">
                                <span>딜러 : &nbsp;</span>
                                <span>{countDealer} 캐릭</span>
                            </div>
                            <div className="summary">
                                <span>서폿 : &nbsp;</span>
                                <span>{countSupport} 캐릭</span>
                            </div>
                        </div>
                    </div>
                </>}
        </div>
    );
};

export default MainCharacters;
