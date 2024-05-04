import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Referent } from "../Interface/Referent"

interface ReferentCardProps {
    referent: Referent;
    selectReferent: (referent: Referent) => void;
    removeReferent: (referent: Referent) => void;
    selected: boolean;
}

function ReferentCard(props: ReferentCardProps) {
    return (
        <Card sx={{ maxWidth: 200, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia
          component="img"
          sx={{
            height: { xs: '100px', sm: '150px' },
            width: { xs: '100px', sm: '150px' },
            borderRadius: '50%',
            objectFit: 'cover',
            mb: 2,
          }}
          image={props.referent.profile_picture}
          alt="Referent"
        />
        <Typography variant="h6" component="div" color="#2D2A32" fontWeight={550} mb={1}>
          {props.referent.complete_name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ width: '100%', textAlign: 'center' }}>
          {props.referent.email}
        </Typography>
        <CardActions sx={{ mt: 2 }}>
          {props.selected ? (
            <Button onClick={() => props.removeReferent(props.referent)} size="small" color="primary" variant="contained">
              Remove
            </Button>
          ) : (
            <Button onClick={() => props.selectReferent(props.referent)} size="small" color="primary" variant="contained">
              Select
            </Button>
          )}
        </CardActions>
      </Card>
    );
  }

export default ReferentCard