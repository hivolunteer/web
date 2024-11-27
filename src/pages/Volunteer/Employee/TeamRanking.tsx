import { promises } from "dns";
import { useState, useEffect } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Box } from "@mui/material";
import Paper from '@mui/material/Paper';

import config from "../../../config";
import { Team } from "../../../interfaces";

interface m_Teams {
  team: Team;
  total_bee: number;
}

  interface m_Teams_Member {
    last_name: string;
    first_name: string;
    email: string;
    id: number;
    bee: number;
  }

  interface Cartouche {
    name: string
    description: string
    bee: number
    id: number;
    members: m_Teams_Member[];
    name_list: string[];
    name_list_str: string;
    ranking: number | string;
  }


  function Row(props: { row: Cartouche}) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    let bgColor = "#FFFFFF"
    if (row.ranking == 1) {
      //bgColor = "#e7c300"
      row.ranking = "🥇"
    }
    if (row.ranking == 2) {
      //bgColor = "silver"
      row.ranking = "🥈"
    }
    if (row.ranking == 3) {
      //bgColor = "#cd7f32"
      row.ranking = "🥉"
    }

    return (
      <React.Fragment>
      <TableRow style={{backgroundColor: bgColor}} sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="large"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
          <TableCell align="center">
            <Typography variant="h4">
              {row.ranking}
            </Typography>
            </TableCell>
          <TableCell component="th" scope="row" align="center">
            {row.name}
          </TableCell>
          <TableCell align="center">{row.bee}</TableCell>
          <TableCell align="center">{row.name_list_str}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography gutterBottom component="div">
                {row.description}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nom</TableCell>
                    <TableCell align="center">Prénom</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell component="th" scope="row" align="center">
                        {member.last_name}
                      </TableCell>
                      <TableCell align="center">{member.first_name}</TableCell>
                      <TableCell align="center">{member.email}</TableCell>
                      <TableCell align="center">
                        {member.bee}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
    );
  }
  

export default function TeamRanking(props: any) {

  const [getCartouches, setCartouches] = useState<Cartouche[]>([]);
  const [getMTeams, setMTeams] = useState<m_Teams[]>([]);
  const [called, setCalled] = useState<boolean>(true);
  

    const getTeams = async () => {
      fetch(`${config.apiUrl}/teams/employee/teamRanking`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(response => response.json()).then(data => {
        console.log(data);
        
        setMTeams(data);
      }).catch(error => {
        console.log(error);
      });

    }

    const getTeamMembers = async () => {
      if (called == true) {
        return;
      }
      setCalled(true)
      setCartouches([])
      let rank = 0

      for (const curr_m_team of getMTeams) {
        rank += 1;
        let cartouche = {
          name: curr_m_team.team.name,
          description: curr_m_team.team.description,
          bee: curr_m_team.total_bee,
          id: curr_m_team.team.id,
          members: [],
          name_list: [],
          name_list_str: "",
          ranking: rank
        };

        let team_id = curr_m_team.team.id

        const member_list = await fetch(`${config.apiUrl}/teams/getTeamMembers/${team_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }).then(response => response.json()).then(data => {
          console.log(data);
          cartouche.members = data.member_list
          for (let i = 0; i < data.member_list.length; i += 1) {
            if ((i + 1) >= data.member_list.length) {
              cartouche.name_list_str += data.member_list[i].first_name
            } else {
              cartouche.name_list_str += data.member_list[i].first_name + ", "
            }
          }
          setCartouches(getCartouches => [...getCartouches, cartouche])
          
        }).catch(error => {
          console.log(error);
        });
      }
      
    }

    
    
    useEffect(() => {
      getTeams();
      setCalled(false);
    }, [])
    
    useEffect(() => {    
        getTeamMembers()
    }, [getMTeams])

  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Détails</TableCell>
                <TableCell align="center">Rang d'équipe</TableCell>
                <TableCell align="center">Nom d'équipe</TableCell>
                <TableCell align="center">Bee</TableCell>
                <TableCell align="center">Membre d'équipe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getCartouches.map((row) => (
                <Row key={row.name} row={row}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}