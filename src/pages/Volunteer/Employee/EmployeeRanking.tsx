import { Fragment, useEffect, useState } from "react";
import config from "../../../config";
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Icon, Typography } from "@mui/material";
import Grid from '@mui/material/Grid'; // remplacer par Grid2
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Link } from "react-router-dom";
import { Person } from "@mui/icons-material";

// Icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';




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
  nb_employees: number;
  employee_rank: number;
  nb_page: number;
}

const getInitials = (string: string) =>
  string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')

const colums: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Employé',
    type: 'string',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={params.row.profile_picture} sx={{ mr: 2.5, width: 38, height: 38, fontWeight: 500 }} alt={params.row.name}>
          {getInitials(params.row.name)}
        </Avatar>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
          <Typography
            noWrap
            component={Link}
            to={`/volunteer/${params.row.id}`}
            sx={{
              fontWeight: 500,
              textDecoration: 'none',
              color: 'black',
              '&:hover': { color: '#67A191' }
            }}
          >
            {params.row.name}
          </Typography>
        </Box>
      </Box>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'team',
    headerName: 'Équipe',
    type: 'string',
    renderCell: (params) => (
      <Typography
        noWrap
        component={Link}
        to={`/team/${params.row.team.id}`}
        sx={{
          fontWeight: 500,
          textDecoration: 'none',
          textAlign: 'center',
          color: 'black',
          '&:hover': { color: '#67A191' }
        }}
      >
        {params.row.team.name}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'nb_missions',
    headerName: 'Nombre de missions',
    type: 'number',
    renderCell: (params) => (
      <Typography
        noWrap
        sx={{
          fontWeight: 500,
          textAlign: 'center',
          color: 'black'
        }}
      >
        {params.row.nb_missions}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'bee',
    headerName: 'Bee',
    type: 'number',
    renderCell: (params) => (
      <Typography
        noWrap
        sx={{
          fontWeight: 500,
          textAlign: 'center',
          color: 'black',
        }}
      >
        {params.row.bee}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 110,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: (params) => (
      <RowAction volunteerId={params.row.id} teamId={params.row.team.id} />
    )
  }
];

function RowAction({ volunteerId, teamId }: { volunteerId: number, teamId: number }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Link to={`/volunteer/${volunteerId}`} style={{ textDecoration: 'none' }}>
        <VisibilityIcon sx={{ color: '#67A191', cursor: 'pointer', fontSize: 20, mr: 2 }} />
      </Link>
      <Link to={`/team/${teamId}`} style={{ textDecoration: 'none' }}>
        <GroupsIcon sx={{ color: '#67A191', cursor: 'pointer', fontSize: 20, mr: 2 }} />
      </Link>
      <DeleteIcon sx={{ color: '#67A191', cursor: 'pointer', fontSize: 20 }} />
    </Box>
  )
}

function HorizontalInfoGrid({ value }: { value: IEmployeeRankingInfo }) {
  return (
    <Fragment>
      <Grid item xs={3} md={6} sm={6}>
        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
          <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography sx={{ mb: 1, color: 'bleu' }}>
                Nombre d'employés
              </Typography>
              <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="h4">
                  {value.nb_employees}
                </Typography>
                <Typography sx={{ color: 'grey.500' }}>
                  employés
                </Typography>
              </Box>
              <Typography variant='h6' sx={{ color: 'grey.500' }}>
                blablbala
              </Typography>
            </Box>
            <Icon sx={{ fontSize: 80, color: 'blue' }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                <EmojiEventsIcon sx={{ fontSize: 50 }} />
              </Avatar>
            </Icon>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={3} md={6} sm={6}>
        <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
          <CardContent sx={{ gap: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography sx={{ mb: 1, color: 'bleu' }}>
                Classement
              </Typography>
              <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="h4">
                  {value.employee_rank}
                </Typography>
                <Typography sx={{ color: 'grey.500' }}>
                  employés
                </Typography>
              </Box>
              <Typography variant='h6' sx={{ color: 'grey.500' }}>
                blablbala
              </Typography>
            </Box>
            <Icon sx={{ fontSize: 80, color: 'blue' }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
                <StarOutlinedIcon sx={{ fontSize: 50 }} />
              </Avatar>
            </Icon>
          </CardContent>
        </Card>
      </Grid>
    </Fragment>
  )
}

function EmployeeRanking() {

  const [employeesList, setEmployeesList] = useState<IEmployeesList[]>([]);
  const [info, setInfo] = useState<IEmployeeRankingInfo>({ nb_employees: 0, employee_rank: 0, nb_page: 0 });

  const [paginationModel, setPaginationModel] = useState({ page: 1, pageSize: 20 })

  useEffect(() => {
    fetch(`${config.apiUrl}/teams/employee/ranking/${paginationModel.page}/${paginationModel.pageSize}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setEmployeesList(data.employees);
          setInfo(data.info);
        });
      } else {
        console.log("Error");
      }
    })
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          {info && (
            <Grid container spacing={6}>
              <HorizontalInfoGrid value={info} />
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Classement des employés" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Retrouvez ici le classement de tous les employés de l'association.
              </Typography>
            </CardContent>
            <Divider sx={{ m: '0 !important' }} />
            <DataGrid
              autoHeight
              rowHeight={45}
              rows={employeesList}
              columns={colums}
              disableRowSelectionOnClick
              pageSizeOptions={[20, 50, 100]}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default EmployeeRanking;