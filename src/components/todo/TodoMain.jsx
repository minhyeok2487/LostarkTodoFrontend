import React, {useState} from 'react';
import TodoProfitsContainer from '../../containers/todo/TodoProfitsContainer';
import TodoContentWrapContainer from '../../containers/todo/TodoContentWrapContainer';
import TodoServerAndChallengeContainer from '../../containers/todo/TodoServerAndChallengeContainer';
import TodoModal from './TodoModal';
import CharacterSortFormV2 from "./CharacterSortFormV2";

const TodoMain = ({
    setIsLoading,
    showMessage,
    allCharacters,
    characters,
    setCharacters,
    servers,
    setServers,
    selectedServer,
    setSelectedServer,
    showCharacterSortForm,
    setShowCharacterSortForm,
    itemsPerRow,
    openModal,
    setOpenModal,
    modalContent,
    setModalContent,
    modalTitle,
    setModalTitle,
    closeContentModal,
}) => {

    return (
        <div className="wrap">
            {/*일일 수익, 주간수익*/}
            <TodoProfitsContainer characters={characters} />

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
            <TodoModal
                openModal={openModal}
                closeContentModal={closeContentModal}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />

        </div >
    );
};

export default TodoMain;