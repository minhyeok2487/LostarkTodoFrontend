import React from 'react';
import * as todo from '../../apis/todo';
import TodoContentWrap from '../../components/todo/TodoContentWrap';

const TodoContentWrapContainer = ({
    setIsLoading,
    showMessage,
    characters,
    setCharacters,
    setModalTitle,
    setModalContent,
    setOpenModal
}) => {
    // 일일 숙제 체크/해제
    const updateDayContent = async (characterId, category) => {
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(
                characters.map(async (character) => {
                    if (character.id === characterId) {
                        try {
                            const updatedCharacter = await todo.updateDayContent(
                                character.id,
                                character.characterName,
                                category
                            );
                            return updatedCharacter;
                        } catch (error) {
                            showMessage(error.errorMessage);
                            return {
                                ...character,
                                [`${category}Check`]: 0,
                            };
                        }
                    }
                    return character;
                })
            );
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updating day content:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // 일일 숙제 전체 체크/해제
    const updateDayContentAll = async (e, characterId, category) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(
                characters.map(async (character) => {
                    if (character.id === characterId) {
                        try {
                            const updatedCharacter = await todo.updateDayContentAll(
                                character.id,
                                character.characterName,
                                category
                            );
                            return updatedCharacter;
                        } catch (error) {
                            showMessage(error.errorMessage);
                            return {
                                ...character,
                                [`${category}Check`]: 0,
                            };
                        }
                    }
                    return character;
                })
            );
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error updating day content:', error);
        } finally {
            setIsLoading(false);
        }
    };

    //캐릭터 휴식게이지 업데이트
    const updateDayContentGuage = async (e, characterId, gaugeType) => {
        e.preventDefault();
        const newGaugeValue = window.prompt(`휴식게이지 수정`);
        if (newGaugeValue !== null) {
            const parsedValue = parseInt(newGaugeValue);
            if (!isNaN(parsedValue)) {
                try {
                    setIsLoading(true);

                    const updatedCharacters = await Promise.all(
                        characters.map(async (character) => {
                            if (character.id === characterId) {
                                try {
                                    const updatedCharacter = {
                                        ...character,
                                        [`${gaugeType}Gauge`]: parsedValue,
                                    };
                                    const data = await todo.updateDayContentGuage(updatedCharacter.id,
                                        updatedCharacter.characterName, updatedCharacter.chaosGauge,
                                        updatedCharacter.guardianGauge, updatedCharacter.eponaGauge);
                                    updatedCharacter.chaosGold = data.chaosGold;
                                    updatedCharacter.guardianGold = data.guardianGold;
                                    return updatedCharacter;
                                } catch (error) {
                                    showMessage(error.errorMessage);
                                    return {
                                        ...character,
                                    };
                                }
                            }
                            return character;
                        })
                    );
                    setCharacters(updatedCharacters);
                } catch (error) {
                    console.error('Error updating day content:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        }
    };

    // 일일 컨텐츠 통계 모달 열기
    const openDayContentAvg = (character, category) => {
        setModalTitle("" + character.characterName + " " + category + " 평균 데이터");
        if (category === "카오스던전") {
            var modalContent = (
                <div className="chaosVisual">
                    <span className="tip">API 최근 경매장 가격으로 평균 값을 가져옵니다.</span>
                    <p>컨텐츠 <strong>{character.chaos.name}</strong></p>
                    <div className="flex">
                        <ul>
                            <strong>거래 가능 재화</strong>
                            <li>파괴석 <em>{character.chaos.destructionStone}개</em></li>
                            <li>수호석 <em>{character.chaos.guardianStone}개</em></li>
                            <li>1레벨보석 <em>{character.chaos.jewelry}개</em></li>
                        </ul>
                        <ul>
                            <strong>거래 불가 재화</strong>
                            <li>돌파석 <em>{character.chaos.leapStone}개</em></li>
                            <li>실링 <em>{character.chaos.shilling}개</em></li>
                            <li>파편 <em>{character.chaos.honorShard}개</em></li>
                        </ul>
                    </div>
                </div>
            );
        } else {
            modalContent = (
                <div className="chaosVisual">
                    <span className="tip">API 최근 경매장 가격으로 평균 값을 가져옵니다.</span>
                    <p>컨텐츠 <strong>{character.guardian.name}</strong></p>
                    <div className="flex one">
                        <ul>
                            <strong>거래 가능 재화</strong>
                            <li>파괴석 <em>{character.guardian.destructionStone}개</em></li>
                            <li>수호석 <em>{character.guardian.guardianStone}개</em></li>
                            <li>돌파석 <em>{character.guardian.leapStone}개</em></li>
                        </ul>
                    </div>
                </div>
            );
        }

        setModalContent(modalContent);
        setOpenModal(true);
    };


    return (
        <TodoContentWrap
            setIsLoading={setIsLoading}
            showMessage={showMessage}
            characters={characters}
            setCharacters={setCharacters}
            updateDayContent={updateDayContent}
            updateDayContentAll={updateDayContentAll}
            updateDayContentGuage={updateDayContentGuage}
            openDayContentAvg={openDayContentAvg}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            setOpenModal={setOpenModal}
        />
    );
};

export default TodoContentWrapContainer;