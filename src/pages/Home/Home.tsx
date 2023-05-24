import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

function Home() {
    const navigate = useNavigate();

    function handleClickRegisterVolunteer() {
        navigate('/register/volunteer');
    }
    function handleClickRegisterAssociation() {
        navigate('/register/association');
    }
    function handleClickLogin() {
        navigate('/login');
    }

    return (
        <div className='body-home'>
            <h1>HiVolunteer</h1>
            <h2>Donnez-vous l'occasion d'agir !</h2>
            <div className='btn-container'>
                <button className='btn-basic' onClick={handleClickRegisterVolunteer}>Inscription Volontaire</button>
                <button className='btn-basic' onClick={handleClickRegisterAssociation}>Inscription Association</button>
                <button className='btn-basic' onClick={handleClickLogin}>Connexion</button>
            </div>
        </div>
    );
}

export default Home;