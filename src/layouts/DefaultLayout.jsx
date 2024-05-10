import React, { useState, useEffect } from "react";
import GoogleAdvertise from "../utils/GoogleAdvertise";

const DefaultLayout = ({ children }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isVerticalAdVisible = windowWidth >= 1280;

    return (
        <div className="wrap">
            <div className="wrap-container">
                {isVerticalAdVisible && (
                    <GoogleAdvertise
                        client="ca-pub-9665234618246720"
                        slot="9768920405"
                        format="auto"
                        responsive="true"
                        message="수직형 광고"
                    />
                )}
                <div className="wrap-main">
                    {children}
                </div>
                {isVerticalAdVisible && (
                    <GoogleAdvertise
                        client="ca-pub-9665234618246720"
                        slot="9768920405"
                        format="auto"
                        responsive="true"
                        message="수직형 광고"
                    />
                )}
            </div>
            <div className="wrap-container">
                <GoogleAdvertise
                    client="ca-pub-9665234618246720"
                    slot="2736107186"
                    format="autorelaxed"
                    responsive="true"
                    message="그리드 광고"
                />
            </div>
        </div>
    );
};

export default DefaultLayout;
