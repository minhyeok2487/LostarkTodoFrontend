import React from 'react';
import BasicSpeedDial from "../../fragments/BasicSpeedDial";
import TodoMain from "./TodoMain";

const TodoWrap = ({
                      setIsLoading,
                      setCharacters,
                      showMessage,
                      setShowCharacterSortForm,
                      allCharacters,
                      characters,
                      servers,
                      setServers,
                      selectedServer,
                      setSelectedServer,
                      showCharacterSortForm,
                      itemsPerRow,
                      openModal,
                      setOpenModal,
                      modalContent,
                      setModalContent,
                      modalTitle,
                      setModalTitle,
                      closeContentModal
                  }) => {
    return (
        <div>
            {/*오른쪽 Dial 버튼*/}
            <BasicSpeedDial
                setIsLoading={setIsLoading}
                setCharacters={setCharacters}
                showMessage={showMessage}
                setShowCharacterSortForm={setShowCharacterSortForm}
            />

            {/*메인 화면*/}
            <TodoMain
                allCharacters={allCharacters}
                characters={characters}
                setCharacters={setCharacters}
                servers={servers}
                setServers={setServers}
                selectedServer={selectedServer}
                setSelectedServer={setSelectedServer}
                showCharacterSortForm={showCharacterSortForm}
                setShowCharacterSortForm={setShowCharacterSortForm}
                itemsPerRow={itemsPerRow}
                setIsLoading={setIsLoading}
                showMessage={showMessage}
                openModal={openModal}
                setOpenModal={setOpenModal}
                modalContent={modalContent}
                setModalContent={setModalContent}
                modalTitle={modalTitle}
                setModalTitle={setModalTitle}
                closeContentModal={closeContentModal}
            />
        </div>
    );
};

export default TodoWrap;