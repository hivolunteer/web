interface Mission {
    id : number
    title: string,
}

interface Association {
    id: number,
    name: string,
}

interface MissionModal {
    open: boolean,
    setOpen: any,
    handleClose : any,
    filteredMissions: Mission[] | [],
    setFilteredMissions: any,
}

interface AssociationModal {
    open: boolean,
    setOpen: any,
    handleClose : any,
    filteredAssociations: Association[] | [],
    setFilteredAssociations: any,
}

interface Skill {
    id: number,
    skill_name: string,
    color_hex: string
}

export type {Mission, MissionModal, Skill, Association, AssociationModal}