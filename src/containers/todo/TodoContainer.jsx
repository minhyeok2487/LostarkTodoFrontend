import React, {useState, useEffect} from 'react';
import * as todo from '../../apis/todo';
import TodoWrap from "../../components/todo/TodoWrap";
import SignUpCharacters from "../../components/auth/SignUpCharacters";

// 숙제 관리 사이트 메인
const TodoContainer = ({setIsLoading, showMessage}) => {

    // state 설정
    const [isCharacterList, setIsCharacterList] = useState(true);
    const [allCharacters, setAllCharacters] = useState([]); //전체 캐릭터 리스트
    const [characters, setCharacters] = useState([]); //출력할 캐릭터 리스트
    const [servers, setServers] = useState([]); //서버 리스트
    const [selectedServer, setSelectedServer] = useState(null);
    const [showCharacterSortForm, setShowCharacterSortForm] = useState(false);

    // state 설정 - 모달 열기/닫기 상태 관리
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    // 모달 닫기 함수
    const closeContentModal = () => {
        setOpenModal(false);
        setModalTitle("");
        setModalContent("");
    };

    // 캐릭터 데이터
    const getCharacters = async () => {
        try {
            setIsLoading(true);
            const data = await todo.list();
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


    // 반응형 사이트 함수
    const [itemsPerRow, setItemsPerRow] = useState(calculateItemsPerRow());
    // 페이지 로드시 호출
    useEffect(() => {
        // 캐릭터 데이터 호출
        getCharacters();

        // 반응형 사이트
        function handleResize() {
            setItemsPerRow(calculateItemsPerRow());
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isCharacterList]);


    function calculateItemsPerRow() {
        var screenWidth = window.innerWidth;
        if (screenWidth >= 1300) {
            screenWidth = 1300;
        }
        const width = 250;
        const row = 2;
        if (screenWidth > width * row) {
            return Math.ceil(screenWidth / width);
        } else {
            return row;
        }
    }

    return (
        <>
            {isCharacterList ? (
                <TodoWrap
                    setIsLoading={setIsLoading}
                    setCharacters={setCharacters}
                    showMessage={showMessage}
                    setShowCharacterSortForm={setShowCharacterSortForm}
                    allCharacters={allCharacters}
                    characters={characters}
                    servers={servers}
                    setServers={setServers}
                    selectedServer={selectedServer}
                    setSelectedServer={setSelectedServer}
                    showCharacterSortForm={showCharacterSortForm}
                    itemsPerRow={itemsPerRow}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    modalContent={modalContent}
                    setModalContent={setModalContent}
                    modalTitle={modalTitle}
                    setModalTitle={setModalTitle}
                    closeContentModal={closeContentModal}
                />
            ) :
                <SignUpCharacters/>
            }
        </>
    );


};

export default TodoContainer;