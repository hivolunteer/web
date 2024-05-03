import { useState, useEffect } from 'react';
import './Home.scss';
import './NewHome.scss';
import config from "../../../config";
import MissionCard from '../../../components/HomeMissionCard';
import WeekMissions from './WeekMissions';
import { Box, Grid } from '@mui/material';
import SearchSection from './SearchSection';

function Home(props: any) {

    const [missionList, setMissionList] = useState<Number[]>([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/volunteer/active`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    setMissionList(data.active_missions)
                })
            }
        })
    }, []);
    
    return(
        <div>
            <SearchSection />
        </div>
    )
}

export default Home;