import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Volunteer } from '../../../../interfaces';

import ProfileDefaultPicture from "../../../../images/logo/submark.png"
import { Fragment, useEffect } from "react";

interface VolunteerCardProps {
  volunteer: Volunteer
}

export default function VolunteerCard(props: VolunteerCardProps) {

  const { volunteer } = props;

  useEffect(() => {
    if (volunteer.profile_picture === null) {
      volunteer.profile_picture = ProfileDefaultPicture
    }
  }, [volunteer]);
  
  return (
    <Fragment>
      <Card
        sx={{
          width: '100%',
          height: '100%'
        }}
      >
        <img
          src={(volunteer.profile_picture !== "NULL") ? volunteer.profile_picture : require('../../../../images/logo/submark.png').default}
          alt="profile"
          style={{
            height: '200px',
            objectFit: 'cover',
            width: '100%',
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography variant="body2" color="white">
            {volunteer.rating}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            backgroundColor: 'white',
          }}
        >
          <Typography
            variant="h6"
            component="div"
            color="#2D2A32"
            fontWeight={550}
            marginBottom={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {volunteer.first_name} {volunteer.last_name}
          </Typography>
        </CardContent>
        <CardActions>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '5px'
            }}
          >
            <Button
              size="small"
              color="primary"
              href={`/volunteer/${volunteer.id}`}
              variant="contained"
              sx={{
                color: 'white'
              }}
            >
              Voir le profil
            </Button>
          </div>
        </CardActions>
      </Card>
    </Fragment>
  )
}