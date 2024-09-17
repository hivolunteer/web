interface Mission {
    id : number,
    title: string,
    status: number,
    location: number
}

interface Modal {
    open: boolean,
    setOpen: any,
    filteredMissions: Mission[] | [],
    setFilteredMissions: any,
    setSearch: any,
    handleClose : any,
    width: number
}

export type { Mission, Modal }