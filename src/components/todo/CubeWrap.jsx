import React from 'react';
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

    const openCubeAverage = () => {
        props.setModalTitle("에브니 큐브 평균 데이터");
        var modalContent = (
            <div className="chaosVisual">
                <p>컨텐츠 <strong>1금제</strong></p>
                <div className="flex" style={{alignItems:"flex-start"}}>
                    <ul>
                        <strong>거래 가능 재화</strong>
                        <li>1레벨보석 <em>21개</em></li>
                        <li>가격 <em>개당 18 Gold</em></li>
                        <li>총 가격 <em>{21*18} Gold</em></li>
                    </ul>
                    <ul>
                        <strong>거래 불가 재화</strong>
                        <li>돌파석 <em>20개</em></li>
                        <li>실링 <em>79,859</em></li>
                        <li>은총 <em>6개</em></li>
                        <li>축복 <em>3개</em></li>
                        <li>가호 <em>1개</em></li>
                        <li>카경 <em>3000</em></li>
                    </ul>
                </div>
                <p>컨텐츠 <strong>2금제</strong></p>
                <div className="flex" style={{alignItems:"flex-start"}}>
                    <ul>
                        <strong>거래 가능 재화</strong>
                        <li>1레벨보석 <em>36개</em></li>
                        <li>가격 <em>개당 18 Gold</em></li>
                        <li>총 가격 <em>{36*18} Gold</em></li>
                    </ul>
                    <ul>
                        <strong>거래 불가 재화</strong>
                        <li>돌파석 <em>14개</em></li>
                        <li>실링 <em>100,142</em></li>
                        <li>은총 <em>8개</em></li>
                        <li>축복 <em>4개</em></li>
                        <li>가호 <em>2개</em></li>
                        <li>카경 <em>9000</em></li>
                    </ul>
                </div>
                <p>컨텐츠 <strong>3금제</strong></p>
                <div className="flex" style={{alignItems:"flex-start"}}>
                    <ul>
                        <strong>거래 가능 재화</strong>
                        <li>1레벨보석 <em>54개</em></li>
                        <li>가격 <em>개당 18 Gold</em></li>
                        <li>총 가격 <em>{54*18} Gold</em></li>
                    </ul>
                    <ul>
                        <strong>거래 불가 재화</strong>
                        <li>돌파석 <em>25개</em></li>
                        <li>실링 <em>110,370</em></li>
                        <li>은총 <em>11개</em></li>
                        <li>축복 <em>6개</em></li>
                        <li>가호 <em>2개</em></li>
                        <li>카경 <em>12000</em></li>
                    </ul>
                </div>
                <p>컨텐츠 <strong>4금제</strong></p>
                <div className="flex" style={{alignItems:"flex-start"}}>
                    <ul>
                        <strong>거래 가능 재화</strong>
                        <li>1레벨보석 <em>72개</em></li>
                        <li>가격 <em>개당 18 Gold</em></li>
                        <li>총 가격 <em>{72*18} Gold</em></li>
                    </ul>
                    <ul>
                        <strong>거래 불가 재화</strong>
                        <li>돌파석 <em>14개</em></li>
                        <li>실링 <em>120,518</em></li>
                        <li>은총 <em>12개</em></li>
                        <li>축복 <em>7개</em></li>
                        <li>가호 <em>3개</em></li>
                        <li>카경 <em>13000</em></li>
                    </ul>
                </div>
                <p>컨텐츠 <strong>5금제</strong></p>
                <div className="flex" style={{alignItems:"flex-start"}}>
                    <ul>
                        <strong>거래 가능 재화</strong>
                        <li>1레벨보석 <em>81개</em></li>
                        <li>가격 <em>개당 18 Gold</em></li>
                        <li>총 가격 <em>{81*18} Gold</em></li>
                    </ul>
                    <ul>
                        <strong>거래 불가 재화</strong>
                        <li>돌파석 <em>25개</em></li>
                        <li>실링 <em>129,802</em></li>
                        <li>은총 <em>13개</em></li>
                        <li>축복 <em>8개</em></li>
                        <li>가호 <em>4개</em></li>
                        <li>카경 <em>13500</em></li>
                    </ul>
                </div>
            </div>
        );
        props.setModalContent(modalContent);
        props.setOpenModal(true);
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
                        style={{ cursor: "pointer" }}
                        onClick={() => substractCubeTicket(props.character.id)}
                    >
                        -
                    </button>
                    <div
                        style={{ width: "90px",justifyContent:"center", alignItems:"center", display: "flex" }}
                    >
                        {props.character.cubeTicket} 장
                    </div>
                    <button
                        style={{ cursor: "pointer" }}
                        onClick={() => addCubeTicket(props.character.id)}
                    >
                        +
                    </button>
                    <div
                        style={{ width: "100%", marginLeft:10 }}
                    >
                        큐브티켓
                    </div>
                    <SearchIcon onClick={()=>openCubeAverage()} style={{ cursor: "pointer" }} />
                </div>
            </div>
        </div>
    );
};

export default CubeWrap;