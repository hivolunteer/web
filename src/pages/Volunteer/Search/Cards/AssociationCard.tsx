import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState, useEffect, Fragment, useCallback } from 'react';
import StarIcon from '@mui/icons-material/Star';
import config from '../../../../config';
import FollowButton from './FollowButton';

export default function AssociationCard(props: { association_id: number }) {

  const [association, setAssociation] = useState<Association | undefined>(undefined);
  const [isFollowing, setIsFollowing] = useState(false);

  interface Association {
    id: number,
    name: string,
    profile_picture: string,
    description: string,
    rating: number
  }

  const handleFollow = useCallback(async () => {
    try {
      await fetch(`${config.apiUrl}/follows/`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            setIsFollowing(false);
            data.forEach((follow: any) => {
              if (follow.association_id === props.association_id) {
                setIsFollowing(true);
                return;
              }
            })
          })
        }
      })
    } catch (error) {
      console.error('Error following association', error);
    }
  }, [props.association_id]);

  useEffect(() => {
    fetch(`${config.apiUrl}/associations/profile/${props.association_id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setAssociation(data.association)
        })
      }
    })
    handleFollow();
  }, [props.association_id, handleFollow]);

  return (
      <Fragment>
        <Card sx={{ width: '100%', height: '100%', borderColor: 'pink', borderRadius: '5px' }} onClick={() => (window.location.href = 'association/' + association?.id)}>
          <CardMedia
            component="img"
            height="185"
            image={association?.profile_picture ? association?.profile_picture : "d "}
            alt="Association logo"
          />
          <CardContent sx={{ backgroundColor: "rgba(0, 0, 0, 0.70)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="body2" color="white">
              {association?.rating}
            </Typography>
            <StarIcon sx={{ color: '#FFD700', marginLeft: '5px' }} />
          </CardContent>
          <CardContent sx={{ backgroundColor: 'white', minHeight: '100px', maxHeight: '100px' }}>
            <Typography variant="h6" component="div" color="#2D2A32" fontWeight={550} marginBottom={1} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              {association?.name}
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
              {association?.description}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
            <FollowButton isFollowing={isFollowing} onFollow={handleFollow} associationId={association?.id ?? 0} />
          </CardContent>
        </Card>
      </Fragment>
  )
}