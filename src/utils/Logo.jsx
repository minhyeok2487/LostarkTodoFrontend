import React from 'react';

// 로고 출력 컴포넌트
const Logo = ({isDarkMode}) => {
    return (
        <div className="logo"
             style={{cursor:"pointer"}}
             onClick={()=>window.location.href="/"}>
            {isDarkMode ? (
                <img alt="logo" src='/logo_white.png'/>
            ) : (
                <img alt="logo" src='/logo.png'/>
            )}
        </div>
    );
};

export default Logo;