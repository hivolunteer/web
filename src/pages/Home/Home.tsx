import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

function Home() {
    const navigate = useNavigate();

    function handleClickRegisterVolunteer() {
        navigate('/register');
    }
    function handleClickRegisterAssociation() {
        navigate('/register');
    }
    function handleClickLoginVolunteer() {
        navigate('/login');
    }
    function handleClickLoginAssociation() {
        navigate('/login');
    }

    return (
        <div className='body-home'>
            <h1>HiVolunteer</h1>
            <h2>Donnez-vous l'occasion d'agir !</h2>
            <div className='btn-container'>
                <button className='btn-basic' onClick={handleClickRegisterVolunteer}>Inscription Volontaire</button>
                <button className='btn-basic' onClick={handleClickRegisterAssociation}>Inscription Association</button>
                <button className='btn-basic' onClick={handleClickLoginVolunteer}>Connexion Volontaire</button>
                <button className='btn-basic' onClick={handleClickLoginAssociation}>Connexion Association</button>

            </div>
        </div>
    );
}

export default Home;