import React, { useEffect, useState } from "react";
import { Alert, Snackbar, Box, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthenticationService } from "../../../services/authentication.service";
import "./ValidateEmail.scss";
import titleLogo from "../../../images/logo/primary_logo.png";
import AutohideSnackbar from "../../../components/SnackBar";
import config from "../../../config";
import { Volunteer } from "../../../interfaces";
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

export default function ValidateEmail() {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState<boolean>(false);
  const [stat, setstat] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const email = searchParams.get("email");

  const sendValidateEmailRequest = () => {
    fetch(`${config.apiUrl}/volunteers/validateEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        email: email
      }),
    }).then((response) => {
      setstat(response.status)
      if (response.status === 201) {
        response.json().then((data) => {
          localStorage.setItem("role", "volunteer");
          localStorage.setItem('token', data.token);
          localStorage.setItem('color_blind', 'false');
          localStorage.setItem('id', data.id);
          setIsSent(true);
          navigate("/");
          window.location.reload();
        });
      } else {
        alert("ERROR FETCHING VERIFY EMAIL : " + JSON.stringify(response.body));
      }
    }).catch((error) => {
      console.warn(error);
    });
  }

  useEffect(() => {
    sendValidateEmailRequest();
  }, [])

  return(
    <div>
      <h1>Compte Validé !</h1>
    </div>
  );
}
