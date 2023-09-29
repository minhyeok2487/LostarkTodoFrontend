import React, { useState, useEffect } from "react";
import './Setting.css';
import { call } from "../service/api-service";
import LinearIndeterminate from '../fragments/LinearIndeterminate';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Setting() {

    const [settings, setSettings] = useState([]); //캐릭터 설정값
    useEffect(() => {
        call("/member/settings", "GET", null)
            .then((response) => {
                setSettings(response);
            })
            .catch((error) => {
                alert(error.errorMessage);
            });
    }, []);

    const handleChange = (event, characterName, settingName) => {
        setShowLinearProgress(true);
        const updateContent = {
            characterName: characterName,
            value: event.target.value,
            name: settingName
        };
        call("/character/settings", "PATCH", updateContent)
            .then((response) => {
                setShowLinearProgress(false);
                var point = document.getElementById(`${characterName}_${settingName}`);
                point.style.backgroundColor = event.target.value ? '#FA5858' : "#81BEF7";
            })
            .catch((error) => {
                alert(error.errorMessage);
            });
    };

    const selectSetting = (characterName, setting, settingName) => (
        <FormControl size="small">
            <Select
                id={`${characterName}_${settingName}`}
                onChange={(event) => handleChange(event, characterName, settingName)}
                defaultValue={setting ? "true" : "false"}
                sx={{bgcolor: setting ? '#FA5858' : "#81BEF7", color:"white", fontWeight:"bold"}}
            >
                <MenuItem value={true} >true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
            </Select>
        </FormControl>
    );
    const [showLinearProgress, setShowLinearProgress] = useState(false);
    return (
        <>
            {showLinearProgress && <LinearIndeterminate />}
            <TableContainer className="setting-table-wrap">
                <span>(임시디자인 입니다)</span>
                <Table aria-label="simple table" className="setting-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">서버</TableCell>
                            <TableCell align="right">캐릭터 이름</TableCell>
                            <TableCell align="right">클래스</TableCell>
                            <TableCell align="right">아이템레벨</TableCell>
                            <TableCell align="center">캐릭터 출력</TableCell>
                            <TableCell align="center">출석&에포나</TableCell>
                            <TableCell align="center">카오스던전</TableCell>
                            <TableCell align="center">가디언토벌</TableCell>
                            <TableCell align="center">주간숙제 관리</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {settings.map((setting) => (
                            <TableRow
                                key={setting.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {setting.id}
                                </TableCell>
                                <TableCell align="right">{setting.serverName}</TableCell>
                                <TableCell align="right">{setting.characterName}</TableCell>
                                <TableCell align="right">{setting.characterClassName}</TableCell>
                                <TableCell align="right">{setting.itemLevel}</TableCell>
                                <TableCell align="center">{selectSetting(setting.characterName, setting.showCharacter, "showCharacter")}</TableCell>
                                <TableCell align="center">{selectSetting(setting.characterName, setting.showEpona, "showEpona")}</TableCell>
                                <TableCell align="center">{selectSetting(setting.characterName, setting.showChaos, "showChaos")}</TableCell>
                                <TableCell align="center">{selectSetting(setting.characterName, setting.showGuardian, "showGuardian")}</TableCell>
                                <TableCell align="center">{selectSetting(setting.characterName, setting.showWeekTodo, "showWeekTodo")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}