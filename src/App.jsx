import React, {useEffect, useState} from 'react';
import './App.css';
import Navbar from './fragments/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import SocialLogin from './components/auth/SocialLogin';
import Setting from './components/Setting';
import ApiKeyUpdateForm from './components/member/ApiKeyUpdateForm';
import FriendWrap from './components/friends/FriendsWrap';
import CommentListContainer from './containers/comments/CommentListContainer';
import CircularLoading from './fragments/CircularLoading';
import TodoContainer from './containers/todo/TodoContainer';
import Notification from './fragments/Notification';
import SignUp from "./components/auth/SignUp";
import SignUpCharacters from "./components/auth/SignUpCharacters";
import Footer from "./utils/Footer";
import HomeMain from "./components/home/HomeMain";
import BoardMain from "./components/boards/BoardMain";
import Board from "./components/boards/Board";
import BoardInsert from "./components/boards/BoardInsert";

const App = () => {
  //Notification 관련
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Darkmode 관련
  const [isDarkMode, setIsDarkMode] = useState(false);

  //로그인 여부 관련
  const [loginName, setLoginName] = useState("");

  useEffect(() => {
    setLoginName(window.localStorage.getItem("username"));
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const showMessage = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div>
        {isLoading && <CircularLoading />}
        <Notification
          message={snackbarMessage}
          open={openSnackbar}
          handleClose={handleSnackbarClose}
        />
        <BrowserRouter>
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}
                  setIsLoading={setIsLoading} showMessage={showMessage} />
          <Routes>
            <Route path="" element={<HomeMain setIsLoading={setIsLoading} showMessage={showMessage} />} />
            <Route path="login" element={<Login isDarkMode={isDarkMode} showMessage={showMessage} setLoginName={setLoginName} loginName={loginName} />} />
            <Route path='signup' element={<SignUp setIsLoading={setIsLoading}/>} />
            <Route path='signup/character' element={<SignUpCharacters setIsLoading={setIsLoading} />} />
            <Route path='sociallogin' element={<SocialLogin />} />
            {loginName ?
                <Route path="todo" element={<TodoContainer setIsLoading={setIsLoading} showMessage={showMessage}/>} /> :
                <Route path="todo" element={<Login message="로그인 후 LoaTodo 숙제관리 기능을 이용해보세요!!"
                                                    isDarkMode={isDarkMode} showMessage={showMessage}
                                                   setLoginName={setLoginName} loginName={loginName} />} />
            }
            {loginName ?
                <Route path='friends' element={<FriendWrap setIsLoading={setIsLoading}/>} />:
                <Route path="friends" element={<Login message="로그인 후 LoaTodo 깐부 기능을 이용해보세요!!"
                                                   isDarkMode={isDarkMode} showMessage={showMessage}
                                                   setLoginName={setLoginName} loginName={loginName} />} />
            }

            <Route path='comments' element={<CommentListContainer setIsLoading={setIsLoading} />} />
            <Route path='setting' element={<Setting />} />
            <Route path='member/apikey' element={<ApiKeyUpdateForm />} />

            {/* 게시글(공지사항) 관련 */}
            <Route path='/boards' element={<BoardMain setIsLoading={setIsLoading} />} />
            <Route path='/boards/:no' element={<Board />} />
            <Route path='/boards/insert' element={<BoardInsert />} />
          </Routes>
        </BrowserRouter>
        {/* 구글 애드센스 */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9665234618246720"
                crossOrigin="anonymous"></script>
        <ins className="adsbygoogle"
             style={{display:"block"}}
             data-ad-client="ca-pub-9665234618246720"
             data-ad-slot="1480898783"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script> */}
        <Footer />
      </div>
    </>
  );
};

export default App;
