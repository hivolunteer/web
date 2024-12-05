
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Company/Home/Home';
import AffiliatedAssociations from '../pages/Company/AffiliatedAssociations/AffiliatedAssociations';
import Settings from '../pages/Company/Settings/Settings';
import ProfileInformationModal from '../pages/Company/Settings/ProfileInformation';
import Team from '../pages/Company/Team/Team';
import ModifyPassword from '../pages/Company/Settings/ModifyPassword';
import Missions from '../pages/Company/Missions/Missions';
import FAQ from '../pages/Company/FAQ/Faq';
import ContactUs from '../pages/Contact Us/Contact';

function ConnectCompanyRouter() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/accueil" element={<Home/>} />
            <Route path="/affiliatedAssociations" element={<AffiliatedAssociations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/profile_information" element={<ProfileInformationModal />} />
            <Route path="/teams" element={<Team />} />
            <Route path="/settings/modify_password" element={<ModifyPassword />} />
            <Route path={"/missions"} element={<Missions />} />
            <Route path="/faq" element={< FAQ />} />
            <Route path="/contact" element={< ContactUs />} />
            <Route path="*" element={<h1> Error 404 Company </h1>} />
        </Routes>
    )
}

export default ConnectCompanyRouter;