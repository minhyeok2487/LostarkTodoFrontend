import React from "react";
import { call } from "../../../service/api-service";
import SearchIcon from '@mui/icons-material/Search';

const CubeWrap = ({
                      character,
                      addCubeTicket,
                      substractCubeTicket,
                      openCubeAverage,
                  }) => {
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
                        onClick={() => substractCubeTicket(character.id)}
                    >
                        -
                    </button>
                    <div
                        style={{ width: "90px", justifyContent: "center", alignItems: "center", display: "flex" }}
                    >
                        {character.cubeTicket} 장
                    </div>
                    <button
                        className ="plus"
                        style={{ cursor: "pointer" }}
                        onClick={() => addCubeTicket(character.id)}
                    >
                        +
                    </button>
                    <div
                        style={{ width: "100%", marginLeft: 5 }}
                    >
                        큐브 티켓
                    </div>
                    <SearchIcon onClick={() => openCubeAverage(character.itemLevel)} style={{ cursor: "pointer" }} />
                </div>
            </div>
        </div>
    );
};

export default CubeWrap;