import React from 'react';
import WeekEponaWrap from "../../components/todo/weekContent/WeekEponaWrap";
import SilmaelChangeWrap from "../../components/todo/weekContent/SilmaelChangeWrap";
import CubeWrap from "../../components/todo/weekContent/CubeWrap";
import * as todoApi from "../../apis/todo";

const TodoWeekContentContainer = ({
                                      setIsLoading,
                                      showMessage,
                                      character,
                                      characters,
                                      setCharacters,
                                      setModalTitle,
                                      setModalContent,
                                      setOpenModal
                                  }) => {
    /*주간 에포나 체크*/
    const weekEponaCheck = async (characterId) => {
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.id === characterId) {
                    try {
                        character = await todoApi.weekEponaCheck(character.id, character.characterName);
                        return character;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error weekEponaCheck:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /*주간 에포나 체크 All*/
    const weekEponaCheckAll = async (e, characterId) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.id === characterId) {
                    try {
                        character = await todoApi.weekEponaCheckAll(character.id, character.characterName);
                        return character;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error weekEponaCheck:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /*실마엘 체크*/
    const silmaelChange = async (characterId) => {
        try {
            setIsLoading(true);
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.id === characterId) {
                    try {
                        character = await todoApi.silmaelChange(character.id, character.characterName);
                        return character;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error weekEponaCheck:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /*실마엘 체크(우클릭)*/
    const silmaelChangeAll = async (e, characterId) => {
        e.preventDefault();
        silmaelChange(characterId);
    };

    /*큐브 티켓 추가*/
    const addCubeTicket = async (characterId) => {
        try {
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.id === characterId) {
                    try {
                        character = await todoApi.addCubeTicket(character.id, character.characterName);
                        return character;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error addCubeTicket:', error);
        }
    };

    /*큐브 티켓 감소*/
    const substractCubeTicket = async (characterId) => {
        try {
            const updatedCharacters = await Promise.all(characters.map(async (character) => {
                if (character.id === characterId) {
                    try {
                        character = await todoApi.substractCubeTicket(character.id, character.characterName);
                        return character;
                    } catch (error) {
                        showMessage(error.errorMessage);
                        return {
                            ...character,
                        };
                    }
                }
                return character;
            }));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error substractCubeTicket:', error);
        }
    };

    /*큐브 티켓 데이터 호출*/
    const getCubeContent = async (itemLevel) => {
        var name;
        if (itemLevel < 1490.0) {
            name = "1금제";
        } else if (itemLevel >= 1490.0 && itemLevel < 1540.0) {
            name = "2금제";
        } else if (itemLevel >= 1540.0 && itemLevel < 1580.0) {
            name = "3금제";
        } else if (itemLevel >= 1580.0 && itemLevel < 1610.0) {
            name = "4금제";
        } else {
            name = "5금제";
        }
        try {
            setIsLoading(true);
            return await todoApi.getCubeContent(name);
        } catch (error) {
            console.error('Error getCubeContent:', error);
        } finally {
            setIsLoading(false);
        }
    };

    /*큐브 티켓 통계 모달 열기*/
    const openCubeAverage = async (itemLevel) => {
        setModalTitle("에브니 큐브 평균 데이터");
        const cubeContent = await getCubeContent(itemLevel);
        var modalContent = (
            <div className="chaosVisual">
                <p>
                    <button
                        className="prev"
                        style={{ cursor: "pointer", marginRight: 5 }}
                        onClick={() => previousCubeContent(cubeContent.name)}
                    >
                        ←
                    </button>
                    에브니 큐브 <strong>{cubeContent.name}</strong>
                    <button
                        className="next"
                        style={{ cursor: "pointer", marginLeft: 5 }}
                        onClick={() => nextCubeContent(cubeContent.name)}
                    >
                        →
                    </button>
                </p>
                <div className="flex" style={{ alignItems: "flex-start" }}>
                    <ul>
                        <strong>거래 가능 재화</strong>
                        <li>1레벨보석 <em>{cubeContent.jewelry}개</em></li>
                        <li>가격 <em>개당 {cubeContent.jewelryPrice} G</em></li>
                        <li>총 가격 <em>{cubeContent.jewelry * cubeContent.jewelryPrice} G</em></li>
                    </ul>
                    <ul>
                        <strong>거래 불가 재화</strong>
                        <li>돌파석 <em>{cubeContent.leapStone}개</em></li>
                        <li>실링 <em>{cubeContent.shilling}</em></li>
                        <li>은총 <em>{cubeContent.solarGrace}개</em></li>
                        <li>축복 <em>{cubeContent.solarBlessing}개</em></li>
                        <li>가호 <em>{cubeContent.solarProtection}개</em></li>
                        <li>카경 <em>{cubeContent.cardExp}</em></li>
                    </ul>
                </div>
            </div>
        );
        setModalContent(modalContent);
        setOpenModal(true);
    };

    /*큐브 티켓 통계 이전*/
    const previousCubeContent = async (name) => {
        const cubeContentList = ["1금제", "2금제", "3금제", "4금제", "5금제"];
        const currentIndex = cubeContentList.indexOf(name);
        const previousIndex = currentIndex === 0 ? cubeContentList.length - 1 : currentIndex - 1;
        const preName = cubeContentList[previousIndex];

        try {
            const cubeContent = await todoApi.getCubeContent(preName);
            var modalContent = (
                <div className="chaosVisual">
                    <p>
                        <button
                            className="prev"
                            style={{ cursor: "pointer", marginRight: 5 }}
                            onClick={() => previousCubeContent(cubeContent.name)}
                        >
                            ←
                        </button>
                        에브니 큐브 <strong>{cubeContent.name}</strong>
                        <button
                            className="next"
                            style={{ cursor: "pointer", marginLeft: 5 }}
                            onClick={() => nextCubeContent(cubeContent.name)}
                        >
                            →
                        </button>
                    </p>
                    <div className="flex" style={{ alignItems: "flex-start" }}>
                        <ul>
                            <strong>거래 가능 재화</strong>
                            <li>1레벨보석 <em>{cubeContent.jewelry}개</em></li>
                            <li>가격 <em>개당 {cubeContent.jewelryPrice} G</em></li>
                            <li>총 가격 <em>{cubeContent.jewelry * cubeContent.jewelryPrice} G</em></li>
                        </ul>
                        <ul>
                            <strong>거래 불가 재화</strong>
                            <li>돌파석 <em>{cubeContent.leapStone}개</em></li>
                            <li>실링 <em>{cubeContent.shilling}</em></li>
                            <li>은총 <em>{cubeContent.solarGrace}개</em></li>
                            <li>축복 <em>{cubeContent.solarBlessing}개</em></li>
                            <li>가호 <em>{cubeContent.solarProtection}개</em></li>
                            <li>카경 <em>{cubeContent.cardExp}</em></li>
                        </ul>
                    </div>
                </div>
            );
            setModalContent(modalContent);
        } catch (error) {
            console.log(error);
        }
    };

    /*큐브 티켓 통계 다음*/
    const nextCubeContent = async (name) => {
        const cubeContentList = ["1금제", "2금제", "3금제", "4금제", "5금제"];

        const currentIndex = cubeContentList.indexOf(name);
        const nextIndex = currentIndex === cubeContentList.length - 1 ? 0 : currentIndex + 1;
        const nextName = cubeContentList[nextIndex];

        try {
            const cubeContent = await todoApi.getCubeContent(nextName);
            var modalContent = (
                <div className="chaosVisual">
                    <p>
                        <button
                            className="prev"
                            style={{ cursor: "pointer", marginRight: 5 }}
                            onClick={() => previousCubeContent(cubeContent.name)}
                        >
                            ←
                        </button>
                        에브니 큐브 <strong>{cubeContent.name}</strong>
                        <button
                            className="next"
                            style={{ cursor: "pointer", marginLeft: 5 }}
                            onClick={() => nextCubeContent(cubeContent.name)}
                        >
                            →
                        </button>
                    </p>
                    <div className="flex" style={{ alignItems: "flex-start" }}>
                        <ul>
                            <strong>거래 가능 재화</strong>
                            <li>1레벨보석 <em>{cubeContent.jewelry}개</em></li>
                            <li>가격 <em>개당 {cubeContent.jewelryPrice} G</em></li>
                            <li>총 가격 <em>{cubeContent.jewelry * cubeContent.jewelryPrice} G</em></li>
                        </ul>
                        <ul>
                            <strong>거래 불가 재화</strong>
                            <li>돌파석 <em>{cubeContent.leapStone}개</em></li>
                            <li>실링 <em>{cubeContent.shilling}</em></li>
                            <li>은총 <em>{cubeContent.solarGrace}개</em></li>
                            <li>축복 <em>{cubeContent.solarBlessing}개</em></li>
                            <li>가호 <em>{cubeContent.solarProtection}개</em></li>
                            <li>카경 <em>{cubeContent.cardExp}</em></li>
                        </ul>
                    </div>
                </div>
            );
            setModalContent(modalContent);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='character-todo'>
            {character.settings.showWeekEpona && <WeekEponaWrap
                character={character}
                weekEponaCheck={weekEponaCheck}
                weekEponaCheckAll={weekEponaCheckAll}
            />}
            {character.settings.showSilmaelChange && <SilmaelChangeWrap
                character={character}
                silmaelChange={silmaelChange}
                silmaelChangeAll={silmaelChangeAll}
            />}
            {character.settings.showCubeTicket && <CubeWrap
                character={character}
                addCubeTicket={addCubeTicket}
                substractCubeTicket={substractCubeTicket}
                openCubeAverage={openCubeAverage}
            />}
        </div>
    );
};

export default TodoWeekContentContainer;