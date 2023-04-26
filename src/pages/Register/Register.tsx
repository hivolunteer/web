import React, {useState} from 'react';
import './Register.scss';

function Register() {
    const [value, setValue] = useState('Prénom');
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className='boda'>
        <div className='body-register'>
            <div className='cont'>
                <h1 className='title'>HiVolunteer</h1>
                <div className='input-container'>
                    <input type='text' onChange={(e) =>
                        setValue(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`input input-style ${isFocused ? 'focused' : ''}`}
                        placeholder='Prénom'
                    />
                </div>
            </div>
        </div>
        </div>
    );
}

export default Register;