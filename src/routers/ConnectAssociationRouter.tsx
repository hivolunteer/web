
import { Routes, Route } from 'react-router-dom';
import MissionCreation from '../pages/Association/Missions/MissionCreation';
import Profile from '../pages/Association/Profile/Profile';
import ModifyProfilePage from '../pages/Association/Profile/ModifyProfile';
import Home from '../pages/Association/Home/Home';
import ManageMission from '../pages/Association/Missions/Manage/ManageMission';
import MissionModification from '../pages/Association/Missions/Manage/MissionModification';
import Search from '../pages/Association/Search/Search'
import EventCalendar from "../components/Calendar/EventCalendar";
import ReferentPage from '../pages/Association/Referent/ReferentPage';
import ExternalProfile from '../pages/Association/ExternalProfile/ExternalProfile';
import Settings from '../pages/Association/Settings/Settings';
import ProfileInformationModal from '../pages/Association/Settings/ProfileInformation';
import AffiliatedCompanies from '../pages/Association/AffiliatedCompanies/AffiliatedCompanies';
import ModifyLocationModal from '../pages/Association/Missions/Modal/ModifyLocationModal';
import ModifyPassword from '../pages/Association/Settings/ModifyPassword';
import FAQ from '../pages/Association/FAQ/Faq';
import ContactUs from '../pages/Contact Us/Contact';

function ConnectAssociationRouter() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/volunteer/:id" element={<ExternalProfile />} />
            <Route path="/missionCreation" element={<MissionCreation />} />
            <Route path="/modifyAddress" element={<ModifyLocationModal/>} />
            <Route path="/modifyProfile" element={<ModifyProfilePage />} />
            <Route path="/mission/:id" element={<ManageMission />} />
            <Route path="/profile/volunteer/:id" element={<ExternalProfile />} />
            <Route path="/:id/edit" element={<MissionModification />} />
            <Route path="/accueil" element={<Search />} />
            <Route path="/calendrier" element={<EventCalendar />} />
            <Route path='/settings' element={<Settings />} />
            <Route path="/settings/profile_information" element={<ProfileInformationModal />} />
            <Route path="/settings/modify_password" element={<ModifyPassword />} />
            <Route path="/referent" element={<ReferentPage />} />
            <Route path="/affiliatedCompanies" element={<AffiliatedCompanies />} />
            <Route path="/faq" element={< FAQ />} />
            <Route path="/contact" element={< ContactUs />} />
            <Route path="manage/:id" element={<ManageMission />} />
            <Route path="*" element={<h1> Error 404 Asso </h1>} />
        </Routes>
    )
}

export default ConnectAssociationRouter;