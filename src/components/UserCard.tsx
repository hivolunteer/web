import { CardMedia } from "@mui/material";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "../pages/Volunteer/Home/Home.scss";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import config from "../config";

interface User {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_picture: string;
    rating: number;
    status: number;
}

function UserCard(props: { user: any }) {
    // set user with props
    let [user, setUser] = useState<User>({
        id: 0,
        name: "",
        first_name: "",
        last_name: "",
        email: "",
        profile_picture: "",
        rating: 0,
        status: 0,
    });

    // set user with props
    useEffect(() => {
        setUser(props.user);
    }, []);

    return (
        <Card className="user-card">
            <CardMedia
                component="img"
                height="140"
                image={user.profile_picture}
                alt="user profile picture"
            />
            <Card.Body>
                <Card.Title>
                    {user.first_name} {user.last_name}
                </Card.Title>
                <Card.Text>{user.email}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default UserCard;
