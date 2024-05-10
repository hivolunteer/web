import React, { useState, useEffect } from 'react';
import './Home.scss';
import HomeConcept from './HomeConcept';
import HomeUsers from './HomeUsers';
import HomeTeam from './HomeTeam';
import HomeEvolution from './HomeEvolution';
import HomeContact from './HomeContact';
import VolunteerSidebar from '../../../sidebar/VolunteerSidebar';
import AssociationSidebar from '../../../sidebar/AssociationSidebar';
function Home() {
    return (
        <div>
                  {localStorage.getItem("role") === "volunteer" ? <VolunteerSidebar /> : <AssociationSidebar />}

            <HomeConcept />
            <HomeUsers />
            <HomeTeam />
            <HomeEvolution />
            <HomeContact />
        </div>
    );
}

export default Home;