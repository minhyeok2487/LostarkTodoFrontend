import * as React from 'react';
import './Navbar.css'
import * as auth from '../apis/auth';
import { useState } from "react";
import NotificationComponent from '../components/notification/NotificationComponent';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../utils/Logo";

export default function Navbar({isDarkMode, setIsDarkMode, setIsLoading, showMessage}) {
    const [isOpen, setIsOpen] = useState(false);
    const [usernameOpen, setUsernameOpen] = useState(false);
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

    }, [setIsDarkMode]);

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
            const response = await auth.logout();
            if (response.success) {
                localStorage.removeItem("ACCESS_TOKEN");
                localStorage.removeItem("username");
                window.location.href = "/";
            }
        } catch (error) {
            console.error('Error Logout', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <header>
            <div className="navbar">
                <Logo isDarkMode={isDarkMode} />
                <ul className="links">
                    <li><a href="/todo">숙제</a></li>
                    <li><a href="/friends">깐부</a></li>
                    <li><a href="/comments">방명록</a></li>
                </ul>

                <div className="menus">
                    {loginName !== null && <NotificationComponent showMessage={showMessage} />}
                    <input className="theme-input" type="checkbox" id="darkmode-toggle" onChange={darkOnOff} />
                    <label className="theme-label" htmlFor="darkmode-toggle"></label>
                    <div className="buttons">
                        <div style={{ marginLeft: 10 }}>
                            {loginName === null ? (
                                <a href="/login" className="action_btn">Login</a>
                            ) : (
                                <div onClick={() => handlerDropdownUser()} className="login_name">{loginName}</div>
                            )}
                        </div>
                    </div>
                    <div className="toggle_btn">
                        <div className="icon" onClick={() => toggleClickEvent()}>
                            {isOpen ? <CloseIcon sx={{ fontSize: 30 }} /> : <MenuIcon sx={{ fontSize: 30 }} />}
                        </div>
                    </div>
                </div>
            </div>

            <div className="user_info_wrap">
                {usernameOpen && <div className="user_info">
                    <li><a href="/member/apikey">API Key 변경</a></li>
                    <li>
                        <div onClick={() => logout()}>로그아웃</div>
                    </li>
                </div>}
            </div>

            <div className="dropdown_menu">
                <li><a href="/todo" >숙제</a></li>
                <li><a href="/friends" >깐부</a></li>
                <li><a href="/comments" >방명록</a></li>
                <li>
                    {loginName === null ? (
                        <a href="/login" className="action_btn">Login</a>
                    ) : (
                        <div className="login_box">
                            <div className="login_name">{loginName}</div>
                            <a href="/member/apikey">API Key 변경</a>
                            <div onClick={() => logout()} className="logout_btn">로그아웃</div>
                        </div>
                    )}
                </li>
            </div>
        </header>

    );
}