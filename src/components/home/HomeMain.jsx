import React, {useEffect, useState} from 'react';
import './Home.css';
import MainCharacters from "./components/MainCharacters";
import MainProfit from "./components/MainProfit";
import MainNotices from "./components/MainNotices";
import MainRaids from "./components/MainRaids";
import MainWeekly from "./components/MainWeekly";
import Footer from "../../utils/Footer";

const HomeMain = ({
}) => {
    const [serverList, setServerList] = useState([]);
    const [server, setServer] = useState(null);
    const [characters, setChracters] = useState([]);

    const getCharacters = async () => {
        const data = [
            {characterClassName : "도화가",
            characterName : "캐릭터이름1",
            itemLevel : 1650.00, serverName : "루페온"},
            {characterClassName : "소서리스",
                characterName : "캐릭터이름2",
                itemLevel : 1650.00, serverName : "루페온"},
            {characterClassName : "서머너",
                characterName : "캐릭터이름3",
                itemLevel : 1650.00, serverName : "루페온"},
            {characterClassName : "바드",
                characterName : "캐릭터이름4",
                itemLevel : 1650.00, serverName : "루페온"},
            {characterClassName : "기상술사",
                characterName : "캐릭터이름5",
                itemLevel : 1650.00, serverName : "루페온"},
            {characterClassName : "소울이터",
                characterName : "캐릭터이름6",
                itemLevel : 1650.00, serverName : "루페온"},
        ];

        setChracters(data);
    };

    useEffect(() => {
        setServerList(["전체서버", "루페온", "아브렐슈드"]);
        setServer("전체서버");
        getCharacters();
    }, []);

    return (
        <div className="wrap">
            <div className="home-wrap">
                <div className="home-content">
                    {/*대표 캐릭터*/}
                    <MainCharacters
                        serverList={serverList}
                        server={server}
                        setServer={setServer}
                        characters={characters}
                    />

                    {/*숙제 수익 요약*/}
                    <MainProfit />
                </div>
                <div className="home-content">
                    {/*로스트아크, LoaTodo 공지사항*/}
                    <MainNotices />

                    {/*이번주 레이드 현황*/}
                    <MainWeekly />
                </div>
                <div className="home-content">
                    {/*레이드 별 현황*/}
                    <MainRaids />
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default HomeMain;