/**
 * @module Home.tsx
 * @description Association Home Page
 * @utility This page is used to display the association's home page
*/

import './Home.scss';
import {useEffect, useState } from 'react'
import config from "../../../config";
import { Button } from '@mui/material';

interface Association {
    id: number,
    name: string, 
    rating: string,
    profile_picture: string,
}

function Home () {

    const [Association, setAssociation] = useState<Association>({
        id: 0,
        name: "", 
        rating: "",
        profile_picture: "",
    })

    useEffect(() => {
        fetch(`${config.apiUrl}/associations/profile`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data.association)
                    setAssociation(data.association)
                })
            }
        })
    }, [])

    return (
        <div className="home-container">
            <div className="header-container-association" style={{height: '20%', maxHeight: '200px'}}>
                <div className="header-left-association">
                    <div className="header-picture">
                        <img src={Association.profile_picture} alt="profile_picture" className="profile-picture" />
                    </div>
                    <div className={"header-rating" + ((localStorage.getItem("color_blind") === "true") ? " color-blind-bg" : "")}>
                        <h2 className="asso-rating"> {Association.rating} / 5 </h2>
                    </div>
                    <h1> {Association.name} </h1>
                </div>
                <div className="header-right-association">
                    <Button 
                        variant="contained"
                        className="new-mission"
                        style={{
                            backgroundColor: '#67A191',
                            color: '#FFFEFF',
                            textTransform: 'none',
                            borderRadius: '10px',
                            fontSize: '15px',
                            width: '100%',
                            height: '100%',
                            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        }}
                        onClick={() => {window.location.href = 'missionCreation'}}
                    > 
                        Nouvelle Mission
                    </Button>
                </div>
            </div>
            <div className="body-container" style={{flex: 2}}>
                <p className="body-title"> Description </p>
            </div>
        </div>
    )
}

export default Home
