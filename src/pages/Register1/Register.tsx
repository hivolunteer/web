import React, {useState} from 'react';
import './Register.scss';

function Register() {
    const [value, setValue] = useState('Prénom');
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="registerBackground">
            <div className="container">
                <div className="innercontainer">
                    <div className="container-title">
                        <h1 className="title">HiVolunteer</h1>
                        <h2 className="subtitle">Créer un compte</h2>
                    </div>
                    <div className="container-form">
                        <form>
                            <div className="form-field">
                                <div>
                                    <div className='input input-error'>
                                        <div className='input_container'>
                                            <input autoCapitalize='off' autoComplete='username' autoCorrect='off'
                                                   className='input_field' name='email' id='email' step='1' type='email' onChange={(e) => setValue(e.target.value)}/>
                                            <label className='input_label' htmlFor='email'>Email</label>
                                            <div className='input-error_label input-mat-error_label'>Quelle est votre adresse mail</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;