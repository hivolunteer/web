import { useEffect, useState } from "react";
import { Volunteer } from "../../../../interfaces";
import config from "../../../../config";
import VolunteerCard from "../Cards/VolunteerCard";

interface VolunteerPanelProps {
    volunteerFilteredList: Array<Volunteer>;
    search: string;
}

function VolunteerPanel(props: VolunteerPanelProps) {

    const { volunteerFilteredList, search } = props;

    const [volunteersList, setVolunteersList] = useState<Array<Volunteer>>([]);

    useEffect(() => {
        fetch(`${config.apiUrl}/volunteers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setVolunteersList(data);
            });
    }, [volunteerFilteredList]);

    return (
        <div className="missions-container">
            {
                volunteersList
                    .map((volunteer: Volunteer) => (
                        <div className="mission-card-volunteer" key={volunteer.id}>
                            <VolunteerCard volunteer={volunteer} />
                        </div>
                    ))
            }
        </div>
    )
}

export default VolunteerPanel;