import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';

// import Pages
import Home from './pages/Home/Home';
import RegisterVolunteer from './pages/Authentication/RegisterVolunteer/Register';
import RegisterAssociation from './pages/Authentication/RegisterAssociation/Register';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterVolunteer />} />
        <Route path="/register/volunteer" element={<RegisterVolunteer />} />
        <Route path="/register/association" element={<RegisterAssociation />} />
      </Routes>
    </Router>
  );
}

export default App;
