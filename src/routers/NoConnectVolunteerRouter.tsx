import { Routes, Route } from 'react-router-dom';
import RegisterVolunteer from '../pages/Authentication/RegisterVolunteer/Register';
import LoginVolunteer from '../pages/Authentication/LoginVolunteer/Login';
import ResetPassword from '../pages/Authentication/ResetPassword/ResetPassword';

function VolunteerRouter() {
    return(
        <div
        style={{
        display: 'flex',
        justifyContent: 'center',
        height: '90%',
        backgroundColor: '#DFDFDF',
        alignItems: 'center',
        margin: '5%'
      }}
      >
        <Routes>
            <Route path="/login" element={<LoginVolunteer />} />
            <Route path="/register" element={<RegisterVolunteer />} />
            <Route path="/update_password" element={<ResetPassword />} />
        </Routes>
        </div>
    )
}

export default VolunteerRouter;