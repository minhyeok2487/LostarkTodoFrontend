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
            <img src="./christms.jpeg" style={{display:"flex", maxWidth:"50%", height:"auto", margin:"0 auto"}}/>
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