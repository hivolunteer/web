import React, { useState, useEffect } from 'react';
import './AssociationReferent.scss';
import config from '../../../../config';

import AssociationProfilCard from './ProfilCard';
import { Association } from '../../../../interfaces';
import { Alert, Button, Divider, TextField } from '@mui/material';

function AssociationReferent() {
  const [referents, setReferents] = useState<Association[]>([]);
  const [response, setResponse] = useState<{ error: Boolean, message: string }>({ error: false, message: '' });

  const handleDissociate = (idAssociation: number) => {
    if (idAssociation !== -1) {
      referents.splice(referents.findIndex((referent) => referent.id === idAssociation), 1);
      setReferents([...referents]);
    }
  };

  useEffect(() => {
    fetch(`${config.apiUrl}/referent/volunteer`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setReferents(data)
        })
      }
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponse({ error: false, message: '' });
    }, 5000);
    return () => clearTimeout(timer);
  }, [response]);

  async function onAssociationReferentSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    console.log("Token: ", form.referent_token.value);
    const url = `${config.apiUrl}/referent/volunteer/${form.referent_token.value}`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          setReferents([...referents, data]);
          setResponse({ error: false, message: 'Vous êtes maintenant référent pour l\'association ' + data.name });
        });
      } else if (response.status === 404) {
        setResponse({ error: true, message: 'Le code de référent est incorrect ou a expiré' });
      } else {
        setResponse({ error: true, message: 'Une erreur est survenue. Veuillez réessayer plus tard' });
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div style={{ marginTop: '20px', marginLeft: '10px' }}>
      <p className="association-referent-title"> Association référent </p>
      <p className="association-referent-description">En tant que référent, vous pouvez être associé à une ou plusieurs associations. Vous pouvez également devenir référent pour une association.</p>
      <div className="association-referent-container">
        <p className="association-referent-subtitle"> Devenir référent </p>
        <form className="association-referent-list" onSubmit={onAssociationReferentSubmit}>
          <div className='association-referent-form'>
            <TextField
              id="referent_token"
              label="Code de référent"
              placeholder="xke301203je3"
              type="text"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              required
            />
            <Button type="submit" variant="contained" color="primary">Valider</Button>
          </div>
        </form>
        {(response.message !== "") && (
          <Alert severity={response.error ? 'error' : 'success'} style={{ marginTop: '10px', maxWidth: '40rem' }}>
            {response.message}
          </Alert>
        )}
      </div>
      <div className="association-referent-container">
        <p className="association-referent-subtitle"> Liste des associations </p>
        {referents.length === 0 ? (
          <p>Pas d'affiliation pour le moment</p>
        ) : (
          <>
            <div className="association-referent-list">
              {referents.map((referent: Association) => (
                <>
                  <AssociationProfilCard key={referent.id} association={referent} onDeleteReferent={handleDissociate} />
                  <Divider />
                </>
              ))}
            </div>
            <div className="association-referent-description" style={{ marginTop: '20px' }}>
              <p>
                Si vous vous dissociez, vous ne pourrez plus être référent pour cette association et les missions sur lesquelles vous êtes référent vous seront retirées.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AssociationReferent;