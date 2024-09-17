
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Company/Home/Home';
import AffiliatedAssociations from '../pages/Company/AffiliatedAssociations/AffiliatedAssociations';
import Settings from '../pages/Company/Settings/Settings';

function ConnectCompanyRouter() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/affiliatedAssociations" element={<AffiliatedAssociations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<h1> Error 404 Asso </h1>} />
        </Routes>
    )
}

export default ConnectCompanyRouter;