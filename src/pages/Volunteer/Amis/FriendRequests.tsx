import React, { useEffect, useState } from 'react';
import FriendRequestCard from "./FriendRequestCard";
import { Volunteer } from "../../../interfaces";
import { VolunteerPage } from "../Search/Interfaces";
import config from "../../../config";

function FriendRequests(props: any) {
    const [volunteerList, setVolunteerList] = useState<Volunteer[]>([]);
    const [volunteerStatuses, setVolunteerStatuses] = useState<{ [key: string]: number }>({});
    const yourId = localStorage.getItem("id");

    useEffect(() => {
        fetch(`${config.apiUrl}/volunteers/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setVolunteerList(data);
                fetchStatusForVolunteers(data);
            })
            .catch((error) => console.error("Error fetching volunteer data:", error));
    }, []);

    const fetchStatusForVolunteers = (volunteers: Volunteer[]) => {
        const statusPromises = volunteers.map((volunteer) =>
            fetch(`${config.apiUrl}/friends/${volunteer.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => response.json())
                .then((statusData) => {
                    if (Array.isArray(statusData) && statusData.length > 0) {
                        const status = statusData[0].status;
                        setVolunteerStatuses(prevStatuses => ({
                            ...prevStatuses,
                            [volunteer.id]: status,
                        }));
                    } else {
                        setVolunteerStatuses(prevStatuses => ({
                            ...prevStatuses,
                            [volunteer.id]: null,
                        }));
                    }
                })
        );

        Promise.all(statusPromises)
            .catch((error) => console.error("Error fetching volunteer statuses:", error));
    }

    const filteredVolunteers = volunteerList.filter(volunteer =>
        yourId !== null && volunteer.id !== +yourId && volunteerStatuses[volunteer.id] === 0
    );

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
            { filteredVolunteers.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    Aucune demande d'ami pour le moment.
                </p>
            ) : (
                filteredVolunteers.map((volunteer: Volunteer) => (
                    <div key={volunteer.id} style={{ margin: '25px', width: '25%' }}>
                        <FriendRequestCard volunteer={volunteer} />
                    </div>
                ))
            )}
            </div>
        </div>
    );
}

export default FriendRequests;