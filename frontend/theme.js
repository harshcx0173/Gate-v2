// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#e94e4e', // yeh tera custom primary color (orange-red type)
    },
  },
});

export default theme;
