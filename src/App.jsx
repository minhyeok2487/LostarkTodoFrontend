import React, { useState } from 'react';
import './App.css';
import Navbar from './fragments/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SocialLogin from './components/SocialLogin';
import SignUp from './components/SignUp';
import Setting from './components/Setting';
import ApiKeyUpdateForm from './components/member/ApiKeyUpdateForm';
import FriendWrap from './components/friends/FriendsWrap';
import BoardListContainer from './containers/boards/BoardListContainer';
import BoardReadContainer from './containers/boards/BoardReadContainer';
import BoardInsertContainer from './containers/boards/BoardInsertContainer';
import BoardUpdateContainer from './containers/boards/BoardUpdateContainer';
import CommentListContainer from './containers/comments/CommentListContainer';
import CircularLoading from './fragments/CircularLoading';
import TodoContainer from './containers/todo/TodoContainer';
import Notification from './fragments/Notification';

const App = () => {
  //Notification 관련
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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
        <Navbar />
        < Notification
          message={snackbarMessage}
          open={openSnackbar}
          handleClose={handleSnackbarClose}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodoContainer setIsLoading={setIsLoading} showMessage={showMessage}/>} />
            <Route path="login" element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='sociallogin' element={<SocialLogin />} />
            <Route path='comments' element={<CommentListContainer setIsLoading={setIsLoading} />} />
            <Route path='setting' element={<Setting />} />
            <Route path='member/apikey' element={<ApiKeyUpdateForm />} />
            <Route path='friends' element={<FriendWrap />} />

            {/* 게시글(공지사항) 관련 */}
            <Route path='/boards' element={<BoardListContainer />} />
            <Route path='/boards/:no' element={<BoardReadContainer />} />
            <Route path='/boards/insert' element={<BoardInsertContainer />} />
            <Route path='/boards/update/:no' element={<BoardUpdateContainer />} />
          </Routes>
        </BrowserRouter>
        {/* 구글 애드센스 */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9665234618246720"
                crossOrigin="anonymous"></script>
        <ins className="adsbygoogle"
             style={{display:"block"}}
             data-ad-client="ca-pub-9665234618246720"
             data-ad-slot="1480898783"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        <footer>
          <p>© 2023 LoaTodo. LoaTodo isn’t endorsed by Smilegate RPG and doesn’t reflect the views <br />
            or opinions of Smilegate RPG or anyone officially involved in producing or managing Lostark.
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
