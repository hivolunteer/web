import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/Volunteer/Profile/Profile';
import Home from '../pages/Volunteer/Home/Home';
import History from '../pages/Volunteer/History/History';
import FollowAssociation from '../pages/Volunteer/FollowAssociation/FollowAssociation';
import MissionDetails from '../pages/Volunteer/MissionDetails/MissionDetails';

function ConnectVolunteerRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/history' element={<History />} />
            <Route path='/follows' element={<FollowAssociation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mission/:missionID" element={<MissionDetails />} />
            <Route path="*" element={<h1> Error 404 Volunteer </h1>} />
        </Routes>
    )
}

export default ConnectVolunteerRouter;