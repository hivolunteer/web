import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/Volunteer/Profile/Profile';
import Home from '../pages/Volunteer/Home/Home';
import FollowAssociation from '../pages/Volunteer/FollowAssociation/FollowAssociation';

function ConnectVolunteerRouter() {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/follows' element={<FollowAssociation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<h1> Error 404 Volunteer </h1>} />
        </Routes>
    )
}

export default ConnectVolunteerRouter;