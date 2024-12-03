import { Fragment, useEffect, useState } from "react";
import config from "../../../config";
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Icon, Typography } from "@mui/material";
import Grid from '@mui/material/Grid'; // remplacer par Grid2
import { Link } from "react-router-dom";
import { EmojiEventsOutlined, EmojiNatureOutlined, Groups2Outlined, HiveOutlined, Person } from "@mui/icons-material";

// Icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';




interface IEmployeesList {
  id: number;
  name: string;
  profile_picture: string;
  bee: number;
  team: {
    id: number;
    name: string;
  };
}

interface IEmployeeRankingInfo {
  nb_followers: number;
  nb_participation: number;
}

const getInitials = (string: string) =>
  string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')

function RowAction({ volunteerId, teamId }: { volunteerId: number, teamId: number }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
      <Link to={`/volunteer/${volunteerId}`} style={{ textDecoration: 'none' }}>
        <VisibilityIcon sx={{ color: '#67A191', cursor: 'pointer', fontSize: 20, mr: 2 }} />
      </Link>
      <Link to={`/team/${teamId}`} style={{ textDecoration: 'none' }}>
        <GroupsIcon sx={{ color: '#67A191', cursor: 'pointer', fontSize: 20, mr: 2 }} />
      </Link>
      <Link to={`/volunteer/${volunteerId}`} style={{ textDecoration: 'none' }}>
        <DeleteIcon sx={{ color: '#67A191', cursor: 'pointer', fontSize: 20 }} />
      </Link>
    </Box>
  )
}

function HorizontalInfoGrid({ nb_followers, nb_participation}: { nb_followers : number, nb_participation : number}) {
  return (
    <Fragment>
      <Grid item xs={6} md={3} sm={6}>
        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
          <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography sx={{ mb: 1, color: 'bleu' }}>
                Nombre de followers
              </Typography>
              <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="h4">
                  {nb_followers}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: 60, height: 60, bgcolor: '#b8942121', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1.5 }}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: '#b8942100' }}>
                <PeopleAltOutlinedIcon sx={{ fontSize: 50, color: '#b89421' }} /> 
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6} md={3} sm={6}>
        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
          <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography sx={{ mb: 1, color: 'bleu' }}>
                Nombre de participations
              </Typography>
              <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="h4">
                  {nb_participation}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: 60, height: 60, bgcolor: '#99cae921', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1.5 }}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: '#99cae900' }}>
                <EmojiPeopleOutlinedIcon sx={{ fontSize: 50, color: '#99cae9' }} />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Fragment>
  )
}

function EmployeeRanking({ nb_followers, nb_participation}: { nb_followers : number, nb_participation : number}) {

  const [employeesList, setEmployeesList] = useState<IEmployeesList[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 20 })

  console.log(nb_followers)
  console.log(nb_participation)
  return (
    <div style={{ padding: 10}}>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Grid container spacing={3} sx={{ justifyContent: 'center'}}>
            <HorizontalInfoGrid nb_followers={nb_followers} nb_participation={nb_participation}/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default EmployeeRanking;