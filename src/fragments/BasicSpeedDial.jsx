import React from 'react';
import { call } from "../service/api-service";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SettingsIcon from '@mui/icons-material/Settings';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import CachedIcon from '@mui/icons-material/Cached';

export default function BasicSpeedDial(props) {
    const icons = [
        { icon: <CachedIcon />, name: '캐릭터 순서 변경' },
        { icon: <SettingsIcon />, name: '출력 내용 변경' },
        { icon: <DownloadIcon />, name: '캐릭터 정보 업데이트' },
        { icon: <DeleteSweepIcon />, name: '중복 캐릭터 삭제' },
    ];


    const actions = async (name) => {
        if (name === "캐릭터 순서 변경") {
            props.setShowCharacterSortForm(true);
        }
        if (name === "출력 내용 변경") {
            window.location.href = "setting";
        }
        if (name === "캐릭터 정보 업데이트") {
            props.setShowLinearProgress(true);
            try {
                const response = await call("/member/characterList", "PATCH", null);
                props.setCharacters(response);
                props.setShowLinearProgress(false);
                props.showMessage("정보 업데이트가 완료되었습니다.");
            } catch (error) {
                props.setShowLinearProgress(false);
                props.showMessage(error.errorMessage);
            }
        }
        if (name === "중복 캐릭터 삭제") {
            props.setShowLinearProgress(true);
            try {
                const response = await call("/member/duplicate", "DELETE", null);
                props.setCharacters(response);
                props.setShowLinearProgress(false);
                props.showMessage("중복된 캐릭터를 삭제하였습니다.");
            } catch (error) {
                props.setShowLinearProgress(false);
                props.showMessage(error.errorMessage);
            };
        }

    }
    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', top: 100, right: 20 }}
            icon={<SpeedDialIcon />}
            direction={"down"}
        >
            {icons.map((icon) => (
                <SpeedDialAction
                    key={icon.name}
                    icon={icon.icon}
                    tooltipTitle={icon.name}
                    direction="Down"
                    onClick={() => actions(icon.name)}
                />
            ))}
        </SpeedDial>
    );
}