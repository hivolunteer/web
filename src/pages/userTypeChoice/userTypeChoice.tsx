import React from "react";
import './userTypeChoice.scss';
import titleLogo from '../../images/titleLogo.png';
import {Link} from "react-router-dom";

const UserTypeChoice = () => {

    return(
        <div className="container">
            <div className="row">
                <h1 className="title">
                    Qui êtes vous ?
                </h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <Link to="/register" style={{textDecoration: "none"}}>
                        <button className="btn entreprise btn-lg">
                            Entreprise
                        </button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <img className="titleLogo" src={titleLogo} alt=""/>
                </div>
                <div className="col-6">
                    <Link to="/register" style={{textDecoration: "none"}}>
                        <button className="btn association btn-lg" >
                            Association
                        </button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Link to="/register" style={{textDecoration: "none"}}>
                        <button className="btn benevole btn-lg">
                            Bénévole
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default UserTypeChoice;