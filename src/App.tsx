import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import 'moment/locale/fr';

// import Pages
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import RegisterVolunteer from './pages/Authentication/RegisterVolunteer/Register';
import RegisterAssociation from './pages/Authentication/RegisterAssociation/Register';
import LoginVolunteer from './pages/Authentication/LoginVolunteer/Login';
import LoginAssociation from './pages/Authentication/LoginAssociation/Login';
import MissionCreation from "./pages/Association/MissionCreation";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="fr">
            <Router>
                <Sidebar/>
                <Routes>
                    <Route path="/" element={<MissionCreation/>}/>
                    <Route path="/volunteers/profile" element={<Profile/>}/>
                    <Route path="/register" element={<RegisterVolunteer/>}/>
                    <Route path="/register/volunteer" element={<RegisterVolunteer/>}/>
                    <Route path="/register/association" element={<RegisterAssociation/>}/>
                    <Route path="/login" element={<LoginVolunteer/>}/>
                    <Route path="/login/volunteer" element={<LoginVolunteer/>}/>
                    <Route path="/login/association" element={<LoginAssociation/>}/>
                    <Route path="*" element={<h1> Error 404 </h1>}/>
                </Routes>
            </Router>
        </LocalizationProvider>
    );
}

export default App;
