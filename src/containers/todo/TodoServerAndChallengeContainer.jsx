import React, { useState } from 'react';
import TodoServerAndChallenge from '../../components/todo/TodoServerAndChallenge';
import * as todo from '../../apis/todo';
import {MenuItem} from "@mui/material";

const TodoServerAndChallengeContainer = ({
    setIsLoading,
    allCharacters,
    servers,
    selectedServer,
    setSelectedServer,
    characters,
    setCharacters
}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleServerSelect = async (serverName) => {
        setIsLoading(true);
        setCharacters(allCharacters[serverName]); 
        setSelectedServer(serverName);       
        handleClose();
        setIsLoading(false);
    };
    const serverItems = Object.entries(servers).map(([serverName, count]) => (
        <MenuItem key={serverName} value={serverName}
            onClick={() => handleServerSelect(serverName)}>
            {serverName}: {count}개
        </MenuItem>
    ));


    // 도전 어비스/가디언 체크(v2 업데이트 완료)
    const updateChallenge = async (character, content) => {
        try {
            setIsLoading(true);
            const response = await todo.updateChallenge(character, content);
            setCharacters(response);
        } catch (error) {
            console.error('Error updating updateChallenge:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <TodoServerAndChallenge
            characters={characters}
            open={open}
            handleClick={handleClick}
            selectedServer={selectedServer}
            serverItems={serverItems}
            servers={servers}
            anchorEl={anchorEl}
            handleClose={handleClose}
            updateChallenge={updateChallenge}
        />
    );
};

export default TodoServerAndChallengeContainer;