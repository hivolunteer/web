import React, { useState, useEffect } from 'react';
import './Home.scss';
import ResponsiveAppBar from '../../../sidebar/Sidebar';
import HomeConcept from './HomeConcept';
import HomeUsers from './HomeUsers';
import HomeTeam from './HomeTeam';
import HomeEvolution from './HomeEvolution';
import HomeContact from './HomeContact';

function Home() {
    return (
        <div>
            <ResponsiveAppBar />
            <HomeConcept />
            <HomeUsers />
            <HomeTeam />
            <HomeEvolution />
            <HomeContact />
        </div>
    );
}

export default Home;