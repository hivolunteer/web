interface Association {
    id: number,
    name: string,
    rating: number,
    referent_token: string | null
}

interface Referent {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    profile_picture: string
}

export type { Association, Referent }