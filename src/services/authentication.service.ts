export class AuthenticationService {

    static async registerVolunteers(user: { [k: string]: FormDataEntryValue; }) {
        const response = await fetch('/volunteers/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });
        const data = response.json();
        return data;
    }
}