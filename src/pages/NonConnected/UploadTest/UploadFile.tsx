import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Form } from 'react-router-dom';
import config from '../../../config';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function InputFileUpload() {
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log("FORMDATA = ", formData);
    console.log("FORMDATA FILE = ", formData.get('file'));
    const response = await fetch(`${config.apiUrl}/uploads/${localStorage.getItem('role')}/profile`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
    });
    const data = await response.json();
    console.log(data);
  }

  async function onDelete(event: React.SyntheticEvent) {
    event.preventDefault();
    const response = await fetch(`${config.apiUrl}/uploads/${localStorage.getItem('role')}/profile`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <form onSubmit={onSubmit}>
          <input type="file" name="file" id="file" accept="image/*" />
          <Button type="submit" variant="contained" color="primary" style={{marginLeft: '10px'}}>Submit</Button>
      </form>
      <Button variant="contained" color="error" style={{marginLeft: '10px'}} onClick={onDelete}>
        Supprimer
      </Button>
    </div>
  );
}


export default InputFileUpload;