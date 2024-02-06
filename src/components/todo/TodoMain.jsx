import React, {useEffect, useState} from 'react';
import '../../style/Todo.css'
import SpeedDial from "../utils/SpeedDial";
import * as todo from "../../apis/todo";
import TodoProfit from "./TodoProfit";
import CharacterSortFormV2 from "./CharacterSortFormV2";
import TodoServerAndChallengeContainer from "../../containers/todo/TodoServerAndChallengeContainer";
import TodoContentWrapContainer from "../../containers/todo/TodoContentWrapContainer";
import ModalBox from "../utils/ModalBox";
import {calculateItemsPerRow} from "../utils/ResponsiveWeb";
import SignUpCharacters from "../auth/SignUpCharacters";

// 숙제 관리 화면 메인
const TodoMain = ({setIsLoading, showMessage}) => {
    // character state 설정
    const [isCharacterList, setIsCharacterList] = useState(true);
    const [allCharacters, setAllCharacters] = useState([]); //전체 캐릭터 리스트
    const [characters, setCharacters] = useState([]); //출력할 캐릭터 리스트
    const [servers, setServers] = useState([]); //서버 리스트
    const [selectedServer, setSelectedServer] = useState(null); // 선택된 서버
    const [showCharacterSortForm, setShowCharacterSortForm] = useState(false);

    // 캐릭터 데이터
    const getCharacters = async () => {
        try {
            setIsLoading(true);
            let data = await todo.list();
            data = data['characterDtoMap'];
            setAllCharacters(data);

            // setServers { serverKey: count }
            const serverInfoObject = Object.keys(data).reduce((acc, serverKey) => {
                acc[serverKey] = data[serverKey].length;
                return acc;
            }, {});
            setServers(serverInfoObject);

            // setCharacters default maxCount
            const maxKey = Object.keys(serverInfoObject).reduce((prevKey, currentKey) => {
                return serverInfoObject[currentKey] > serverInfoObject[prevKey] ? currentKey : prevKey;
            }, Object.keys(serverInfoObject)[0]);

            setSelectedServer(maxKey);
            setCharacters(data[maxKey]);
        } catch (error) {
            if (error.errorMessage === "등록된 캐릭터가 없습니다.") {
                showMessage(error.errorMessage);
                setIsCharacterList(false);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // 페이지 로드시 호출
    useEffect(() => {
        // 캐릭터 데이터 호출
        getCharacters();

        function handleResize() {
            setItemsPerRow(calculateItemsPerRow());
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // 반응형 화면 state 설정
    const [itemsPerRow, setItemsPerRow] = useState(calculateItemsPerRow());

    // 모달 열기/닫기 상태 관리 state 설정
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    // 모달 닫기 함수
    const closeContentModal = () => {
        setOpenModal(false);
        setModalTitle("");
        setModalContent("");
    };

    return (
        <>
            {isCharacterList ? (
                <div>
                    {/*오른쪽 Dial 버튼*/}
                    <SpeedDial
                        setIsLoading={setIsLoading}
                        setCharacters={setCharacters}
                        showMessage={showMessage}
                        showCharacterSortForm={showCharacterSortForm}
                        setShowCharacterSortForm={setShowCharacterSortForm}
                    />

                    {/*메인 화면*/}
                    <div className="wrap">
                        {/*일일 수익, 주간수익*/}
                        <TodoProfit characters={characters} />

                        {/*캐릭터 정렬(활성시만 보임)*/}
                        {showCharacterSortForm && <CharacterSortFormV2
                            setIsLoading={setIsLoading}
                            characters={characters}
                            setCharacters={setCharacters}
                            showMessage={showMessage}
                            itemsPerRow={itemsPerRow}
                            setShowCharacterSortForm={setShowCharacterSortForm}
                        />}

                        {/*도비스/도가토 버튼*/}
                        <TodoServerAndChallengeContainer
                            allCharacters={allCharacters}
                            setIsLoading={setIsLoading}
                            servers={servers}
                            selectedServer={selectedServer}
                            setSelectedServer={setSelectedServer}
                            characters={characters}
                            setCharacters={setCharacters}
                        />

                        {/*일일/주간 숙제*/}
                        <TodoContentWrapContainer
                            setIsLoading={setIsLoading}
                            characters={characters}
                            setCharacters={setCharacters}
                            showMessage={showMessage}
                            setModalTitle={setModalTitle}
                            setModalContent={setModalContent}
                            setOpenModal={setOpenModal}
                        />

                        {/*모달창*/}
                        <ModalBox
                            openModal={openModal}
                            closeContentModal={closeContentModal}
                            modalTitle={modalTitle}
                            modalContent={modalContent}
                        />
                    </div >
                </div>
            ) : (
                <SignUpCharacters setIsLoading={setIsLoading}/>
            )}
        </>
    );

};

export default TodoMain;