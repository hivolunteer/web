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

interface Team {
    id: number;
    name: string;
    company_id: number;
    description: string;
  }

  interface Team_Member {
    id: number;
    team_id: number;
    volunteer_id: number;
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

    const getTeams = () : Team[] | any => {

    }

    const getTeamMembers = () : Team_Member[] | any => {

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

  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Rang d'équipe</TableCell>
                <TableCell>Nom d'équipe</TableCell>
                <TableCell align="right">Bee</TableCell>
                <TableCell align="right">Membre d'équipe</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getCartouches.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">{row.ranking}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.bee}</TableCell>
                  <TableCell align="right">{row.name_list_str}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}