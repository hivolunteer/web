export class AuthenticationService {

    static async registerVolunteers(user: { [k: string]: FormDataEntryValue; }) {
        const response = await fetch('/volunteers/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        const data = response.json();
        localStorage.setItem("auth", await data);
        console.log("token: " + localStorage.getItem("auth"));
        return data;
    }

    static async registerAssociations(user: { [k: string]: FormDataEntryValue; }) {
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