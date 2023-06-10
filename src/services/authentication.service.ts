export class AuthenticationService {

    static async loginVolunteers(user: { [k: string]: FormDataEntryValue; }) {
        const response = await fetch('/volunteers/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        const data : any = response.json();
        //get token from data to local storage
        console.log(data);
        localStorage.setItem("token", await data.token);
        return response.status;
    }

    static async loginAssociations(user: { [k: string]: FormDataEntryValue; }) {
        const response = await fetch('/associations/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        const data = response.json();
        localStorage.setItem("auth", await data);
        console.log("token: " + localStorage.getItem("auth"));
        return response.status;
    }

    static async registerVolunteers(user: { [k: string]: FormDataEntryValue; }) {
        user['profile_picture'] = "HELL";
        const response = await fetch('/volunteers/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        const data : any = response.json();
        localStorage.setItem("token", await data.token);
        return data;
    }

    static async registerAssociations(user: { [k: string]: FormDataEntryValue; }) {
        user['profile_picture'] = "HELL";
        const response = await fetch('/associations/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        const data = response.json();
        localStorage.setItem("auth", await data);
        console.log("token: " + localStorage.getItem("auth"));
        return data;
    }
}