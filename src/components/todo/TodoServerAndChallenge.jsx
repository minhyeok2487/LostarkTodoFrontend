import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import DoneIcon from '@mui/icons-material/Done';

const TodoServerAndChallenge = ({
    open,
    handleClick,
    selectedServer,
    servers,
    serverItems,
    anchorEl,
    handleClose,
    characters,
    updateChallenge
}) => {
    return (
        <div className="setting-wrap">
            <div>
                <Button
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    {selectedServer} {servers[selectedServer]}개
                </Button>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    {serverItems}
                </Menu>
            </div>
            <button
                className={`content-button ${characters.length > 0 && characters[0].challengeGuardian === true ? "done" : ""}`}
                onClick={() => updateChallenge(characters[0], "Guardian")} style={{ cursor: "pointer" }}
            >
                도전 가디언 토벌
                <div className="content-button-text" onClick={() => updateChallenge(characters[0], "Guardian")}>
                    {characters.length > 0 && (characters[0]?.challengeGuardian === true ? <DoneIcon /> : "")}
                </div>
            </button>
            <button
                className={`content-button ${characters.length > 0 && characters[0].challengeAbyss === true ? "done" : ""}`}
                onClick={() => updateChallenge(characters[0], "Abyss")} style={{ cursor: "pointer" }}
            >
                도전 어비스 던전
                <div className="content-button-text" onClick={() => updateChallenge(characters[0], "Abyss")}>
                    {characters.length > 0 && (characters[0]?.challengeAbyss === true ? <DoneIcon /> : "")}
                </div>
            </button>
        </div>
    );
};

export default TodoServerAndChallenge;