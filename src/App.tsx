import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Pages
import Home from './pages/Home/Home';
import RegisterVolunteer from './pages/Authentication/RegisterVolunteer/Register';
import RegisterAssociation from './pages/Authentication/RegisterAssociation/Register';
import LoginVolunteer from './pages/Authentication/LoginVolunteer/Login';
import LoginAssociation from './pages/Authentication/LoginAssociation/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterVolunteer />} />
        <Route path="/register/volunteer" element={<RegisterVolunteer />} />
        <Route path="/register/association" element={<RegisterAssociation />} />
        <Route path="/login" element={<LoginVolunteer />} />
        <Route path="/login/volunteer" element={<LoginVolunteer />} />
        <Route path="/login/association" element={<LoginAssociation />} />
      </Routes>
    </Router>
  );
}

export default App;
