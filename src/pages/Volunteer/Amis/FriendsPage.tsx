import {useEffect, useState} from "react";
import config from "../../../config";
import {VolunteerPage, VolunteerProps} from "../Search/Interfaces";
import filterVolunteerAndPagination from "../Search/functions/filterVolunteerAndPagination";
import VolunteerPanel from "../Search/Panels/VolunteerPanel";
import {Volunteer} from "../../../interfaces";


function FriendsPage() {
    const [volunteerList, setVolunteerList] = useState<Array<Volunteer>>([]);
    const [search, setSearch] = useState<string>("");


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
                setVolunteerList(data);
            });
    }, []);

    function returnVolunteers() : Array<VolunteerPage> {
        let props : VolunteerProps = {
            volunteersList: volunteerList,
            search: search
        }
        return filterVolunteerAndPagination(props)
    }

    return (
        <VolunteerPanel
            volunteerPages={returnVolunteers()}
        />
    )
}

export default FriendsPage;