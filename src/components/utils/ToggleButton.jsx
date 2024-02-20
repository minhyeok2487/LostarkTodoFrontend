import React from 'react';
import "../../style/utils/ToggleButton.css"
const ToggleButton = ({
    message
}) => {
    return (
        <div className="toggle-btn">
            <input type="checkbox" id="toggle" hidden />
            <label htmlFor="toggle" className="toggleSwitch">
                <span className="toggleButton"></span>
            </label>
            <p>{message}</p>
        </div>
    );
};

export default ToggleButton;