import React from 'react';
import DiscordIcon from '../../icons/DiscordIcon';

const HomeText = () => {
    return (
        <div className="comments">
            <div className="noticeBox box01">
                <p className="notice">주요 공지사항</p>
                <div className="cont">
                    <ul>
                        <li>개발자 : <DiscordIcon /> 마볼링#2884 <a href="https://open.kakao.com/o/snL05upf" target='_blank'>오픈카톡</a></li>
                        <li>UI담당자 : <DiscordIcon /> 얀비#7431</li>
                    </ul>
                </div>
                <div className="cont">
                    <p>사용해주시고 많은 의견주셔서 너무 감사합니다. 최대한 빠르게 업데이트 하도록 해보겠습니다.</p>
                    <ul>
                        <li>서버에 접속이 안되는 경우, 보통 업데이트 중이므로 1~2분 후 접속이 가능합니다.</li>
                        <li>슬라임/메데이아의 경우 서버별로 다르고, 길드가 직접 운영하기 때문에 추가가 어려울 것 같습니다.</li>
                    </ul>
                </div>
                <div className="cont">
                    <p style={{ fontWeight: "bold" }}>개발자에게 커피 한잔</p>
                    <ul>
                        <li>보내주신 소중한 후원금은 서버 유지 및 발전 비용으로 사용됩니다.</li>
                        <li>카카오뱅크 3333-08-6962739</li>
                        <li>예금주 : 이민혁</li>
                    </ul>
                </div>
            </div>
            {/*<div className="noticeBox box02">*/}
            {/*    <p className="update">개발 예정</p>*/}
            {/*    <div className="cont">*/}
            {/*        <ul>*/}
            {/*            <li>카게, 모험섬, 필보, 로웬 주간퀘 등 - 페이지를 따로 분리할 예정입니다.</li>*/}
            {/*            <li>기록남기기 - 숙제로 얻은 수익을 기록하여 그래프 혹은 표로 표시</li>*/}
            {/*            <li>데이터보기 - 일일숙제, 큐브로 얻는 재화량 통계와 현재 경매장 시세를 확인, 귀속 재료도 수익확인</li>*/}
            {/*            <li>캐릭터 info - 로아와, 클로아, 일로아와 유사한 기능</li>*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default HomeText;