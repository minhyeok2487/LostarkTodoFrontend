import React, {useState} from 'react';
import {call} from '../../service/api-service';
import '../../style/utils/SpeedDial.css';
import * as apis from "../../apis/member";

export default function SpeedDial({
                                      setIsLoading,
                                      setCharacters,
                                      showMessage,
                                      showCharacterSortForm,
                                      setShowCharacterSortForm,
                                      setModalTitle,
                                      setModalContent,
                                      setOpenModal,
                                      closeContentModal
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
                openDeleteUserCharactersForm();
                // 사용자에게 확인을 받기 위한 창을 표시합니다.

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
        {name: '캐릭터 순서 변경'},
        {name: '출력 내용 변경'},
        {name: '캐릭터 정보 업데이트'},
        {name: '등록 캐릭터 삭제'},
        {name: '중복 캐릭터 삭제'},
    ];

    const openDeleteUserCharactersForm = () => {
        setModalTitle("등록 캐릭터 삭제");
        var modalContent = (
            <div className="delete-user-characters-form">
                <p>정말로 등록된 캐릭터를 삭제하시겠습니까?</p>
                <ul>
                    <li>등록된 캐릭터, 숙제, 깐부 데이터가 삭제됩니다.</li>
                    <li>코멘트 데이터는 유지됩니다.</li>
                </ul>
                <button onClick={() => deleteUserCharacters(true)}>확인</button>
                <button onClick={() => deleteUserCharacters(false)}>취소</button>
            </div>
        );
        setModalContent(modalContent);
        setOpenModal(true);
    };

    const deleteUserCharacters = async (state) => {
        try {
            setIsLoading(true);
            if (state) {
                const response = await apis.deleteUserCharacters();
                if (response.success) {
                    // 성공적으로 삭제되었을 경우 알림을 표시하고 메인 페이지로 이동합니다.
                    alert(response.message);
                    window.location.href = "/";
                }
            }
        } catch (error) {
            showMessage(error.errorMessage);
        } finally {
            closeContentModal();
            setIsLoading(false);
        }
    }

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
