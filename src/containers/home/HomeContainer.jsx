import React, {useEffect, useState} from 'react';
import HomeMain from "../../components/home/HomeMain";

const HomeContainer = ({
                           setIsLoading,
                           showMessage
                       }) => {

    return (
        <HomeMain
            setIsLoading={setIsLoading}
            showMessage={showMessage}
        />
    );
};

export default HomeContainer;