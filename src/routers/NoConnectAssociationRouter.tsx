import { Routes, Route } from 'react-router-dom';
import RegisterAssociation from '../pages/Authentication/RegisterAssociation/Register';
import LoginAssociation from '../pages/Authentication/LoginAssociation/Login';

function AssociationRouter() {
    return(
        <Routes>
            <Route path="/login" element={<LoginAssociation />} />
            <Route path="/register" element={<RegisterAssociation />} />
        </Routes>
    )
}

export default AssociationRouter;