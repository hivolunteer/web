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
    handleClose : any
}

interface ModalAsso {
    open: boolean,
    setOpen: any,
    filteredAssociations: Association[] | [],
    setFilteredAssociations: any,
    handleClose : any
}

interface Skill {
    id: number,
    skill_name: string,
    color_hex: string
}

export type { Mission, Modal, ModalAsso, Skill, Association }