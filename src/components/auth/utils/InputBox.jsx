import React, {useEffect} from 'react';

// input box
const InputBox = ({className, type, id, placeholder, value, setValue, onKeyPress, message }) => {
    // 메시지 입력시 박스 => border:red, 하단 메시지 출력
    // 기본 클래스명 : "input-box"
    className = "input-box " + className;

    useEffect(() => {
        const messageBox = document.getElementById(id);
        if (message !== "") {
            messageBox.style.borderColor = messageBox ? "red" : "";
        } else {
            messageBox.style.borderColor = messageBox ? "" : "";
        }
    }, [id, message]);

    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            onKeyPress();
        }
    };

    return (
        <div className={className}>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={handleOnKeyPress}
                required
            />
            {message && <span className="input-warn-message">{message}</span>}
        </div>
    );
};

export default InputBox;