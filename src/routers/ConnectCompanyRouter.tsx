
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Company/Home/Home';
import Settings from '../pages/Company/Settings/Settings';
import ChangePassword from '../pages/Company/Settings/ModifyPassword';

function ConnectCompanyRouter() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<h1> Error 404 Asso </h1>} />
            <Route path='/settings' element={<Settings />} />
            <Route path="/settings/modify_password" element={<ChangePassword />} />

        </Routes>
    )
}

export default ConnectCompanyRouter;