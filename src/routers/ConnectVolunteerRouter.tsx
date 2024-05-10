import { Routes, Route } from "react-router-dom";
import Profile from "../pages/Volunteer/Profile/Profile";
import Home from "../pages/Volunteer/Home/Home";
import Search from "../pages/Volunteer/Search/Search";
import History from "../pages/Volunteer/History/History";
import FollowAssociation from "../pages/Volunteer/FollowAssociation/FollowAssociation";
import MissionDetails from "../pages/Volunteer/MissionDetails/MissionDetails";
import Settings from "../pages/Settings/Settings";

import MissionCreation from "../pages/Volunteer/Missions/MissionCreation";

import AssociationReferent from "../pages/Volunteer/Settings/Referents/AssociationReferent";
import AssociationProfile from "../pages/Volunteer/Association/Profile/AssociationProfile";


function ConnectVolunteerRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
      <Route path="/follows" element={<FollowAssociation />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/accueil" element={<Search />} />
      <Route path="/association/:associationID" element={<AssociationProfile />} />
      <Route path="/manage/:missionID" element={<MissionDetails />} />
      <Route path="/missionCreation" element={<MissionCreation/>} />
      <Route path={"/settings"} element={<Settings />} />
      <Route path="/settings/referents" element={<AssociationReferent />} />
      <Route path="*" element={<h1> Error 404 Volunteer </h1>} />
    </Routes>
  );
}

export default ConnectVolunteerRouter;
