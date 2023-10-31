import React from "react";
import { call } from "../../service/api-service";
import SearchIcon from '@mui/icons-material/Search';

const CubeWrap = (props) => {
    const addCubeTicket = async (characterId) => {
        props.setShowLinearProgress(true);
        const updatedCharacters = props.characters.map((character) => {
            if (character.id === characterId) {
                var updatedCharacter = {
                    ...character
                };
                const updateContent = {
                    id: character.id,
                    characterName: character.characterName,
                };
                return call("/v2/character/week/cube/add", "PATCH", updateContent)
                    .then((response) => {
                        props.setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        props.setShowLinearProgress(false);
                        alert(error.errorMessage);
                        return updatedCharacter;
                    });
            }
            return character;
        });
        props.setCharacters(await Promise.all(updatedCharacters));
    };

    const substractCubeTicket = async (characterId) => {
        props.setShowLinearProgress(true);
        const updatedCharacters = props.characters.map((character) => {
            if (character.id === characterId) {
                var updatedCharacter = {
                    ...character
                };
                const updateContent = {
                    id: character.id,
                    characterName: character.characterName,
                };
                return call("/v2/character/week/cube/substract", "PATCH", updateContent)
                    .then((response) => {
                        props.setShowLinearProgress(false);
                        updatedCharacter = response;
                        return updatedCharacter;
                    })
                    .catch((error) => {
                        props.setShowLinearProgress(false);
                        alert(error.errorMessage);
                        return updatedCharacter;
                    });
            }
            return character;
        });
        props.setCharacters(await Promise.all(updatedCharacters));
    };

    const getCubeContent = async (itemLevel) => {
        props.setShowLinearProgress(true);
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
            props.setShowLinearProgress(false);
            return await call("/v2/character/cube/" + name, "GET", null);
        } catch (error) {
            props.setShowLinearProgress(false);
            alert(error.errorMessage);
        }
    };

    const openCubeAverage = async (itemLevel) => {
        props.setModalTitle("에브니 큐브 평균 데이터");
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
        props.setModalContent(modalContent);
        props.setOpenModal(true);

    };

    const previousCubeContent = async (name) => {
        props.setShowLinearProgress(true);
        const cubeContentList = ["1금제", "2금제", "3금제", "4금제", "5금제"];
        const currentIndex = cubeContentList.indexOf(name);
        const previousIndex = currentIndex === 0 ? cubeContentList.length - 1 : currentIndex - 1;
        const preName = cubeContentList[previousIndex];

        try {
            props.setShowLinearProgress(false);
            const cubeContent = await call("/v2/character/cube/" + preName, "GET", null);
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
            props.setModalContent(modalContent);
        } catch (error) {
            props.setShowLinearProgress(false);
            alert(error.errorMessage);
        }
    };

    const nextCubeContent = async (name) => {
        props.setShowLinearProgress(true);
        const cubeContentList = ["1금제", "2금제", "3금제", "4금제", "5금제"];

        const currentIndex = cubeContentList.indexOf(name);
        const nextIndex = currentIndex === cubeContentList.length - 1 ? 0 : currentIndex + 1;
        const nextName = cubeContentList[nextIndex];

        try {
            props.setShowLinearProgress(false);
            const cubeContent = await call("/v2/character/cube/" + nextName, "GET", null);
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
            props.setModalContent(modalContent);
        } catch (error) {
            props.setShowLinearProgress(false);
            alert(error.errorMessage);
        }
    };

    return (
        <div className="content-wrap">
            <div
                className="content"
                style={{
                    height: 35,
                    position: "relative",
                    justifyContent: "space-between",
                    fontSize: 14,
                }}
            >
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <button
                        className ="minus"
                        style={{ cursor: "pointer" }}
                        onClick={() => substractCubeTicket(props.character.id)}
                    >
                        -
                    </button>
                    <div
                        style={{ width: "90px", justifyContent: "center", alignItems: "center", display: "flex" }}
                    >
                        {props.character.cubeTicket} 장
                    </div>
                    <button
                        className ="plus"
                        style={{ cursor: "pointer" }}
                        onClick={() => addCubeTicket(props.character.id)}
                    >
                        +
                    </button>
                    <div
                        style={{ width: "100%", marginLeft: 10 }}
                    >
                        큐브 티켓
                    </div>
                    <SearchIcon onClick={() => openCubeAverage(props.character.itemLevel)} style={{ cursor: "pointer" }} />
                </div>
            </div>
        </div>
    );
};

export default CubeWrap;