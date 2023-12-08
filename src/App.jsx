import React, { useState } from 'react';
import './App.css';
import Navbar from './fragments/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SocialLogin from './components/SocialLogin';
import SignUp from './components/SignUp';
import Info from './components/Info';
import Comments from './comments/Comments';
import Setting from './components/Setting';
import TodoWrap from './components/TodoWrap';
import ApiKeyUpdateForm from './components/member/ApiKeyUpdateForm';
import FriendWrap from './components/friends/FriendsWrap';
import BoardListContainer from './containers/board/BoardListContainer';
import BoardReadContainer from './containers/board/BoardReadContainer';
import BoardInsertContainer from './containers/board/BoardInsertContainer';
import BoardUpdateContainer from './containers/board/BoardUpdateContainer';
import CommentListContainer from './containers/comments/CommentListContainer';
import CircularLoading from './components/fragments/CircularLoading';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div>
        {isLoading && <CircularLoading />}
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodoWrap />} />
            <Route path="login" element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='sociallogin' element={<SocialLogin />} />
            <Route path='info' element={<Info />} />
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
