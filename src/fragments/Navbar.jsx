import * as React from 'react';
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import * as auth from '../apis/auth';
import {useState} from "react";

export default function Navbar({setIsLoading}) {

    const [isOpen, setIsOpen] = useState(false);
    const [usernameOpen, setUsernameOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [loginName, setLoginName] = useState(null);

    React.useEffect(() => {
        const bgMode = window.localStorage.getItem("bgMode");
        if (bgMode === "dark") {
            document.getElementsByTagName("html")[0].classList.add("ui-dark");
            document.getElementsByClassName("theme-input")[0].checked = true;
            setIsDarkMode(true);
        }

        const username = window.localStorage.getItem("username");
        if (username !== null) {
            setLoginName(username);
        } else {
            setLoginName(null);
        }

    }, []);

    const darkOnOff = () => {
        if (
            document.getElementsByTagName("html")[0].classList.contains("ui-dark")
        ) {
            document.getElementsByTagName("html")[0].classList.remove("ui-dark");
            window.localStorage.setItem("bgMode", "light");
            document.getElementsByClassName("theme-input")[0].checked = false;
            setIsDarkMode(false);
        } else {
            document.getElementsByTagName("html")[0].classList.add("ui-dark");
            window.localStorage.setItem("bgMode", "dark");
            document.getElementsByClassName("theme-input")[0].checked = true;
            setIsDarkMode(true);
        }
    };

    const toggleClickEvent = () => {
        const dropDownMenu = document.querySelector('.dropdown_menu');
        dropDownMenu.classList.toggle('open')

        const isOpenNow = dropDownMenu.classList.contains('open');
        setIsOpen(isOpenNow);
    }

    const handlerDropdownUser = () => {
        setUsernameOpen(!usernameOpen);
    }

    const logout = async () => {
        try {
            setIsLoading(true);
            await auth.logout();
        } catch (error) {
            console.error('Error Logout', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <header>
            <div className="navbar">
                <div className="logo" onClick={() => (window.location.href = "/")}>
                    {isDarkMode ? (
                        <img alt="logo" src='/logo_white.png'/>
                    ) : (
                        <img alt="logo" src='/logo.png'/>
                    )}
                </div>
                <ul className="links">
                    <li><a href="/todo">숙제</a></li>
                    <li><a href="/friends">깐부</a></li>
                    <li><a href="/comments">방명록</a></li>
                </ul>
                <div className="buttons">
                    <div>
                        {loginName === null ? (
                            <a href="/login" className="action_btn">Login</a>
                        ) : (
                            <div onClick={() => handlerDropdownUser()} className="login_name">{loginName}</div>
                        )}
                    </div>
                    <input className="theme-input" type="checkbox" id="darkmode-toggle" onChange={darkOnOff}/>
                    <label className="theme-label" htmlFor="darkmode-toggle"></label>
                </div>
                <div className="toggle_btn">
                    <input className="theme-input" type="checkbox" id="darkmode-toggle" onChange={darkOnOff}/>
                    <label className="theme-label" htmlFor="darkmode-toggle"></label>
                    <div className="icon" onClick={() => toggleClickEvent()}>
                        {isOpen ? <CloseIcon sx={{fontSize: 30}}/> : <MenuIcon sx={{fontSize: 30}}/>}
                    </div>
                </div>
            </div>

            {usernameOpen && <div className="user_info">
                <li><a href="/member/apikey">API Key 변경</a></li>
                <li>
                    <div onClick={()=>logout()}>로그아웃</div>
                </li>
            </div>}

            <div className="dropdown_menu">
                <li><a href="/todo">숙제</a></li>
                <li><a href="/friends">깐부</a></li>
                <li><a href="/comments">방명록</a></li>
                <li>
                    {loginName === null ? (
                        <a href="/login" className="action_btn">Login</a>
                    ) : (
                        <div className="login_box">
                            <div className="login_name">{loginName}</div>
                            <a href="/member/apikey">API Key 변경</a>
                            <div onClick={()=>logout()} className="logout_btn">로그아웃</div>
                        </div>
                    )}
                </li>
            </div>
        </header>
    );
}