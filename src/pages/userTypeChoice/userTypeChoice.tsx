import React from "react";
import "./userTypeChoice.scss";
import {Link} from "react-router-dom";
import Switch from "@mui/material/Switch";
import {Grid} from "@mui/material";
import titleLogo from "../../images/titleLogo.png";
const UserTypeChoice = () => {
    const [associationRegisterStatus, setAssociationRegisterStatus] = React.useState("/register/association");
    const [volunteerRegisterStatus, setVolunteerRegisterStatus] = React.useState("/register/volunteer");
    const [companyRegisterStatus, setCompanyRegisterStatus] = React.useState("/register");

    const [checked, setChecked] = React.useState(true);

    React.useEffect(() => {
        if (checked) {
            setAssociationRegisterStatus("/login/association");
            setVolunteerRegisterStatus("/login/volunteer");
            setCompanyRegisterStatus("/login");
        } else {
            setAssociationRegisterStatus("/register/association");
            setVolunteerRegisterStatus("/register/volunteer");
            setCompanyRegisterStatus("/register");
        }
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="container">
            <div className="row">
                <h1 className="title">Qui êtes vous ?</h1>
            </div>

            <div className="row">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Inscription</Grid>
                    <Grid item>
                        <Switch
                            checked={checked} // relevant state for your case
                            onChange={handleChange} // relevant method to handle your change
                            value="checked" // some value you need
                        />
                    </Grid>
                    <Grid item>Connexion</Grid>
                </Grid>
            </div>
            <div className="row">
                <div className="col-12">
                    <Link to={companyRegisterStatus} style={{textDecoration: "none"}}>
                        <button className="btn entreprise btn-lg">Entreprise</button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <img className="titleLogo" src={titleLogo} alt=""/>
                </div>
                <div className="col-6">
                    <Link
                        to={associationRegisterStatus}
                        style={{textDecoration: "none"}}
                    >
                        <button className="btn association btn-lg">Association</button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Link to={volunteerRegisterStatus} style={{textDecoration: "none"}}>
                        <button className="btn benevole btn-lg">Bénévole</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserTypeChoice;
