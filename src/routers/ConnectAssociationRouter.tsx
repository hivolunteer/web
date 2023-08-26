
import { Routes, Route } from 'react-router-dom';
import MissionCreation from '../pages/Association/MissionCreation';

function ConnectAssociationRouter() {
    return(
        <Routes>
            <Route path="/missionCreation" element={<MissionCreation />} />
            <Route path="*" element={<h1> Error 404 Asso </h1>} />
        </Routes>
    )
}

export default ConnectAssociationRouter;