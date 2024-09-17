import { promises } from "dns";
import { useState, useEffect } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import config from "../../../config";

interface Team {
    id: number;
    name: string;
    company_id: number;
    description: string;
  }

interface m_Teams {
  team: Team;
  total_bee: number;
}

  interface Team_Member {
    id: number;
    team_id: number;
    volunteer_id: number;
    bee: number;
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
    members: Team_Member[];
    name_list: string[];
    name_list_str: string;
    ranking: number;
  }


export default function TeamRanking(props: any) {

  const [getCartouches, setCartouches] = useState<Cartouche[]>([]);
  const [getMTeams, setMTeams] = useState<m_Teams[]>([]);
  

    const getTeams = async () => {
      fetch(`${config.apiUrl}/teams/teamRanking`, {
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

    const getTeamMembers = async (m_teams : m_Teams[]) => {
      let rank = 0
      for (const curr_m_team of m_teams) {
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
        }).catch(error => {
          console.log(error);
        });
        console.log(member_list)
      }
    }

    const genCapsule = () : Cartouche => {
        let result : Cartouche = {
            name: "none",
            description: "none",
            bee: 0,
            id: 0,
            members: [],
            name_list: [],
            name_list_str: "",
            ranking: 0
        };

        return result;
    }

    useEffect(() => {
      getTeams();
      getTeamMembers(getMTeams);
    }, [])

  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Rang d'équipe</TableCell>
                <TableCell>Nom d'équipe</TableCell>
                <TableCell align="center">Bee</TableCell>
                <TableCell align="center">Membre d'équipe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getCartouches.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.ranking}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.bee}</TableCell>
                  <TableCell align="center">{row.name_list_str}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}