import React from 'react';
import './App.css';
import Navbar from './fragments/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoV1 from './components/TodoV1';
import Login from './components/Login';
import SocialLogin from './components/SocialLogin';
import SignUp from './components/SignUp';
import Info from './components/Info';
import Comments from './comments/Comments';
import Setting from './components/Setting';
import TodoV2 from './components/TodoV2';
import ApiKeyUpdateForm from './components/member/ApiKeyUpdateForm';
import GuideTodo from './guide/GuideTodo';

const App = () => {
  React.useEffect(() => {
    const bgMode = window.localStorage.getItem("bgMode");
    if (bgMode === "dark") {
      document.getElementsByTagName("html")[0].classList.add("ui-dark");
      document.getElementsByClassName("theme-input")[0].checked = true;
    }
  }, []);

  const darkOnOff = () => {
    if (
      document.getElementsByTagName("html")[0].classList.contains("ui-dark")
    ) {
      document.getElementsByTagName("html")[0].classList.remove("ui-dark");
      window.localStorage.setItem("bgMode", "light");
      document.getElementsByClassName("theme-input")[0].checked = false;
    } else {
      document.getElementsByTagName("html")[0].classList.add("ui-dark");
      window.localStorage.setItem("bgMode", "dark");
      document.getElementsByClassName("theme-input")[0].checked = true;
    }
  };
  return (
    <>
      <div>
        <Navbar />
        <input className="theme-input" type="checkbox" id="darkmode-toggle" onChange={darkOnOff} />
        <label className="theme-label" htmlFor="darkmode-toggle"></label>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<TodoV2 />} />
            <Route path="todo" element={<TodoV1 />} />
            <Route path="login" element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='sociallogin' element={<SocialLogin />} />
            <Route path='info' element={<Info />} />
            <Route path='comments' element={<Comments />} />
            <Route path='setting' element={<Setting />} />
            <Route path='member/apikey' element={<ApiKeyUpdateForm />} />
            <Route path='guide' element={<GuideTodo />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
