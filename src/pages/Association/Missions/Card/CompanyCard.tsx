import { Button, Card, CardActions, CardMedia, Typography } from "@mui/material";

function CompanyCard(props: {
    company: {
        id: number;
        profile_picture: string;
        name: string;
    },
    selectCompany: (company: { id: number, name: string, profile_picture: string }) => void;
    deleteOption: boolean;
    delete: () => void;
}) {
    return (
        <Card 
            sx={{ maxWidth: 200, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer',
                '&:hover': {
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
                },
             }}
             onClick={() => {
                if (!props.deleteOption) {
                    props.selectCompany(props.company);
                }
             }}
        >
            <CardMedia
                component="img"
                sx={{
                    height: { xs: '100px', sm: '150px' },
                    width: { xs: '100px', sm: '150px' },
                    borderRadius: '50%',
                    objectFit: 'cover',
                    mb: 2,
                }}
                image={props.company.profile_picture}
                alt="Company"
            />
            <Typography variant="h6" component="div" color="#2D2A32" fontWeight={550} mb={1} sx={{ textAlign: 'center' }}>
                {props.company.name}
            </Typography>
            {
                props.deleteOption && (
                    <CardActions sx={{ mt: 2 }}>
                        <Button onClick={props.delete} size="small" color="primary" variant="contained">
                            Supprimer
                        </Button>
                    </CardActions>
                )
            }
        </Card>
    )
}

export default CompanyCard;