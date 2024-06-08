import { Rating } from "../../../interfaces"

interface Mission {
    id : number,
    title: string,
    status: number,
    location: number
}

interface Association {
    id: number,
    name: string,
    rating: number
}

interface Modal {
    open: boolean,
    setOpen: any,
    filteredMissions: Mission[] | [],
    setFilteredMissions: any,
    setSearch: any,
    handleClose : any,
    width: number,
    setSearchMission: any
}

interface ModalAsso {
    open: boolean,
    setOpen: any,
    filteredAssociations: Association[] | [],
    setFilteredAssociations: any,
    handleClose : any,
    width: number,
    setSearchAssociation: any
}

interface Skill {
    id: number,
    skill_name: string,
    color_hex: string
}

interface MissionComplete {
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
    theme_id: number,
    accept_minors: boolean,
    status: number
}

interface PageMission {
    missions: Array<MissionComplete>;
    page: number;
}

interface FilterMissionProps {
    missionList: Array<MissionComplete>;
    filteredMissions: Array<MissionComplete>;
    search: string;
    location_search: string;
    locations: {[key: number]: string};
    searched: boolean
}

export type { Mission, Modal, ModalAsso, Skill, Association, PageMission, MissionComplete, FilterMissionProps }