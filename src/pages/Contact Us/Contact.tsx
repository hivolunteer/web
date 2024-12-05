import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import Textfield from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import { SvgIconComponent } from '@mui/icons-material'
import emailjs from '@emailjs/browser'
import Alert from '@mui/material/Alert'

// emailjs.send("hivolunteer_test_contact","template_lgxy3pv",{
//     user_type: "association",
//     user_id: "2",
//     message: "Blabla",
//     });

const StyledBox1 = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  borderRadius: '10px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.action.hover
}))

const StyledBox2 = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  borderRadius: '10px',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(6),
  backgroundColor: theme.palette.action.hover,
}))

interface IconWithBackgroundProps {
  IconComponent: SvgIconComponent;
}

const IconWithBackground: React.FC<IconWithBackgroundProps> = ({ IconComponent }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50, // Taille du carré
        height: 50, // Taille du carré
        backgroundColor: '#bfe9de', // Couleur de fond
        borderRadius: 2, // Pour un carré avec des coins légèrement arrondis
        color: '#67A191'
      }}
    >
      <IconComponent />
    </Box>
  );
};



const ContactUs = () => {

  const [response, setResponse] = useState<{ error: boolean, message: string }>({ error: false, message: '' });


  const sendEmail = (e: any) => {
    e.preventDefault();

    const mailParams: any = {
      user_type: localStorage.getItem('role'),
      user_id: localStorage.getItem('id'),
      user_mail: e.target.elements.email.value,
      message: e.target.elements.message.value,
    }

    emailjs
      .send('hivolunteer_test_contact', 'template_test_contact', mailParams, {
        publicKey: 'yuUDVlqNJ9dJHLSSm',
      })
      .then(
        (response) => {
          setResponse({ error: false, message: 'Votre message a bien été envoyé !' });
        },
        (err) => {
          setResponse({ error: true, message: 'Une erreur s\'est produite, veuillez réessayer plus tard.' });
        },
      );

    e.target.reset();

  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setResponse({ error: false, message: '' });
    }, 5000);
    return () => clearTimeout(timer);
  }, [response]);


  return (
    <>
      <Container sx={{ padding: '2rem' }}>
        <Box sx={{ mt: 7, textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontWeight: 600, mb: 5, fontSize: '2.5rem' }}>
            Contactez-nous
          </Typography>
          {/* <CustomChip rounded size='small' skin='light' color='primary' label='Question' /> */}
          <Typography variant='h4' sx={{ my: 2, fontSize: '1.5rem' }}>
            Vous avez une question ? une remarque ? un problème ?
          </Typography>
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            Si vous n'avez pas trouvé la réponse à votre question dans la section
            <a href="/faq" style={{ color: '#67A191', textDecoration: 'none', fontWeight: 500 }}> FAQ </a>
            ou si vous avez besoin d'aide supplémentaire, n'hésitez pas à nous contacter.
          </Typography>

          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <StyledBox1>
                <IconWithBackground IconComponent={LocalPhoneOutlinedIcon} />
                <Typography sx={{ color: 'text.secondary', mt: 1, mb: 2 }}>En semaine de 10h à 17h</Typography>
                <Typography
                  variant='h4'
                  component="a"
                  href="tel:+1234567890"
                  onClick={e => e.preventDefault()}
                  sx={{ mb: '4.5em', textDecoration: 'none', color: '#67A191', mt: '2rem' }}
                >
                  +123 456 7890
                </Typography>
              </StyledBox1>
            </Grid>

            <Grid item xs={12} md={6}>
              <StyledBox2>
                <IconWithBackground IconComponent={MailOutlineIcon} />
                <Typography sx={{ color: 'text.secondary', mt: 1 }}>Écrivez-nous et nous vous répondrons dans les plus brefs délais</Typography>
                <form onSubmit={sendEmail}>
                  <Textfield
                    id="outlined-basic"
                    name="email"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    placeholder="Votre adresse e-mail"
                    fullWidth
                  />
                  <Textfield
                    id="outlined-basic"
                    name="message"
                    variant="outlined"
                    placeholder="Votre message"
                    multiline
                    rows={2}
                    fullWidth
                    sx={{ mt: 2 }}
                  />
                  <Button variant="contained" type="submit" color="primary" sx={{ mt: 2, textTransform: 'none', color: 'white' }}>
                    Envoyer !
                  </Button>
                </form>
                {
                  response.message && (
                    <Alert severity={response.error ? "error" : "success"}>
                      {response.message}
                    </Alert>
                  )
                }
              </StyledBox2>
            </Grid>
          </Grid>
        </Box>
      </Container></>
  );
};

export default ContactUs;
