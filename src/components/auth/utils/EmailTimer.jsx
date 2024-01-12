import React, { useState, useEffect } from "react";

function EmailTimer({ startTimer }) {
    const [minutes, setMinutes] = useState(3);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let countdown;

        if (startTimer && (minutes > 0 || seconds > 0)) {
            countdown = setInterval(() => {
                if (parseInt(seconds) > 0) {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                } else {
                    if (parseInt(minutes) > 0) {
                        setMinutes((prevMinutes) => prevMinutes - 1);
                        setSeconds(59);
                    } else {
                        clearInterval(countdown);
                    }
                }
            }, 1000);
        }

        return () => clearInterval(countdown);
    }, [startTimer, minutes, seconds]);

    return (
        <>
            {startTimer && (
                <div>
                     인증번호가 전송되었습니다. {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>
            )}
        </>
    );
}

export default EmailTimer;
