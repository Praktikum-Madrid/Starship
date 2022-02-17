import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Container from '@mui/material/Container';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    type: 'number',
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', rating: 350 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', rating: 420 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', rating: 450 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', rating: 160 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', rating: 0 },
  { id: 6, lastName: 'Melisandre', firstName: 'Yu', rating: 1500 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', rating: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', rating: 360 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', rating: 65 },
];

export default function Leaderboard() {
  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
    >
      <div style={{ height: 400, width: 600 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </Container>
  );
}
