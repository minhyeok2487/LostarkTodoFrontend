import React from 'react';
import HomeBoardContainer from "../../containers/home/HomeBoardContainer";
import HomeNoticesContainer from "../../containers/home/HomeNoticesContainer";
import './Home.css';

const HomeMain = ({
                      setIsLoading,
                      showMessage
                  }) => {
    return (
        <>
            <h4>현재 서버가 터져서 복구중입니다 불편을 드려 죄송합니다</h4>
            <img src="./123.jpg" style={{display:"flex", maxWidth:"70%", height:"auto", margin:"0 auto"}}/>
            <div className="comments home">
                <HomeNoticesContainer
                    setIsLoading={setIsLoading}
                    showMessage={showMessage}
                />
                <HomeBoardContainer
                    setIsLoading={setIsLoading}
                    showMessage={showMessage}
                />
            </div>
        </>
    );
};

export default HomeMain;