import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import './Register.scss';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

type FormData = {
    firstName: string;
    lastName: string;
    birthdate: string;
    email: string;
    password: string;
};

function Register() {
    // État local pour afficher ou cacher le mot de passe
    const [showPassword, setShowPassword] = useState(false);

    // Récupère les fonctions nécessaires pour gérer le formulaire
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    // Fonction appelée lorsque le formulaire est soumis
    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    // Fonction de validation pour l'adresse mail
    const validateEmail = (value: string) => {
        if (!value.match(/^\S+@\S+\.\S+$/)) {
            return "L'adresse mail n'est pas au bon format";
        }
    };

    // Fonction de validation pour le mot de passe
    const validatePassword = (value: string) => {
        if (!value.match(/^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
            return "Le mot de passe doit contenir au moins 8 caractères avec une majuscule et un chiffre";
        }
    };

    // Vérifier la date de naissance
    const [birthdate, setBirthdate] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const handleBirthdateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthdate(event.target.value);
        //const age = moment().diff(event.target.value, 'years');
        //setShowAlert(age < 18);
      //  if (age < 18) {
      //      alert('Vous devez avoir au moins 18 ans pour vous inscrire');
      //  }
    };
    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Vous devez avoir au moins 18 ans pour vous inscrire
        </Tooltip>
    );
    const age = moment().diff(birthdate, 'years');
    const showTooltip = age < 18;

    const i = 1;
    return (
        <div className="main">
            <div className="container">
                <h1 className="title">HiVolunteer</h1>
                <form className='form-register' onSubmit={handleSubmit(onSubmit)}>
                    {/* Champs pour le prénom et le nom */}
                    <input className='input-register' {...register("firstName")} placeholder="Prénom" />
                    <input className='input-register' {...register("lastName")} placeholder="Nom" />

                    {/* Champ pour la date de naissance*/}
                    <div>
                        <input  {...register("birthdate")} className='input-register'
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            placeholder="Date de naissance"
                            pattern='\d{1,2}/\d{1,2}/\d{4}'
                            onChange={handleBirthdateChange}/>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                                show={showTooltip}
                            >
                                <span className="d-inline-block">
                                    <button type="button" className="btn btn-secondary" disabled>
                                        i
                                    </button>
                                </span>
                            </OverlayTrigger>
                            {/*showAlert && (<Alert variant='warning'>Vous devez avoir au moins 18 ans pour vous inscrire</Alert>)*/}
                    </div>

                    {/* Champ pour l'adresse mail */}
                    <input className='input-register'
                        {...register("email", { validate: validateEmail })}
                        placeholder="Email"
                    />

                    {/* Affiche un message d'erreur si l'adresse mail n'est pas valide */}
                    {errors.email && <p>{errors.email.message}</p>}

                    {/* Champ pour le mot de passe */}
                    <div>
                        <input className='input-register'
                            type={showPassword ? "text" : "password"}
                            {...register("password", { validate: validatePassword })}
                            placeholder="Mot de passe"
                        />

                        {/* Bouton pour afficher ou cacher le mot de passe */}
                        <button type="button" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Cacher" : "Afficher"}
                        </button>
                    </div>

                    {/* Affiche un message d'erreur si le mot de passe n'est pas valide */}
                    {errors.password && <p>{errors.password.message}</p>}

                    {/* Bouton pour soumettre le formulaire */}
                    <button className='btn-basic' type="submit">S'inscrire</button>
                </form>
            </div>
        </div>
    );
}

export default Register;