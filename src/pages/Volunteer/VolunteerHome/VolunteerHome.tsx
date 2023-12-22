import "./VolunteerHome.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from "@mui/material/Box";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MissionImage from '../../../images/mission_photo.png';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function VolunteerHome(props: any) {
  const [missionList, setMissionList] = useState<Number[]>([]);    
  const [search, setSearch] = useState<string>('');
  
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const [subType, setSubType] = React.useState("Association");
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:8000/missions/association', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        //if (response.status === 200) {
        //    response.json().then((data) => {
        //        let mission_list : Number[] = [];
        //        data.missions.map((mission: any) => {
        //            mission_list.push(mission.association_mission)
        //        })
        //        setMissionList(mission_list)
        //    })
        //}
    })
  }, [])

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  }

  return (
    <div className="page-container">
        <div className="search-filter">
            <div className="search-bar-container">
                <TextField
                    id="search-bar"
                    style={{flex: 4}}
                    label="Recherche par titre de l’association ou de la mission"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                        ),
                }}
                variant="outlined"
                sx={{
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '10px',            }}
                />
                <div className="search-loc"/>
                <TextField id="outlined-basic" label="Ville, Pays" variant="outlined" onChange={() => {}} className="search-country"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <PlaceOutlinedIcon />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: '10px',
                }}
                />
                <div className="search-button" />
                  <button className="search-btn" onClick={() => {}}>
                    Rechercher
                  </button>
            </div>
        </div>
        <div className="centered-container">
            <div className="filter">
                <button className="filter-btn" onClick={() => {}}>
                    Afficher les filtres
                </button>
            </div>
            <Box sx={{ display: "center" }}>
                <Box className="mask-box">
                    <Box
                      className="mask"
                      style={{
                        transform: `translateX(${subType === "Bénévole" ? 0 : "200px"})`
                      }}
                    />
                    <Button
                      disableRipple
                      variant="text"
                      sx={{ color: subType === "Bénévole" ? "#ffffff" : "#5316AE" }}
                      onClick={() => setSubType("Bénévole")}
                      onChange={() => handleChange}
                    >
                      Bénévole
                    </Button>
                    <Button
                      disableRipple
                      variant="text"
                      sx={{ color: subType === "Association" ? "#ffffff" : "#5316AE" }}
                      onClick={() => setSubType("Association")}
                      onChange={() => handleChange}
                      value="checked"
                    >
                      Association
                    </Button>
                </Box>
            </Box>
        </div>
        <div className="mission-list">
          <Card className="card" sx={{ maxWidth: 310 }}>
            <CardMedia
              component="img"
              alt="Pas d'image"
              height="250"
              image={MissionImage}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
    </div>
  );    
};      

export default VolunteerHome;
