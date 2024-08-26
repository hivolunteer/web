
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Company/Home/Home';
import Settings from '../pages/Company/Settings/Settings';
import ProfileInformationModal from '../pages/Company/Settings/ProfileInformation';

function ConnectCompanyRouter() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/profile_information" element={<ProfileInformationModal />} />
            <Route path="*" element={<h1> Error 404 Asso </h1>} />
        </Routes>
    )
}

export default ConnectCompanyRouter;