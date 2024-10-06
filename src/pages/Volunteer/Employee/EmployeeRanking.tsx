import { useEffect, useState } from "react";
import config from "../../../config";
import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Link } from "react-router-dom"; 

interface EmployeeList {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: string;
  bee: number;
}

const colums: GridColDef[] = [
  {
    flex: 0.25,
    minWidth: 280,
    field: 'first_name',
    headerName: 'Prénom',
    renderCell: (params) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          noWrap
          component={Link}
          to={`/volunteer/${params.row.id}`}
          sx={{
            fontWeight: 500,
            textDecoration: 'none',
            color: 'inherit',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          {params.row.first_name} {params.row.last_name}
        </Typography>
      </Box>
    )
  },
  {
    flex: 0.15,
    minWidth: 170,
    field: 'bee',
    headerName: 'Bee',
    type: 'number',
    renderCell: (params) => (
      <Typography>
        {params.row.bee}
      </Typography>
    )
  }
];

function EmployeeRanking() {

  const [results, setResults] = useState<EmployeeList[]>([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 })

  useEffect(() => {
    fetch(`${config.apiUrl}/teams/employee/ranking`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setResults(data);
        });
      } else {
        console.log("Error");
      }
    })
  }, []);

  return (
    // <div>
    //   {(results.length > 0) ? results.map((result, index) => {
    //     return (
    //       <div key={index}>
    //         <p>{result.employee.first_name} {result.employee.last_name} - {result.bee}</p>
    //       </div>
    //     )
    //   }) : <p>No results</p>}
    //   <h1>EmployeeRanking</h1>
    // </div>
    // <Grid container spacing={6.5}>
    //   <Grid item xs={12}>
    //     <Card>
    //       <CardHeader title="Classement des employés" />
    //       <CardContent>
    //           <Grid container spacing={6}>
    //             <Grid item sm={4} xs={12}>
    //               <CustomTextField
    //                 select
    //                 fullWidth
    //                 de
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Classement des employés" />
          <CardContent>
            QUELLE EST LA STRUCTURE DE CE COMPOSANT ?
          </CardContent>
          <Divider sx={{ m: 0 }} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={results}
            columns={colums}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default EmployeeRanking;