import React from 'react';
import TodoProfitsContainer from '../../containers/todo/TodoProfitsContainer';
import TodoContentWrapContainer from '../../containers/todo/TodoContentWrapContainer';
import TodoServerAndChallengeContainer from '../../containers/todo/TodoServerAndChallengeContainer';
import TodoModal from './TodoModal';
import CharacterSortForm from './CharacterSortForm';

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
            <TodoProfitsContainer characters={characters} />
            {showCharacterSortForm && <CharacterSortForm
                setIsLoading={setIsLoading}
                characters={characters}
                setCharacters={setCharacters}
                showMessage={showMessage}
                itemsPerRow={itemsPerRow}
                setShowCharacterSortForm={setShowCharacterSortForm}
            />}
            <TodoServerAndChallengeContainer
                allCharacters={allCharacters}
                setIsLoading={setIsLoading}
                servers={servers}
                selectedServer={selectedServer}
                setSelectedServer={setSelectedServer}
                characters={characters}
                setCharacters={setCharacters}
            />
            <TodoContentWrapContainer
                setIsLoading={setIsLoading}
                characters={characters}
                setCharacters={setCharacters}
                showMessage={showMessage}
                setModalTitle={setModalTitle}
                setModalContent={setModalContent}
                setOpenModal={setOpenModal}
            />
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