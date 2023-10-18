
import { Routes, Route } from 'react-router-dom';
import MissionCreation from '../pages/Association/Missions/MissionCreation';
import Profile from '../pages/Association/Profile/Profile';
import ModifyProfilePage from '../pages/Association/Profile/ModifyProfile';

function ConnectAssociationRouter() {
    return(
        <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/missionCreation" element={<MissionCreation />} />
            <Route path="/modifyProfile" element={<ModifyProfilePage />} />
            <Route path="*" element={<h1> Error 404 Asso </h1>} />
        </Routes>
    )
}

export default ConnectAssociationRouter;