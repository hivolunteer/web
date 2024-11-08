import React, { useState, useEffect } from 'react';
import InputFileUpload from './UploadFile';
import config from '../../../config';

function UploadTest() {
    const [associationPicture, setAssociationPicture] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${config.apiUrl}/uploads/${localStorage.getItem('role')}/profile/1`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        }).then((response) => {
            console.log(response);
            response.blob()
                .then((blob) => {
                    const objectUrl = URL.createObjectURL(blob);
                    setAssociationPicture(objectUrl);
                    console.log(objectUrl);
                })
                .catch((error) => {
                console.error(error);
                });
        });
    }, []);

    return (
        <div>
            <h1>Upload Test</h1>
            <p>Upload a profile picture</p>
            { localStorage.getItem('role') === 'association' ? <p>Association</p> : <p>Volunteer</p> }
            <InputFileUpload/>
            <p>Upload a mission picture</p>
            { associationPicture ?
                <img src={associationPicture} alt="Association profile" />
                : <p>No picture</p>
            }
        </div>
    );
}

export default UploadTest;

/**
import React, { useEffect, useState } from 'react';

interface ImageDisplayProps {
  id: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ id }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/profile/${id}`)
      .then((response) => response.blob())
      .then((blob) => {
        const objectUrl = URL.createObjectURL(blob);
        setImageUrl(objectUrl);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return <img src={imageUrl} alt="Profile" />;
};

export default ImageDisplay;

 */