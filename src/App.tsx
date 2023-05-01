import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTypeChoice from "./pages/userTypeChoice/userTypeChoice";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeChoice />} />
      </Routes>
    </Router>
  );
}

export default App;