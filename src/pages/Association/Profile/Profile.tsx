import * as React from "react";
import Card from '@mui/material/Card';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import {useEffect, useState} from "react";
import config from "../../../config";
import "./Profile.scss";

type newProfile = {
  name: string;
  description: string;
  email: string;
  phone: string;
  profile_picture: string;
};

export default function FullWidthGrid(props: any) {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const image =
        "https://urgo.fr/wp-content/uploads/2022/03/Logo-Reforestaction.png";


    useEffect(() => {
        const getProfile = async () => {
            await fetch(`${config.apiUrl}/associations/profile`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        response.json().then((data) => {
                            console.log(data.association, "here");
                            setName(data.association.name);
                            setDescription(data.association.description);
                            setEmail(data.association.email);
                            setPhone(data.association.phone);
                        });
                    } else {
                        console.log("Error fetching profile");
                        console.log(response);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        getProfile();
    }, []);

    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                alignSelf: "self-start",
                textAlign: "center",
                padding: "20px",
            }}>
                <img src={image} alt="Logo de profil" className={"container-div"}/>
                <h1>Association {name}</h1>
            </div>
            <div className="container-div">

                <h2>
                    Bénévoles
                </h2>
                <Grid container alignItems="stretch" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: "space-between",
                }}>
                    <Grid item style={{
                        display: 'flex',
                        marginBottom: "30px",
                    }}>
                        <Card className={"card-component"}>
                            <h4>
                                0 bénévoles actuels
                            </h4>
                            <h4>
                                Vous n'avez actuellement aucun bénévole
                            </h4>
                        </Card>
                        <Card className={"card-component"}>
                            <h4>
                                0 bénévoles en attente de confirmation
                            </h4>
                            <h4>
                                Vous n'avez actuellement aucun bénévole en attente de confirmation
                            </h4>
                        </Card>
                    </Grid>
                </Grid>
                <h2>
                    Description de l'association
                </h2>
                <h4 style={{
                    padding: "20px",
                    textAlign: "center",
                }}>
                    {description === null || description === undefined || description === "" ? "Aucune description n'est disponible pour cette association" : description}
                </h4>
                <h2>
                    Contact
                </h2>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    textAlign: "center",
                    padding: "20px",
                }}>
                    <h4>
                        {email}
                    </h4>
                    <h4>
                        {phone}
                    </h4>
                </div>


            </div>
        </>
)
    ;
}
