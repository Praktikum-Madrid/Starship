import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import { Alert, Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getLeader } from 'store/actions/mode';

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
  const dispatch = useDispatch();
  const { leader } = useSelector((state: { auth: any; settings: any; game: any; mode: any; forum: any }) => state.mode);
  const rows = formatLeaderboardData(leader);
  const errorLeaderboard = '';

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

  React.useEffect(() => {
    dispatch(getLeader());
  }, []);

  return (
    <Container
      sx={{
        width: '100%',
        height: 'calc(100vh - 88px)',
        display: 'flex',
        justifyContent: 'center',
        pt: 10,
      }}
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
        {rows.length >= 1 && (
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

function loadData(store: any) {
  return store.dispatch(getLeader());
}

export default {
  element: Leaderboard,
  loadData,
};
