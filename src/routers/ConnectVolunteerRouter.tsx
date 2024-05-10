import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Volunteer/Profile/Profile";
import Home from "../pages/Volunteer/Home/Home";
import Search from "../pages/Volunteer/Search/Search";
import History from "../pages/Volunteer/History/History";
import FollowAssociation from "../pages/Volunteer/FollowAssociation/FollowAssociation";
import MissionDetails from "../pages/Volunteer/MissionDetails/MissionDetails";
import Settings from "../pages/Volunteer/Settings/Settings";
import BlockedUsersList from "../components/BlockedUsersList";
import ChangePassword from "../pages/Volunteer/Settings/ModifyPassword";

import MissionCreation from "../pages/Volunteer/Missions/MissionCreation";

import AssociationReferent from "../pages/Volunteer/Settings/Referents/AssociationReferent";
import AssociationProfile from "../pages/Volunteer/Association/Profile/AssociationProfile";
import ManageMission from "../pages/Volunteer/ManageMission/ManageMission";
import ProfileInformationModal from "../pages/Volunteer/Settings/ProfileInformation";

function ConnectVolunteerRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/follows" element={<FollowAssociation />} />
            <Route path="/profile" element={<Profile />} />
      <Route path="/profile/blocked" element={<BlockedUsersList />} />
            <Route path="/accueil" element={<Search />} />
            <Route path="/association/:associationID" element={<AssociationProfile />} />
            <Route path="/mission/:missionID" element={<MissionDetails />} />
            <Route path="/missionCreation" element={<MissionCreation/>} />
            <Route path={"/settings"} element={<Settings />} />
            <Route path="/settings/modify_password" element={<ChangePassword />} />
            <Route path="/settings/referents" element={<AssociationReferent />} />
      <Route path="/manage/:id" element={<ManageMission />} />
            <Route path="/settings/profile_information" element={<ProfileInformationModal />} />
            <Route path="*" element={<h1> Error 404 Volunteer </h1>} />
        </Routes>
    );
}

export default ConnectVolunteerRouter;