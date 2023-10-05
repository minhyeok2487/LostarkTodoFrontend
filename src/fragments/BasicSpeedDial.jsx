import React from 'react';
import { call } from "../service/api-service";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SettingsIcon from '@mui/icons-material/Settings';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export default function BasicSpeedDial(props) {
    const icons = [
        { icon: <SettingsIcon />, name: '출력 내용 변경' },
        { icon: <DownloadIcon />, name: '캐릭터 정보 업데이트' },
        { icon: <DeleteSweepIcon />, name: '중복 캐릭터 삭제' },
    ];

    const actions = (name) => {
        if (name === "출력 내용 변경") {
            window.location.href = "setting";
        }
        if (name === "캐릭터 정보 업데이트") {
            props.setShowLinearProgress(true);

            call("/member/characterList", "PATCH", null)
                .then((response) => {
                    props.setShowLinearProgress(false);
                    props.showMessage("정보 업데이트가 완료되었습니다.");
                    props.setCharacters(response);
                })
                .catch((error) => {
                    props.setShowLinearProgress(false);
                    alert(error.errorMessage);
                })
        }

        if (name === "중복 캐릭터 삭제") {
            props.setShowLinearProgress(true);

            call("/member/duplicate", "DELETE", null)
                .then((response) => {
                    props.setShowLinearProgress(false);
                    props.showMessage("중복된 캐릭터를 삭제하였습니다.");
                    props.setCharacters(response);
                })
                .catch((error) => {
                    props.setShowLinearProgress(false);
                    props.showMessage(error.errorMessage);
                })
        }
    }
    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'fixed', bottom: 30, right: 30 }}
            icon={<SpeedDialIcon />}
        >
            {icons.map((icon) => (
                <SpeedDialAction
                    key={icon.name}
                    icon={icon.icon}
                    tooltipTitle={icon.name}
                    onClick={() => actions(icon.name)}
                />
            ))}
        </SpeedDial>
    );
}