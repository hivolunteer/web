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

function setType(role: string) {
  if (role === "association" ||role === "volunteer") {
    return role + "s";
  }
  return "companies";
}

export default function ValidateEmail() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const email = searchParams.get("email");
  const role = searchParams.get("role");
  const type = setType(role as string);

  const sendValidateEmailRequest = () => {
    fetch(`${config.apiUrl}/${type}/validateEmail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        email: email
      }),
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((data) => {
          localStorage.setItem("role", "volunteer");
          localStorage.setItem('token', data.token);
          localStorage.setItem('color_blind', 'false');
          localStorage.setItem('id', data.id);
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
