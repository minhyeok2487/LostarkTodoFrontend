import React from 'react';
import HomeBoardContainer from "../../containers/home/HomeBoardContainer";
import HomeNoticesContainer from "./HomeNotices";
import './Home.css';

const HomeMain = ({
    setIsLoading,
    showMessage
}) => {
    return (
        <>
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