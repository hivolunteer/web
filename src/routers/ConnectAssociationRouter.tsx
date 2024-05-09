
import { Routes, Route } from 'react-router-dom';
import MissionCreation from '../pages/Association/Missions/MissionCreation';
import Profile from '../pages/Association/Profile/Profile';
import ModifyProfilePage from '../pages/Association/Profile/ModifyProfile';
import Home from '../pages/Association/Home/Home';
import ManageMission from '../pages/Association/Missions/Manage/ManageMission';
import Accueil from '../pages/Association/Accueil/Accueil';
import EventCalendar from "../components/Calendar/EventCalendar";
import ReferentPage from '../pages/Association/Referent/ReferentPage';

function ConnectAssociationRouter() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/missionCreation" element={<MissionCreation />} />
            <Route path="/modifyProfile" element={<ModifyProfilePage />} />
            <Route path="/manage/:id" element={<ManageMission />} />
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/calendrier" element={<EventCalendar />} />
            <Route path="/settings/referents" element={<ReferentPage />} />
            <Route path="*" element={<h1> Error 404 Asso </h1>} />
        </Routes>
    )
}

export default ConnectAssociationRouter;