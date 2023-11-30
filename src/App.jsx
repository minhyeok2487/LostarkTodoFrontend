import React from 'react';
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
import AdsCard from './fragments/AdsCard';

const App = () => {
  return (
    <>
      <div>
        <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="" element={<TodoWrap />} />
            <Route path="login" element={<Login />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='sociallogin' element={<SocialLogin />} />
            <Route path='info' element={<Info />} />
            <Route path='comments' element={<Comments />} />
            <Route path='setting' element={<Setting />} />
            <Route path='member/apikey' element={<ApiKeyUpdateForm />} />
            <Route path='friends' element={<FriendWrap />} />
          </Routes>
        </BrowserRouter>
        <AdsCard />
      </div>
    </>
  );
};

export default App;
