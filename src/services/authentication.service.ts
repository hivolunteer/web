import config from "../config";

export class AuthenticationService {
    static async loginVolunteers(user: { [k: string]: FormDataEntryValue; }) {
        return await fetch(`${config.apiUrl}/volunteers/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then((response) => {
            if (response.status === 200) {

                response.json().then((data) => {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('color_blind', 'false')
                    localStorage.setItem('id', data.id)
                })
            }
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
            if (response.status === 200) {
                response.json().then((data) => {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('color_blind', 'false')
                    localStorage.setItem('id', data.id)
                })
            }
            return response.status;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
    }

    static async loginCompanies(user: { [k: string]: FormDataEntryValue; }) {
        return await fetch(`${config.apiUrl}/companies/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('color_blind', 'false')
                    localStorage.setItem('id', data.id)
                })
            }
            return response.status;
        })
        .catch((error) => {
            console.error('Error:', error);
            return null;
        });
    }

    static async registerVolunteers(user: { [k: string]: FormDataEntryValue; }) {
        user['profile_picture'] = "NULL";
        const response = await fetch(`${config.apiUrl}/volunteers/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        return response.status;
    }

    static async registerAssociations(user: { [k: string]: FormDataEntryValue; }) {
        user['profile_picture'] = "NULL";
        const response = await fetch(`${config.apiUrl}/associations/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        return response.status;
    }

    static async registerCompanies(user: { [k: string]: FormDataEntryValue; }) {
        user['profile_picture'] = "NULL";
        const response = await fetch(`${config.apiUrl}/companies/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        return response.status;
    }
}