import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

function Home() {
    const navigate = useNavigate();

    const handleClickRegister = () => {
        navigate('/register');
    }
    const handleClickLogin = () => {
        navigate('/login');
    }

    return (
        <div className='body-home'>
            <h1>HiVolunteer</h1>
            <h2>Donnez-vous l'occasion d'agir !</h2>
            <div className='btn-container'>
                <button className='btn-basic' onClick={handleClickRegister}>Inscription</button>
                <button className='btn-basic' onClick={handleClickLogin}>Connexion</button>
            </div>
        </div>
    );
}

export default Home;