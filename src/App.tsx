import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import UserTypeChoice from "./pages/userTypeChoice/userTypeChoice";
import Sidebar from './sidebar/Sidebar';

// import Pages
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import RegisterVolunteer from './pages/Authentication/RegisterVolunteer/Register';
import RegisterAssociation from './pages/Authentication/RegisterAssociation/Register';
import LoginVolunteer from './pages/Authentication/LoginVolunteer/Login';
import LoginAssociation from './pages/Authentication/LoginAssociation/Login';
import ResponsiveAppBar from './sidebar/Sidebar';
import { doesNotMatch } from 'assert';

function App() {
  return (
    <Router>
      <Routing />
    </Router>
  );
}

function Routing() {
  const location = useLocation();
  const shouldRenderAppBar = !location.pathname.includes('login') && !location.pathname.includes('register') && location.pathname !== '/';
  return (
    <>
      {shouldRenderAppBar && <ResponsiveAppBar />}
      <Routes>
        <Route path="/" element={<UserTypeChoice />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/volunteers/profile" element={<Profile />} />
        <Route path="/register" element={<RegisterVolunteer />} />
        <Route path="/register/volunteer" element={<RegisterVolunteer />} />
        <Route path="/register/association" element={<RegisterAssociation />} />
        <Route path="/login" element={<LoginVolunteer />} />
        <Route path="/login/volunteer" element={<LoginVolunteer />} />
        <Route path="/login/association" element={<LoginAssociation />} />
        <Route path="*" element={<h1> Error 404 </h1>} />
      </Routes>
    </>
  );
}

export default App;