import React from 'react';
import { call } from "../../service/api-service";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";

export default function FriendBasicSpeedDial(props) {
    const icons = [
        // { name: '캐릭터 순서 변경' },
        { name: '캐릭터 정보 업데이트' },
    ];


    const actions = async (name) => {
        // if (name === "캐릭터 순서 변경") {
        //     props.setShowCharacterSortForm(true);
        // }
        if (name === "캐릭터 정보 업데이트") {
            if(props.friendSetting.setting) {
                props.setShowLinearProgress(true);
                const updateContent = {
                    friendUsername : props.friendUsername
                };
                try {
                    const response = await call("/v2/friends/characterList", "PATCH", updateContent);
                    props.setCharacters(response);
                    props.setShowLinearProgress(false);
                    props.showMessage("정보 업데이트가 완료되었습니다.");
                } catch (error) {
                    props.setShowLinearProgress(false);
                    props.showMessage(error.errorMessage);
                }
            } else {
                props.showMessage("권한이 없습니다.");
            }
        }

    }
    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', top: 100, right: 20, alignItems:"end" }}
                icon={<SpeedDialIcon />}
                direction={"down"}
            >
                {icons.map((icon) => (
                    <SpeedDialAction
                        key={icon.name}
                        icon={icon.name}
                        sx={{
                            borderRadius:0,
                            display:"inline-block",
                            width:"100%",
                        }}
                        onClick={() => actions(icon.name)}
                    />
                ))}
            </SpeedDial>
        </>
    );
}