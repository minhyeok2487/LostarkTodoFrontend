import React from 'react';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const TodoModal = ({
    openModal,
    closeContentModal,
    modalTitle,
    modalContent
}) => {
    return (
        <div>
            {/* 모달 */}
            <Modal
                open={openModal}
                onClose={closeContentModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div className="miniModal"
                    style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "#ffffff",
                        padding: "20px 30px 20px 20px", width: "auto", overflowY: "auto",
                        maxHeight: 450,
                    }}>
                    <Typography variant="h5" id="modal-title" style={{ color: "white", backgroundColor: "black", borderRadius: 7, textAlign: "center" }}>
                        {modalTitle}
                    </Typography>
                    <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", lineHeight: 2, fontWeight: "bold" }}>
                        {modalContent}
                    </pre>
                </div>
            </Modal>
        </div>
    );
};

export default TodoModal;