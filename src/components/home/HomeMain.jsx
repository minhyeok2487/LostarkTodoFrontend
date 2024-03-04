import React, {useEffect, useState} from 'react';
import '../../style/Home.css';
import * as homeApi from "../../apis/home";
import * as homeData from "./HomeData";
import MainCharacters from "./components/MainCharacters";
import MainProfit from "./components/MainProfit";
import MainNotices from "./components/MainNotices";
import MainRaids from "./components/MainRaids";
import MainWeekly from "./components/MainWeekly";
import Footer from "../../utils/Footer";
import * as noticesApi from "../../apis/notices";
import * as boardsApi from "../../apis/boards";
import MainFriends from "./components/MainFriends";

const HomeMain = ({showMessage, setIsLoading, isLoading}) => {
    const [characters, setChracters] = useState(homeData.charactersData);
    const [mainCharacter, setMainCharacter] = useState(homeData.charactersData[0]);
    const [notices, setNotices] = useState([]);
    const [boards, setBoards] = useState([]);
    const [homeRaid, setHomeRaid] = useState(homeData.RaidData);
    const [weekTotalGold, setWeekTotalGold] = useState(0);
    const [dayTotalGold, setDayTotalGold] = useState(0);
    const [friendsDayList, setFriendsDayList] = useState([]);
    const [friendsWeekList, setFriendsWeekList] = useState([]);
    const [friendsTotalList, setFriendsTotalList] = useState([]);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await homeApi.getHomeData();
            setChracters(data["characterDtoList"]);
            setMainCharacter(data["mainCharacter"]);
            setHomeRaid(data["homeRaidDtoList"]);
            setWeekTotalGold(data["weekTotalGold"]);
            setDayTotalGold(data["dayTotalGold"]);
            setFriendsDayList(data["friendsDayList"]);
            setFriendsWeekList(data["friendsWeekList"]);
            setFriendsTotalList(data["friendsTotalList"]);
        } catch (error) {
            showMessage("등록된 캐릭터가 존재하지 않아 임시 데이터가 보여집니다.");
            setChracters(homeData.charactersData);
            setMainCharacter(homeData.charactersData[0]);
            setHomeRaid(homeData.RaidData);
            setWeekTotalGold(6000.00);
            setDayTotalGold(4000.00);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getBoardList(1, 6);
        getNoticesList(1, 6);
        getData();

    }, []);

    // 로스트아크 공지사항  데이터
    const getNoticesList = async (page, size) => {
        try {
            const data = await noticesApi.list(page, size);
            setNotices(data.noticesList);
        } catch (error) {
            console.log(error);
        }
    }

    // 사이트 공지사항  데이터
    const getBoardList = async (page, size) => {
        try {
            const data = await boardsApi.list(page, size);
            setBoards(data.boardResponseDtoList);
        } catch (error) {
            console.log(error);
        }
    }

    return (
            <div className="wrap">
                <div className="home-wrap">
                    <div className="home-content">
                        {/*숙제 수익 요약*/}
                        <MainProfit characters={characters}
                                    weekTotalGold={weekTotalGold}
                                    dayTotalGold={dayTotalGold}
                                    isLoading={isLoading}
                        />

                        {/*대표 캐릭터*/}
                        <MainCharacters
                            characters={characters}
                            mainCharacter={mainCharacter}
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="home-content">
                        {/*레이드 별 현황*/}
                        {homeRaid !== null && <MainRaids homeRaid={homeRaid} isLoading={isLoading} />}
                    </div>
                    <div className="home-content">
                        {/*로스트아크, LoaTodo 공지사항*/}
                        <MainNotices notices={notices} boards={boards} isLoading={isLoading} />

                        {/*이번주 레이드 현황*/}
                        <MainWeekly isLoading={isLoading} />
                    </div>
                    <div className="home-content">
                        {/*깐부 일일 숙제 현황*/}
                        {friendsDayList !== null && <MainFriends friendList={friendsDayList} title={"깐부 주간 일일숙제 랭킹"} isLoading={isLoading}/>}
                        {friendsDayList !== null && <MainFriends friendList={friendsWeekList} title={"깐부 주간 레이드 랭킹"} isLoading={isLoading}/>}
                        {friendsDayList !== null && <MainFriends friendList={friendsTotalList} title={"깐부 주간 랭킹"} isLoading={isLoading}/>}
                    </div>
                </div>
                <Footer/>
            </div>
    );
};

export default HomeMain;