import { useState, useEffect } from 'react';
import config from '../../../config';
import { Association } from '../../../interfaces';
import profileImage from "../../../images/logo/submark.png";
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineCopyAll } from "react-icons/md";
import { MdOutlineRestartAlt } from "react-icons/md";
import { MdSendAndArchive } from "react-icons/md";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import bee from '../../../images/logo/submark_black.png'
import './AffiliatedAssociations.scss';

function AffiliatedAssociations(props: any) {
    const [associationList, setAssociationList] = useState<Association[]>([]);
    const [assoToken, setAssoToken] = useState<string>("")

    useEffect(() => {
        fetch(`${config.apiUrl}/companies/listAssociations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(json => {
            const associations = json.map((association: Association) => ({
                id: association.id,
                name: association.name,
                bee: association.bee,
                profile_picture: association.profile_picture
            }));
            setAssociationList(associations);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données :', error);
        });
    }, []);

    function unLinkAssociation(id: number) {
        fetch(`${config.apiUrl}/affiliated_companies/association/` + String(id), {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res: any) => {
                if (res.status === 200) {
                    res.json().then(() => {
                        let association_list = associationList.filter((association: Association) => association.id !== id)
                        setAssociationList(association_list)
                    })
                } else {
                    alert("Erreur dans la base de données. Veuillez contactez un administrateur si le probléme persiste.")
                    window.location.href = "/";
                    window.location.reload();
                }
            })
    }

    const linkAsso = async () => {
        if (assoToken.length == 0) {
            alert("Aucun code association n'a été entré")
            return
        }
        fetch(`${config.apiUrl}/affiliated_companies/link/${assoToken}`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        ).then((res: any) => {
            if (res.status === 201) {
                alert("Vous vous êtes lié avec succès à une association")
            } else {
                alert("Une erreur est survenue lors de votre liaison à une association")
        }})
    }

    return (
        <div className="affiliated-associations">
            <h1 className="affiliated-associations-title">Associations affiliées</h1>
            <div className="referent-code">
                <div className="token-container">
                    <div className="token-label-container">
                        <p className="token-label">
                            <TextField id="filled-basic" label="s'affilier à une association" variant="filled" value={assoToken} onChange={(e) => { setAssoToken(e.target.value); }} />
                        </p>
                        <div className="icon-container">
                            <MdSendAndArchive 
                                className="icon"
                                title="envoyer le code"
                                onClick={linkAsso}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="affiliated-associations-list-header">
                {
                    (associationList.length === 0) ?
                        <p> Aucune association afffiliée pour le moment </p>
                    :
                        associationList.map((association: Association) => (
                            <div className="association-row" key={association.id}>
                              <div className="association-picture">
                                <img
                                  src={association.profile_picture !== null ? association.profile_picture : profileImage}
                                  alt="profile_picture"
                                  className="picture"
                                />
                              </div>
                              <p className="association-name">{association.name}</p>
                              <p className="association-bee-score">{association.bee}</p>
                              <img src={ bee } alt='Bee' className='bee'/>
                              <div className="association-action">
                                <MdOutlineDelete
                                  className="icon-card"
                                  title="Supprimer le référent"
                                  onClick={() => {
                                    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette association affiliée ? Cette action est irréversible.')) {
                                      unLinkAssociation(association.id);
                                    }
                                  }}
                                  size={20}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AffiliatedAssociations;