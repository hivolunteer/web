import { Routes, Route } from 'react-router-dom';
import RegisterCompany from '../pages/Authentication/RegisterCompany/Register';
import LoginCompany from '../pages/Authentication/LoginCompany/Login';
import ResetPassword from '../pages/Authentication/ResetPassword/ResetPassword';

function CompanyRouter() {
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
            <Route path="/login" element={<LoginCompany />} />
            <Route path="/register" element={<RegisterCompany />} />
            <Route path="/update_password" element={<ResetPassword />} />
        </Routes>
        </div>
    )
}

export default CompanyRouter;