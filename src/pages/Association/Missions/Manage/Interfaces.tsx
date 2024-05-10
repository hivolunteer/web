interface Mission {
    id: number,
    max_volunteers: number,
    description: string,
    practical_information: string,
    start_date: Date,
    end_date: Date,
    location: number,
    title: string,
    status: number,
    theme_id: number,
    picture: string,
}

interface Location {
    id: number,
    street_number: string,
    street_name: string,
    street_number_suffix: string,
    street_type: string,
    departement_id: number,
    city: number,
    postal_code: string,
}

interface Volunteer {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    profile_picture: string,
    rating: number,
    status: number,
    stars_from_volunteer: number,
    stars_from_association: number,
    comment_from_volunteer: string,
    comment_from_association: string,
}

export type { Mission, Location, Volunteer };