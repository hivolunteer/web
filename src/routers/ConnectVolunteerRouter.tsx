import { Routes, Route } from 'react-router-dom';
import Profile from '../pages/Volunteer/Profile/Profile';
import Home from '../pages/Volunteer/Home/Home';
<<<<<<< HEAD
import Recherche from '../pages/Volunteer/Recherche/Recherche';
=======
import History from '../pages/Volunteer/History/History';
import FollowAssociation from '../pages/Volunteer/FollowAssociation/FollowAssociation';
>>>>>>> b9430b8e547a7e2ab7b39a8bb19de638dd934fb6

function ConnectVolunteerRouter() {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
<<<<<<< HEAD
            <Route path="/search" element={<Recherche />} />
=======
            <Route path='/history' element={<History/>} />
            <Route path='/follows' element={<FollowAssociation />} />
>>>>>>> b9430b8e547a7e2ab7b39a8bb19de638dd934fb6
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<h1> Error 404 Volunteer </h1>} />
        </Routes>
    )
}

export default ConnectVolunteerRouter;