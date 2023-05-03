import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Pages
import Login from './Login/Login';
import Register from './Register/Register';
import Profile from './Profile/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1> Error 404 </h1>} />
      </Routes>
    </Router>
  );
}

export default App;
