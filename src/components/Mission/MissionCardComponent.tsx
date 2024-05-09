import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Mission {
    id: number,
    title: string,
    description: string,
    start_date: string,
    end_date: string,
    picture: string,
    association_name: string,
    location_city: string
}

function MissionCard(props: { mission: Mission }) {
    const mission = props.mission

    const findDay = (date: string | undefined) => {
        if (!date)
            return;
        let day = date.slice(8, 10);
        let month = date.slice(5, 7);
        let year = date.slice(0, 4);
        return `${day}.${month}.${year}`
    }

    const findHour = (date: string | undefined) => {
        if (!date)
            return;
        let hour = date.slice(11, 13);
        let minute = date.slice(14, 16);
        return (minute === '00') ? `${hour}h` : `${hour}h${minute}`;
    }

    const findLocation = (location: string | undefined) => {
        if (!location)
            return "";
        return ("| " + location);
    }

    return (
        <div>
            <Card sx={{width: '100%', height: '100%'}}>
                <CardMedia
                    component="img"
                    height="185"
                    image={mission?.picture ? mission?.picture : "d "}
                    alt="Association logo"
                />
                <CardContent sx={{backgroundColor: "rgba(0, 0, 0, 0.70)", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Typography variant="body2" color="white">
                        {findDay(mission?.start_date)} {findHour(mission?.start_date)} - {findHour(mission?.end_date)} {findLocation(mission?.location_city)}
                    </Typography>
                </CardContent>
                <CardContent sx={{backgroundColor: 'white', minHeight: '100px', maxHeight: '100px'}}>
                    <Typography variant="h6" component="div" color="#2D2A32" fontWeight={550} marginBottom={1} sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        {mission?.title}
                    </Typography>
                    <Typography variant="body2" display="inline-block" style={{
                                                                    width: '100%',
                                                                    display: 'block',
                                                                    whiteSpace: 'normal',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    lineHeight: '1.4em',
                                                                    maxHeight: '5.6em',
                                                                    position: 'relative'
                                                                    }}>
                        {mission?.description}
                    </Typography>
                </CardContent>
                <CardContent>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                            <a style={{ fontWeight: "normal" }}>Par</a> {mission.association_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', cursor: 'pointer', textDecoration: 'underline'}}
                        onClick={() => (window.location.href = 'mission/' + mission?.id)}>
                            Voir plus
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default MissionCard;