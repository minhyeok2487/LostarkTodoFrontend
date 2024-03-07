import React from 'react';
import Skeleton from "@mui/material/Skeleton";

const MainFriends = ({friendList, title, isLoading}) => {
    return (
        <div className="main-friends">
            <div className="header">
                <h2>{title}</h2>
            </div>
            {isLoading ? <Skeleton variant="rounded" width="100%" height="90%" sx={{marginTop:2}} /> :
                <>
                    {friendList.map((friend, index) => (
                        <div className="content">
                            <div className="main-friends-rank flag">{index+1}</div>
                            <div className="main-friends-text">
                                <span className="main-friends-name">{friend.characterName}</span>
                                <span className="main-friends-gold">{friend.gold.toFixed(0)} G</span>
                            </div>
                        </div>
                    ))}
                </>}
        </div>
    );
};

export default MainFriends;