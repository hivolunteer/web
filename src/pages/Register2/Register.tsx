import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import './Register.scss';

type FormData = {
    firstName: string;
    lastName: string;
    birth : {
        day: number;
        month: number;
        year: number;
    }
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
        if (validerAge(data.birth.day, data.birth.month, data.birth.year) &&
        validerDate(data.birth.day, data.birth.month, data.birth.year)) {
            alert("Votre compte a bien été créé");
        }
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

    // Fonction de mise en forme des sélecteurs de la date de naissance
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from(
        { length: new Date().getFullYear() - 1800 },
        (_, i) => new Date().getFullYear() - i
    );
    // Fonction de vérification que la date de naissance est une date valide
    const [dateValide, setDateValide] = useState(true);
    const [ageValide, setAgeValide] = useState(true);
    function validerDate(day: number, month: number, year: number) {
        const momentDate = moment(`${day}/${month}/${year}`, "DD/MM/YYYY");
        const estValide = momentDate.isValid();
        setDateValide(estValide);
        return estValide;
    }
    // Vérifier que la personne a au moins 18 ans
    function validerAge(day: number, month: number, year: number) {
        const momentDate = moment(`${day}/${month}/${year}`, "DD/MM/YYYY");
        const age = moment().diff(momentDate, "years", true);
        const estValide = age >= 18;
        setAgeValide(estValide);
        return estValide;
    }


    const i = 1;
    return (
        <div className="main">
            <div className="container">
                <h1 className="title">HiVolunteer</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Champs pour le prénom et le nom */}
                    <input {...register("firstName")} placeholder="Prénom" />
                    <input {...register("lastName")} placeholder="Nom" />

                    {/* Champs pour la date de naissance*/}
                    <div>
                        Date de naissance
                        <select {...register("birth.day")}>
                          {days.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                        <select {...register("birth.month")}>
                          {months.map((month) => (
                            <option key={month} value={month}>
                              {month}
                            </option>
                          ))}
                        </select>
                        <select {...register("birth.year")}>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                        {!dateValide && <p>La date n'est pas valide</p>}
                        {!ageValide && <p>Vous devez avoir au moins 18 ans pour vous inscrire</p>}
                    </div>

                    {/* Champ pour l'adresse mail */}
                    <input
                        {...register("email", { validate: validateEmail })}
                        placeholder="Email"
                    />

                    {/* Affiche un message d'erreur si l'adresse mail n'est pas valide */}
                    {errors.email && <p>{errors.email.message}</p>}

                    {/* Champ pour le mot de passe */}
                    <div>
                        <input
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
                    <button type="submit">S'inscrire</button>
                </form>
            </div>
        </div>
    );
}

export default Register;