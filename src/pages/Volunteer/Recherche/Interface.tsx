interface Mission {
    id : number
    title: string,
}

interface Modal {
    open: boolean,
    setOpen: any,
    handleClose : any,
    filteredMissions: Mission[] | [],
    setFilteredMissions: any,
}

interface Skill {
    id: number,
    skill_name: string,
    color_hex: string
}

export type {Mission, Modal, Skill}