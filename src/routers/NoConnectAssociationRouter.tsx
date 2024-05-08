import { Routes, Route } from 'react-router-dom';
import RegisterAssociation from '../pages/Authentication/RegisterAssociation/Register';
import LoginAssociation from '../pages/Authentication/LoginAssociation/Login';
import ResetPassword from '../pages/Authentication/ResetPassword/ResetPassword';

function AssociationRouter() {
    return(
        <div
        style={{
        display: 'flex',
        justifyContent: 'center',
        height: '90%',
        backgroundColor: '#DFDFDF',
        alignItems: 'center',
        margin: '5%'
      }}
      >
        <Routes>
            <Route path="/login" element={<LoginAssociation />} />
            <Route path="/register" element={<RegisterAssociation />} />
            <Route path="/update_password" element={<ResetPassword />} />
        </Routes>
        </div>
    )
}

export default AssociationRouter;