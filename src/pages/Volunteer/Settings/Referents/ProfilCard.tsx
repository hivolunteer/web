import React, { useState } from 'react';
import { Avatar, Button, Divider, Link, Modal, Typography } from '@mui/material';
import './ProfilCard.scss';
import config from '../../../../config';
import { Association } from '../../../../interfaces';
import { Box } from '@mui/system';

interface AssociationProfilCardProps extends React.HTMLAttributes<HTMLDivElement> {
    association: Association;
    onDeleteReferent: (id: number) => void;
}


function AssociationProfilCard({ className, association, onDeleteReferent, ...props }: AssociationProfilCardProps) {

    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDissociate = () => {
        let url = `${config.apiUrl}/referent/volunteer/${association.id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response) => {
            if (response.status === 201) {
                console.log('Dissociation success');
                onDeleteReferent(association.id);
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    return (
        <div className="association-referent-card">
            <Avatar className="association-referent-card__avatar" src={association.profile_picture} alt="Avatar" />
            <div className="association-referent-card__content">
                <p className="association-referent-card__name">
                    <Link href={`/association/${association.id}`}>{association.name}</Link>
                </p>
                <p className="association-referent-card__role">
                    {association.description.split(' ').slice(0, 30).join(' ')}...
                </p>
            </div>
            <div className="association-referent-card__settings" onClick={handleOpenModal}>Dissocier</div>
            <div className="association-referent-card__modal">
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            //border: '2px solid #000',
                            boxShadow: 24,
                            p: 2,
                            borderRadius: '10px',
                        }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Se dissocier de l'association
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <p className='association-referent-modal-description'>
                            Êtes-vous sûr de vouloir rompre votre lien avec l'association {association.name} ?
                            </p>
                        </Typography>
                        <Divider />
                        <div className='association-referent-modal-buttons'>
                            <Button onClick={handleCloseModal} style={{ color: 'blue' }}>Annuler</Button>
                            <Button onClick={handleDissociate} style={{ color: 'red' }}>Dissocier</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default AssociationProfilCard;