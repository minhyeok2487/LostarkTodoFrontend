import React from 'react';
import Navbar from './fragments/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from './components/Todo';
import Login from './components/Login';
import SocialLogin from './components/SocialLogin';
import SignUp from './components/SignUp';
import Info from './components/Info';
import Comments from './comments/Comments';

const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="login" element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='sociallogin' element={<SocialLogin />} />
          <Route path='info' element={<Info />} />
          <Route path='comments' element={<Comments />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
