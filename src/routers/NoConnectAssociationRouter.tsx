import { Routes, Route } from 'react-router-dom';
import RegisterAssociation from '../pages/Authentication/RegisterAssociation/Register';
import LoginAssociation from '../pages/Authentication/LoginAssociation/Login';
import ResetPassword from '../pages/Authentication/ResetPassword/ResetPassword';

function AssociationRouter() {
    return(
        <Routes>
            <Route path="/login" element={<LoginAssociation />} />
            <Route path="/register" element={<RegisterAssociation />} />
            <Route path="/update_password" element={<ResetPassword />} />
        </Routes>
    )
}

export default AssociationRouter;