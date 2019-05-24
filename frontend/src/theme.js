import {createMuiTheme } from '@material-ui/core/styles';

const blueTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
    palette: {
      primary: {
        main: '#224f77',
        light: '#ebf3f9',
      },
      secondary: {
        main: '#00ff00',
      },
      action: {
        main: '#ff0000'
      }
    },
  });

export const spacing = 24;


export default blueTheme;

