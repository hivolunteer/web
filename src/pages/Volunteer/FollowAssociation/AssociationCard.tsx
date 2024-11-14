import Card from 'react-bootstrap/Card';
import { CardMedia } from '@mui/material';
import { useEffect, useState } from 'react';
import config from '../../../config';
import FollowButton from '../Search/Cards/FollowButton';

function AssociationCard(props: {id: number}) {

    let [associationPicture, setAssociationPicture] = useState<string>('')
    let [association, setAssociation] = useState<any>({})
    const [isFollowing, setIsFollowing] = useState(true);

    useEffect(() => {
        fetch(`${config.apiUrl}/associations/profile/` + props.id, {
            method: 'GET',
            headers:
            {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then((response: any) => {
            if (response.status === 200) {
                response.json().then((data: any) => {
                    setAssociation(data.association)
                    setAssociationPicture(data.association.profile_picture)
                })
            }
        })
    }, [props.id])

    const handleFollow = async () => {
        try {
            await fetch(`${config.apiUrl}/follows`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ association_id: association?.id }),
            });
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error following association', error);
        }
        setIsFollowing(!isFollowing);
      };

    return (
        <Card
            style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0px 5px 5px -5px #2d2a32',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFEFF'
            }}
        >
            <Card.Body style={{width: '100%'}}>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <div style={{flex: 1, margin: '10px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <CardMedia
                            component="img"
                            style={{borderRadius: '100%', objectFit: 'cover', height: '150px', width: '150px'}}
                            image={(associationPicture === '') ? 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' : associationPicture}
                            alt="association picture"
                        />
                    </div>
                    <div style={{display: 'flex', flex: 2, margin: '10px 20px', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                        <h1>
                            {association?.name}
                        </h1>
                    </div>
                    <FollowButton associationId={association.id} isFollowing={isFollowing} onFollow={handleFollow} />

                </div>
            </Card.Body>
        </Card>
    )
}

export default AssociationCard