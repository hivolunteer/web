import React from 'react';
import './Home.scss';
import HomeConcept from './HomeConcept';
import HomeUsers from './HomeUsers';
import HomeTeam from './HomeTeam';
import HomeEvolution from './HomeEvolution';
import HomeContact from './HomeContact';
import VolunteerSidebar from '../../../sidebar/VolunteerSidebar';
import AssociationSidebar from '../../../sidebar/AssociationSidebar';
import CompanySidebar from '../../../sidebar/CompanySidebar';
function Home() {
    return (
        <div>
            {localStorage.getItem("role") === "volunteer" ? (
                <VolunteerSidebar />
              ) : localStorage.getItem("role") === "association" ? (
                <AssociationSidebar />
              ) : (
                <CompanySidebar />
            )}

            <HomeConcept />
            <HomeUsers />
            <HomeTeam />
            <HomeEvolution />
            <HomeContact />
        </div>
    );
}

export default Home;