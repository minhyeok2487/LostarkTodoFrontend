import React, { useEffect, useCallback } from 'react';
import '../../style/utils/Modal.css';

const ModalBox = ({
                      openModal,
                      closeContentModal,
                      modalTitle,
                      modalContent
                  }) => {
    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 27 && openModal) { // ESC key
            closeContentModal();
        }
    }, [openModal, closeContentModal]);

    useEffect(() => {
        const dialog = document.querySelector("dialog");

        const handleExternalClick = (event) => {
            const target = event.target;
            const rect = target.getBoundingClientRect();
            if (rect.left > event.clientX || rect.right < event.clientX ||
                rect.top > event.clientY || rect.bottom < event.clientY) {
                closeContentModal();
            }
        };

        if (openModal) {
            dialog.showModal();
            dialog.addEventListener("click", handleExternalClick);
            document.addEventListener("keydown", handleKeyDown);
        } else {
            dialog.close();
            dialog.removeEventListener("click", handleExternalClick);
            document.removeEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openModal, closeContentModal, handleKeyDown]);

    return (
        <dialog className="miniModal">
            <div className="modal-title" id="modal-title">
                {modalTitle}
            </div>
            <pre>
                {modalContent}
            </pre>
        </dialog>
    );
};

export default ModalBox;
