import { createTheme } from '@mui/material/styles';

const arcBlue = '#0B72B9';
const arcOrange = '#FFBA60';
const green = '#679a00';

export default createTheme({
  palette: {
    primary: {
      main: arcBlue,
    },
    secondary: {
      main: arcOrange,
    },
    success: {
      main: green,
    },
  },
  spacing: 8,
  typography: {
    fontFamily: [
      'Press Start 2P',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      '-apple-system',
    ].join(','),
  },
});
