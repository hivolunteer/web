import config from "../config";

export class AuthenticationService {

    static async loginVolunteers(user: { [k: string]: FormDataEntryValue; }) {
        return await fetch(`${config.apiUrl}/volunteers/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then((response) => {
            response.json().then((data) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('color_blind', 'false')
                localStorage.setItem('id', data.id)
            })
            return response.status;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
    };


    static async loginAssociations(user: { [k: string]: FormDataEntryValue; }) {
        return await fetch(`${config.apiUrl}/associations/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then((response) => {
            response.json().then((data) => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('color_blind', 'false')
                localStorage.setItem('id', data.id)
                return response.status;
            })
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
    }

    static async registerVolunteers(user: { [k: string]: FormDataEntryValue; }) {
        user['profile_picture'] = "HELL";
        const response = await fetch(`${config.apiUrl}/volunteers/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        response.json().then((data) => {
            localStorage.setItem('token', data.token)
        })
        return response.status;
    }

    static async registerAssociations(user: { [k: string]: FormDataEntryValue; }) {
        user['profile_picture'] = "HELL";
        const response = await fetch(`${config.apiUrl}/associations/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        response.json().then((data) => {
            localStorage.setItem('token', data.token)
        })
        return response.status;
    }
}