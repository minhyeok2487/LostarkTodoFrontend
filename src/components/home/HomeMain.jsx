import React from 'react';
import HomeBoardContainer from "../../containers/home/HomeBoardContainer";
import HomeText from "./HomeText";

const HomeMain = ({
                      setIsLoading,
                      showMessage
                  }) => {
    return (
        <div>
            <HomeText />
            {/*임시 틀. 왼쪽 로스트아크 공지사항, 오른쪽 사이트 공지사항 예정 */}
            <div className="" style={{display:"flex", flexDirection:"row"}}>
                <HomeBoardContainer
                    setIsLoading={setIsLoading}
                    showMessage={showMessage}
                />
                <HomeBoardContainer
                    setIsLoading={setIsLoading}
                    showMessage={showMessage}
                />
            </div>

        </div>
    );
};

export default HomeMain;