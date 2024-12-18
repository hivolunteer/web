export interface Volunteer {
  id: number,
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  rating: number,
  created_at: Date,
  updated_at: Date,
  profile_picture: string
}

export interface Location {
  id: number,
  street_number: number,
  street_name: string,
  street_number_suffix: string,
  street_type: string,
  departement_id: number,
  city: string,
  postal_code: number,
  created_at: Date,
  updated_at: Date,
  createdAt: Date,
  updatedAt: Date
}

export interface Mission {
  id: number,
  max_volunteers: number,
  created_at: Date,
  updated_at: Date,
  description: string,
  practical_information: string,
  start_date: Date,
  end_date: Date,
  owner_id: number,
  owner: Association | null,
  trueLocation: Location | null,
  location: number,
  title: string,
  rating: Rating | null,
  picture: string,
  theme_id: number | null,
  accept_minors: boolean,
  status: number
}

export interface Association {
  id: number,
  email: string,
  name: string,
  bee: Float32Array,
  phone: string,
  description: string,
  rating: number,
  profile_picture: string,
  rna: string,
  is_premium: boolean
}

export interface VolunteerMission {
  id: number,
  created_at: Date,
  updated_at: Date,
  volunteer_id: number,
  association_mission: number,
  close_missions: number,
}

export interface Rating {
  id: number,
  created_at: Date,
  updated_at: Date,
  volunteer_id: number,
  association_mission: number,
  stars_from_volunteer: number,
  comment_from_volunteer: string,
  stars_from_association: number,
  comment_from_association: string
}

export interface Skill {
  skill_name: string;
  skill_id: number;
  color_hex: string;
}

export interface Company {
  id: number,
  name: string,
  siren: string,
  profile_picture: string
}

export interface Team {
  id: number;
  name: string;
  company_id: number;
  description: string;
  affiliation_token: string;
}
