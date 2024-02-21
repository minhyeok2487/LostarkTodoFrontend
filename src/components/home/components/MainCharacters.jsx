import React from 'react';

const MainCharacters = ({ characters, mainCharacter }) => {
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
            <div className="characters-info">
                <div className="characters-info-header">
                    <h1>대표 캐릭터</h1>
                </div>
                {/* Render selected character info */}
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
                    <span className="info">@{mainCharacter.serverName} {mainCharacter.characterClassName}</span>
                </div>
                <div>평균 아이템 레벨 : Lv.{(calAverageLevel/characters.length).toFixed(2)}</div>
                <div className="characters-info-summary">
                    <span className="summary check">총 {characters.length}캐릭</span>
                    <span className="summary">딜러 {countDealer}캐릭</span>
                    <span className="summary">서폿 {countSupport}캐릭</span>
                </div>
            </div>
            <div className="character-list">
                {characters.map((character, index) => (
                    <div key={index} className="character-info-box">
                        <span>@{character.serverName} {character.characterClassName}</span>
                        <h3>{character.characterName}</h3>
                        <h2>Lv. {character.itemLevel}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainCharacters;
