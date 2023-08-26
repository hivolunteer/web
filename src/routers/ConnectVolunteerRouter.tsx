import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile/Profile';

function ConnectVolunteerRouter() {
    return(
        <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<h1> Error 404 Volunteer </h1>} />
        </Routes>
    )
}

export default ConnectVolunteerRouter;