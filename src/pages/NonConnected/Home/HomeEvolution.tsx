import "./Home.scss";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import LanguageIcon from '@mui/icons-material/Language';
import SpeakerPhoneIcon from '@mui/icons-material/SpeakerPhone';

import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
  }));  


function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    const icons: { [index: string]: React.ReactElement } = {
      1: <EmojiObjectsIcon />,
      2: <FormatPaintIcon />,
      3: <LaptopChromebookIcon />,
      4: <SmartphoneIcon />,
      5: <LanguageIcon />,
      6: <SpeakerPhoneIcon />,
    };
  
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

function HomeEvolution() {
    const steps = [
        "Création du projet",
        "Design de l'interface",
        "Développement du site web",
        "Développement de l'application mobile",
        "Publication du site web",
        "Publication de l'application mobile",
    ];

    return (
        <Box className="home-evolution-container">
            <p className="home-evolution-title">
                Où en sommes nous ?
            </p>
            <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />} style={{ flexDirection: window.innerWidth < 600 ? 'column' : 'row' }}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default HomeEvolution;