import { Routes, Route } from 'react-router-dom';
import RegisterVolunteer from '../pages/Authentication/RegisterVolunteer/Register';
import LoginVolunteer from '../pages/Authentication/LoginVolunteer/Login';

function VolunteerRouter() {
    return(
        <Routes>
            <Route path="/login" element={<LoginVolunteer />} />
            <Route path="/register" element={<RegisterVolunteer />} />
        </Routes>
    )
}

export default VolunteerRouter;