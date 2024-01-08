import React from 'react';
import HomeBoardContainer from "../../containers/home/HomeBoardContainer";
import HomeNoticesContainer from "../../containers/home/HomeNoticesContainer";
import './Home.css';
import KaKaoAd from '../../fragments/KaKaoAd';

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
            <div className="comments">
                <KaKaoAd
                    unit={"DAN-Mb4e1tojdnfrWcvK"}
                    width={320}
                    height={100}
                />
            </div>
        </>
    );
};

export default HomeMain;