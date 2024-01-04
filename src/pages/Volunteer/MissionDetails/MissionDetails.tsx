import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, useTheme } from '@mui/material';
import { ArrowBack, CalendarToday, LocationOn, Star } from '@mui/icons-material';
import Moment from 'moment';
import { SxProps, Theme } from '@mui/system';
import { Mission } from '../../../interfaces';
import { useParams } from 'react-router-dom';
import config from "../../../config";


const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    return `#${randomColor}`;
};

const MissionDetails: React.FC = () => {
    const { missionID } = useParams<{ missionID: string }>();
    const theme = useTheme();
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
    const [mission, setMissionData] = useState<Mission>();
    const [error, setError] = useState<string | null>(null);

    const styles: Record<string, SxProps<Theme>> = {
        container: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        header: {
            gridColumn: 2,
            gridRow: 2,
            display: 'grid',
            gridGap: 10,
            margin: theme.spacing(2),
            backgroundColor: '#F5F5F5',
            borderRadius: '10px',
            boxShadow: '0 32px 64px rgba(0,0,0,0.2)',
            padding: '16px',
        },
        headerRowWithIcon: {
            display: 'flex',
            alignItems: 'center',
        },
        associationName: {
            textAlign: 'center',
            color: '#1f0812',
            fontWeight: 600,
            fontSize: '30px',
            marginBottom: '50px',
        },
        titleText: {
            fontSize: 24,
            padding: theme.spacing(1),
            fontWeight: 'bold',
        },
        titleContent: {
            fontSize: 18,
        },
        body: {
            gridColumn: 2,
            gridRow: 2,
            display: 'grid',
            gridGap: 10,
            margin: theme.spacing(2),
            backgroundColor: '#F5F5F5',
            borderRadius: '10px',
            boxShadow: '0 32px 64px rgba(0,0,0,0.2)',
            padding: '16px',
        },
        tagButton: {
            backgroundColor: generateColor(),
            borderRadius: 20,
            margin: theme.spacing(0.5),
            padding: theme.spacing(0.5),
            color: 'white',
        },
        participerButton: {
            backgroundColor: '#67A191',
            borderRadius: '10px',
            margin: 'auto',
            padding: theme.spacing(1),
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px',
            width: 'fit-content',
            size: 'large',
        },
    };

    async function getMissionById(missionId: number) {
        try {
            const response = await fetch(`${config.apiUrl}/missions/association/${missionId}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }

            const data = await response.json();
            if (!data.association_mission) {
                setError(`Mission with ID ${missionId} does not exist.`);
                return;
            }
            setMissionData(data.association_mission as Mission);
            fetchIfVolunteerIsRegistered(); // Call fetchIfVolunteerIsRegistered here
        } catch (error) {
            console.log("error");
            console.error('Load Error:', error);
            setError(`An error occurred: ${(error as Error).message}`);
        }
    }

    const fetchIfVolunteerIsRegistered = async () => {
        try {
            const response = await fetch(`${config.apiUrl}/missions/volunteer/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                var data = await response.json();
                data = data.association_mission;
                if (data === undefined) {
                    setIsRegistered(false);
                    return;
                }
                const isUserPresent = missionID && data.some((array: any) => array.association_mission === parseInt(missionID));
                setIsRegistered(isUserPresent);
            } else {
                throw new Error('HTTP error ' + response.status);
            }
        } catch (error) {
            console.error('Failed to fetch volunteers:', error);
        }
    };

    const registerToMission = async () => {
        if (!mission)
            return;
        const url = isRegistered ? `/missions/volunteer/remove/${missionID}` : `/missions/volunteer/add/${missionID}`;
        fetch(`${config.apiUrl}${url}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                association_mission: missionID
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                isRegistered ? alert("Unregistered.") : alert("Registered.");
                setIsRegistered(!isRegistered);
            })
            .catch(error => {
                console.error('Registration Error:', error);
            });
    };

    useEffect(() => {
        if (missionID) {
            getMissionById(parseInt(missionID));
        }
    }, [missionID]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container sx={styles.container}>
            <Box sx={styles.header}>
                <Typography sx={styles.associationName}>{mission ? mission.title : 'Chargement...'}</Typography>
                <Box sx={styles.headerRowWithIcon}>
                    <CalendarToday />
                    <Typography>
                        {mission ? Moment(mission.start_date).format("DD/MM/YYYY HH:mm") : 'Chargement...'} - {mission ? Moment(mission.end_date).format("DD/MM/YYYY HH:mm") : 'Chargement...'}
                    </Typography>
                </Box>
                <Box sx={styles.headerRowWithIcon}>
                    <LocationOn />
                    <Typography>{mission ? `${mission.trueLocation?.street_number} ${mission.trueLocation?.street_number_suffix} ${mission.trueLocation?.street_type} ${mission.trueLocation?.street_name} ` : 'Chargement...'}</Typography>
                </Box>
                <Box sx={styles.headerRowWithIcon}>
                    <Star />
                    <Typography> Noter la mission</Typography>
                </Box>
                <Button sx={styles.participerButton} onClick={registerToMission}>
                    {isRegistered ? 'Se désinscrire' : 'Participer'}
                </Button>
            </Box>
            <Box sx={styles.body}>
                {mission?.description && (
                    <>
                        <Typography sx={styles.titleText}>Description de la mission</Typography>
                        <Typography sx={styles.titleContent}>{mission.description}</Typography>
                    </>
                )}
                {mission?.practical_information && (
                    <>
                        <Typography sx={styles.titleText}>Informations pratiques</Typography>
                        <Typography sx={styles.titleContent}>{mission.practical_information}</Typography>
                    </>
                )}
                <Typography sx={styles.titleText}>Compétences requises</Typography>
                <Box>
                    {['Mathématiques', 'Ukrainien', 'Cours', 'Tag4', 'Tag5'].map(item => (
                        <Button key={item} sx={styles.tagButton}>{item}</Button>
                    ))}
                </Box>
            </Box>

        </Container>
    );
};

export default MissionDetails;