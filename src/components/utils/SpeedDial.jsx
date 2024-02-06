import React, { useState } from 'react';
import { call } from '../../service/api-service';
import '../../style/utils/SpeedDial.css';
import * as apis from '../../apis/member';

export default function SpeedDial({
   setIsLoading,
   setCharacters,
   showMessage,
   showCharacterSortForm,
   setShowCharacterSortForm,
}) {
    const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);

    const handleToggleSpeedDial = () => {
        setIsSpeedDialOpen(!isSpeedDialOpen);
    };

    const handleAction = async (name) => {
        setIsLoading(true);
        try {
            let response;
            if (name === '캐릭터 순서 변경') {
                setShowCharacterSortForm(!showCharacterSortForm);
            } else if (name === '출력 내용 변경') {
                window.location.href = 'setting';
            } else if (name === '캐릭터 정보 업데이트') {
                response = await call('/member/characterList', 'PATCH', null);
                setCharacters(response);
                showMessage('정보 업데이트가 완료되었습니다.');
            } else if (name === '등록 캐릭터 삭제') {
                response = await apis.deleteUserCharacters();
                if (response.success) {
                    alert(response.message);
                    window.location.href = "/";
                } else {
                    showMessage(response.message);
                }
            } else if (name === '중복 캐릭터 삭제') {
                response = await call('/member/duplicate', 'DELETE', null);
                setCharacters(response);
                showMessage('중복된 캐릭터를 삭제하였습니다.');
            }
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            showMessage(error.errorMessage);
        }
    };

    const menus = [
        { name: '캐릭터 순서 변경' },
        { name: '출력 내용 변경' },
        { name: '캐릭터 정보 업데이트' },
        { name: '등록 캐릭터 삭제' },
        { name: '중복 캐릭터 삭제' },
    ];

    return (
        <div className="speed-dial-menu">
            <button className="speed-dial-button" onClick={handleToggleSpeedDial}>
                {isSpeedDialOpen ? 'x' : '+'}
            </button>
            <ul className={`speed-dial-items ${isSpeedDialOpen ? 'active' : ''}`}>
                {menus.map((menu) => (
                    <li
                        key={menu.name}
                        className="speed-dial-item"
                        onClick={() => handleAction(menu.name)}
                    >
                        {menu.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
