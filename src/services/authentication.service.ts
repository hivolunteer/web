import config from "../config";

export class AuthenticationService {

    static async loginVolunteers(user: { [k: string]: FormDataEntryValue; }) {
        const response = await fetch(`${config.apiUrl}/volunteers/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        response.json().then((data) => {
            localStorage.setItem('token', data.token)
        })
        return response.status;
    }

    static async loginAssociations(user: { [k: string]: FormDataEntryValue; }) {
        const response = await fetch(`${config.apiUrl}/associations/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        response.json().then((data) => {
            localStorage.setItem('token', data.token)
        })
        console.log("token: " + localStorage.getItem("token"));
        return response.status;
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