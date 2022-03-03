/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Alert, Stack } from '@mui/material';
import LeaderboardAPI from 'api/Leaderboard';

const columns: GridColDef[] = [
  {
    field: 'firstName',
    headerName: 'First name',
    width: 200,
    editable: false,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 200,
    editable: false,
  },
  {
    field: 'rating',
    headerName: 'Rating',
    type: 'number',
    width: 200,
    editable: false,
  },
];

const Leaderboard = () => {
  // TODO: добавить Redux и доработать этот блок кода
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [errorLeaderboard, setErrorLeaderboard] = useState('');

  type TUserLeaderboard = {
    data: {
      avatar: string;
      rating: number;
      first_name: string;
      second_name: string;
    };
  }[];

  function formatLeaderboardData(arr: TUserLeaderboard): GridRowsProp {
    const result: {}[] = [];
    arr.forEach((user, index) => {
      result.push({
        internalId: index + 1,
        lastName: user.data.second_name,
        firstName: user.data.first_name,
        rating: user.data.rating,
      });
    });

    return result;
  }

  const leaderboardRequest = {
    ratingFieldName: 'rating',
    cursor: 0,
    limit: 5,
  };

  useEffect(() => {
    LeaderboardAPI.getTeamLeaderboard(leaderboardRequest)
      .then((response) => {
        if (response.ok && response.status === 200) {
          return response.json();
        }
        setErrorLeaderboard('Ошибка при обновлении данных лидерборда');
      })
      .then((response) => {
        const resRows = formatLeaderboardData(response);
        setRows(resRows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container
      sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
    >
      {errorLeaderboard && (
        <Stack
          sx={{
            mt: 2,
            textAlign: 'center',
            gap: 2,
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '400px',
          }}
        >
          <Alert severity='warning'>{errorLeaderboard}</Alert>
        </Stack>
      )}
      <div style={{ height: 400, width: 600 }}>
        {rows.length > 1 && (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.internalId}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            disableColumnMenu
          />
        )}
      </div>
    </Container>
  );
};

export default Leaderboard;
