import * as React from 'react';
import './Navbar.css'
import * as auth from '../apis/auth';
import { useState } from "react";
import NotificationComponent from '../components/notification/NotificationComponent';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../utils/Logo";
import {Link} from "react-router-dom";

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
                    <li><Link to="/todo">숙제</Link></li>
                    <li><Link to="/friends">깐부</Link></li>
                    <li><Link to="/comments">방명록</Link></li>
                </ul>

                <div className="menus">
                    {loginName !== null && <NotificationComponent showMessage={showMessage} />}
                    <input className="theme-input" type="checkbox" id="darkmode-toggle" onChange={darkOnOff} />
                    <label className="theme-label" htmlFor="darkmode-toggle"></label>
                    <div className="buttons">
                        <div style={{ marginLeft: 10 }}>
                            {loginName === null ? (
                                <Link to="/login" className="action_btn">Login</Link>
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
                    <li><Link to="/member/apikey">API Key 변경</Link></li>
                    <li>
                        <div onClick={() => logout()}>로그아웃</div>
                    </li>
                </div>}
            </div>

            <div className="dropdown_menu">
                <li><Link to="/todo">숙제</Link></li>
                <li><Link to="/friends">깐부</Link></li>
                <li><Link to="/comments">방명록</Link></li>
                <li>
                    {loginName === null ? (
                        <Link to="/login" className="action_btn">Login</Link>
                    ) : (
                        <div className="login_box">
                            <div className="login_name">{loginName}</div>
                            <Link to="/member/apikey">API Key 변경</Link>
                            <div onClick={() => logout()} className="logout_btn">로그아웃</div>
                        </div>
                    )}
                </li>
            </div>
        </header>
    );
}