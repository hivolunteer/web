import React, { useEffect, useState } from 'react';
import FriendRequestCard from "./FriendRequestCard";
import { Volunteer } from "../../../interfaces";
import config from "../../../config";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import fr from "date-fns/locale/fr";

function FriendRequests() {
    const [volunteerList, setVolunteerList] = useState<Volunteer[]>([]);
    const [volunteerStatuses, setVolunteerStatuses] = useState<{ [key: string]: number }>({});
    const [activeSection, setActiveSection] = useState<string>('pending');
    const [friends, setFriends] = useState<any[]>([]);
    const localId = localStorage.getItem("id");

    useEffect(() => {
        const fetchVolunteers = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/volunteers/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await response.json();
                setVolunteerList(data);
                fetchStatusForVolunteers(data);
            } catch (error) {
                console.error("Error fetching volunteer data:", error);
            }
        };

        fetchVolunteers();
    }, []);

    const fetchStatusForVolunteers = async (volunteers: Volunteer[]) => {
        const statusPromises = volunteers.map(async (volunteer) => {
            try {
                const response = await fetch(`${config.apiUrl}/friends/${volunteer.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const statusData = await response.json();
                const status = Array.isArray(statusData) && statusData.length > 0 ? statusData[0].status : null;
                setVolunteerStatuses(prevStatuses => ({
                    ...prevStatuses,
                    [volunteer.id]: status,
                }));
            } catch (error) {
                console.error("Error fetching volunteer statuses:", error);
            }
        });

        await Promise.all(statusPromises);
    };

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/friends/${localId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setFriends(data);
                }
            } catch (error) {
                console.error("Error fetching friends:", error);
            }
        };

        fetchFriends();
    }, [localId]);

    const filteredVolunteers = volunteerList.filter(volunteer => {
        const status = volunteerStatuses[volunteer.id] || null; // Get the status for the volunteer
        if (activeSection === 'pending') {
            return (
                localId !== volunteer.id.toString() &&
                localId !== null &&
                friends.some(friend => friend.user_id1 === volunteer.id && friend.status === 0)
            );
        } else {
            return (
                localId !== volunteer.id.toString() &&
                localId !== null &&
                friends.some(friend => friend.user_id2 === volunteer.id && friend.status === 0)
            );
        }
    });

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }} >
            <ToggleButtonGroup
                color={'primary'}
                value={activeSection}
                exclusive
                onChange={(event, newAlignment) => {
                    if (newAlignment !== null) {
                        setActiveSection(newAlignment);
                    }
                }}
                sx={{ marginBottom: 2, marginTop: 5, display: 'flex', justifyContent: 'center' }}
            >
                <ToggleButton value="pending">Demandes en attente</ToggleButton>
                <ToggleButton value="sent">Mes demandes d'amis</ToggleButton>
            </ToggleButtonGroup>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
                {filteredVolunteers.map((volunteer: Volunteer) => (
                    <div key={volunteer.id} style={{ margin: '25px', width: '25%' }}>
                        <FriendRequestCard
                            volunteer={volunteer}
                            isPending={activeSection === 'pending'}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FriendRequests;