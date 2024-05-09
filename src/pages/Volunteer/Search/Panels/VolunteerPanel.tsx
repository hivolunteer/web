import { useEffect, useState } from "react";
import { Volunteer } from "../../../../interfaces";
import config from "../../../../config";
import VolunteerCard from "../Cards/VolunteerCard";

interface VolunteerPanelProps {
    volunteerFilteredList: Array<Volunteer>;
    search: string;
    width: number
}

function VolunteerPanel(props: VolunteerPanelProps) {

    const { volunteerFilteredList, search, width } = props;

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
                    .filter((volunteer: Volunteer) => {
                        return volunteer.first_name.toLowerCase().includes(search.toLowerCase()) || volunteer.last_name.toLowerCase().includes(search.toLowerCase()) || volunteer.email.toLowerCase().includes(search.toLowerCase())
                    })
                    .map((volunteer: Volunteer) => (
                        <div className='mission-card-assovol' key={volunteer.id}>
                            <VolunteerCard volunteer={volunteer} />
                        </div>
                    ))
            }
        </div>
    )
}

export default VolunteerPanel;