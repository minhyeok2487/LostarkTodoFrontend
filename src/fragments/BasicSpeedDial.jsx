import React from 'react';
import { call } from "../service/api-service";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";

export default function BasicSpeedDial({
    setIsLoading,
    setCharacters,
    showMessage,
    setShowCharacterSortForm,
}) {
    const icons = [
        { name: '캐릭터 순서 변경' },
        { name: '출력 내용 변경' },
        { name: '캐릭터 정보 업데이트' },
        { name: '중복 캐릭터 삭제' },
    ];


    const actions = async (name) => {
        if (name === "캐릭터 순서 변경") {
            setShowCharacterSortForm(true);
        }
        if (name === "출력 내용 변경") {
            window.location.href = "setting";
        }
        if (name === "캐릭터 정보 업데이트") {
            setIsLoading(true);
            try {
                const response = await call("/member/characterList", "PATCH", null);
                setCharacters(response);
                setIsLoading(false);
                showMessage("정보 업데이트가 완료되었습니다.");
            } catch (error) {
                setIsLoading(false);
                showMessage(error.errorMessage);
            }
        }
        if (name === "중복 캐릭터 삭제") {
            setIsLoading(true);
            try {
                const response = await call("/member/duplicate", "DELETE", null);
                setCharacters(response);
                setIsLoading(false);
                showMessage("중복된 캐릭터를 삭제하였습니다.");
            } catch (error) {
                setIsLoading(false);
                showMessage(error.errorMessage);
            };
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