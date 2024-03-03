import React from 'react';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import NoticesWrap from "./NoticesWrap";
import Skeleton from "@mui/material/Skeleton";

const MainNotices = ({notices, boards, isLoading}) => {
    const [noticeGroup, setNoticeGroup] = React.useState('로아투두');
    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            setNoticeGroup(newValue);
        }
    };

    return (
        <div className="main-notices">
            <div className="main-notices-header">
                <h2>소식</h2>
                <ToggleButtonGroup
                color={"primary"}
                value={noticeGroup}
                exclusive
                onChange={handleChange}
                >
                    <ToggleButton value="로아투두">로아투두</ToggleButton>
                    <ToggleButton value="로스트아크">로스트아크</ToggleButton>
                </ToggleButtonGroup>
            </div>
            {isLoading ? <Skeleton variant="rounded" width="100%" height="90%" sx={{marginTop:3}} /> :
                <>
                    <div className="notice-board-container">
                        {noticeGroup === "로스트아크" &&
                            <NoticesWrap dataList={notices} type={"Lostark"} />
                        }
                        {noticeGroup === "로아투두" &&
                            <NoticesWrap dataList={boards} type={"LoaTodo"} />
                        }
                    </div>
                </>}
        </div>
    );
};

export default MainNotices;