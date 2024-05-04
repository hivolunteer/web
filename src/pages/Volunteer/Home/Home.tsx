import { useState, useEffect } from 'react';
import './Home.scss';
import './NewHome.scss';
import config from "../../../config";
import MissionCard from '../../../components/HomeMissionCard';
import WeekMissions from './WeekMissions';
import { Box, Grid } from '@mui/material';
import SearchSection from './SearchSection';
import MissionsPanel from './MissionsPanel';

function Home(props: any) {
    
    return(
        <div>
            <SearchSection />
            <MissionsPanel />
        </div>
    )
}

export default Home;