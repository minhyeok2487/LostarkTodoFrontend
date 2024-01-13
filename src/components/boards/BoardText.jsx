import React from 'react';
import DiscordIcon from '../../icons/DiscordIcon';

const BoardText = () => {
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
        </div>
    );
};

export default BoardText;