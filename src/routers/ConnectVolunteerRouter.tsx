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
import PublicProfile from "../pages/Volunteer/PublicProfiles/PublicProfile";

import MissionCreation from "../pages/Volunteer/Missions/MissionCreation";
import EditMission from "../pages/Volunteer/Missions/MissionModify";

import AssociationReferent from "../pages/Volunteer/Settings/Referents/AssociationReferent";
import AssociationProfile from "../pages/Volunteer/PublicProfiles/AssociationProfile";
import ManageMission from "../pages/Volunteer/ManageMission/ManageMission";
import ProfileInformationModal from "../pages/Volunteer/Settings/ProfileInformation";
import CloseMissionDescription from "../pages/Volunteer/CloseMissionDescription/CloseMissionDescription";
import ReferentHistory from "../pages/Volunteer/Referent/ReferentHistory";
import MyMission from "../pages/Volunteer/MyMissions/MyMissions";
import TeamRanking from "../pages/Volunteer/Employee/TeamRanking";
import EmployeeRanking from "../pages/Volunteer/Employee/EmployeeRanking";
import FAQ from "../pages/Volunteer/FAQ/Faq";
import FriendRequests from "../pages/Volunteer/Amis/FriendRequests";
import ContactUs from "../pages/Contact Us/Contact";

function ConnectVolunteerRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
      <Route path="/follows" element={<FollowAssociation />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/blocked" element={<BlockedUsersList />} />
      <Route path="/accueil" element={<Search />} />
      <Route path="/association/:associationId" element={<AssociationProfile />} />
      <Route path="/mission/:missionID" element={<MissionDetails />} />
      <Route path="/mission/close/:missionID" element={<CloseMissionDescription />} />
      <Route path="/mission/create" element={<MissionCreation />} />
      <Route path="/:missionID/edit" element={<EditMission />} />
      <Route path="/volunteer/:volunteerId" element={<PublicProfile />} />
      <Route path="/referent/missions" element={<ReferentHistory />} />
      <Route path={"/settings"} element={<Settings />} />
      <Route path="/settings/modify_password" element={<ChangePassword />} />
      <Route path="/settings/referents" element={<AssociationReferent />} />
      <Route path="/mission/:id" element={<ManageMission />} />
      <Route path="/settings/profile_information" element={<ProfileInformationModal />} />
      <Route path="/manage/:id" element={<ManageMission />} />
      <Route path="/employee/teamrank" element={<TeamRanking />} />
      <Route path="/employee/rank" element={<EmployeeRanking />} />
      <Route path="/myMissions" element={<MyMission />} />
      <Route path="/faq" element={< FAQ />} />
      <Route path="/friends" element={< FriendRequests />} />
      <Route path="/contact" element={< ContactUs />} />
      <Route path="*" element={<h1> Error 404 Volunteer </h1>} />
    </Routes>
  );
}

export default ConnectVolunteerRouter;