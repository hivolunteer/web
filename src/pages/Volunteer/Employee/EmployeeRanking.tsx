import { Fragment, useEffect, useState } from "react";
import config from "../../../config";
import { Avatar, Box, Card, CardContent, CardHeader, Divider, Icon, Typography } from "@mui/material";
import Grid from '@mui/material/Grid'; // remplacer par Grid2
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Link } from "react-router-dom";
import { EmojiEventsOutlined, EmojiNatureOutlined, Groups2Outlined, HiveOutlined, Person } from "@mui/icons-material";

// Icon
import VisibilityIcon from '@mui/icons-material/Visibility';
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteIcon from '@mui/icons-material/Delete';

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
  nb_top_bee: number;
  nb_top_missions: number;
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
    renderCell: (params : any) => (
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
              fontWeight: 400,
              textDecoration: 'none',
              color: '#514f4f',
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
    renderCell: (params : any) => (
      <Typography
        noWrap
        component={Link}
        to={`/team/${params.row.team.id}`}
        sx={{
          fontWeight: 400,
          textDecoration: 'none',
          textAlign: 'center',
          color: '#514f4f',
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
    renderCell: (params : any) => (
      <Typography
        noWrap
        sx={{
          fontWeight: 400,
          textAlign: 'center',
          color: '#514f4f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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
    renderCell: (params : any) => (
      <Typography
        noWrap
        sx={{
          fontWeight: 400,
          textAlign: 'center',
          color: '#514f4f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
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
    renderCell: (params : any) => (
      <RowAction volunteerId={params.row.id} teamId={params.row.team.id} />
    )
  }
];

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

function HorizontalInfoGrid({ value }: { value: IEmployeeRankingInfo }) {
  return (
    <Fragment>
      <Grid item xs={6} md={3} sm={6}>
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
              {/* <Typography variant='h6' sx={{ color: 'grey.500' }}>
                blablbala
              </Typography> */}
            </Box>
            <Box sx={{ width: 60, height: 60, bgcolor: '#6c439821', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1.5 }}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: '#6c439800' }}>
                <Groups2Outlined sx={{ fontSize: 50, color: '#6c4398' }} /> 
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
                Classement
              </Typography>
              <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="h4">
                  {value.employee_rank}
                </Typography>
                <Typography sx={{ color: 'grey.500' }}>
                  ème
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: 60, height: 60, bgcolor: '#f7f45021', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1.5 }}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: '#f7f45000' }}>
                <EmojiEventsOutlined sx={{ fontSize: 50, color: '#f7f450' }} /> 
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
                Top missions
              </Typography>
              <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="h4">
                  {value.nb_top_missions}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: 60, height: 60, bgcolor: '#b8942121', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1.5 }}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: '#b8942100' }}>
                <HiveOutlined sx={{ fontSize: 50, color: '#b89421' }} /> 
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
                Top bee
              </Typography>
              <Box sx={{ mb: 1, columnGap: 1.5, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="h4">
                  {value.nb_top_bee}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: 60, height: 60, bgcolor: '#99cae921', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1.5 }}>
              <Avatar sx={{ width: 60, height: 60, bgcolor: '#99cae900' }}>
                <EmojiNatureOutlined sx={{ fontSize: 50, color: '#99cae9' }} />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Fragment>
  )
}

function EmployeeRanking() {

  const [employeesList, setEmployeesList] = useState<IEmployeesList[]>([]);
  const [info, setInfo] = useState<IEmployeeRankingInfo>({ nb_employees: 0, employee_rank: 0, nb_page: 0, nb_top_bee: 0, nb_top_missions: 0 });

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
            <Grid container spacing={3}>
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