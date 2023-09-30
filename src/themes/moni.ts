import { createTheme } from '@mui/material/styles'
import { shared } from '.'

export const moni = createTheme(shared, {
  palette: {
    primary: {
      main: '#2d2d2f'
    },
    secondary: {
      main: '#eee'
    },
    tertiary: {
      main: '#fff'
    },
    gradient: {
      primary: 'linear-gradient(145deg, #212427 0%, #3e9eaa 100%)',
      tertiary: 'linear-gradient(-45deg, #f1f1f1, #abbdc0)',
      quaternary: 'linear-gradient(#012b3b, #000)'
    },
    envelope: {
      foldFill: '#212427',
      sideFill: '#444446',
      bottomFill: '#363737'
    },
    titleBlock: {
      primary: '#fff',
      secondary: '#2d2d2f'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: `
        ${
          shared.components?.MuiButton &&
          shared.components?.MuiButton.styleOverrides
            ? shared.components?.MuiButton.styleOverrides.root
            : ''
        }

        &:hover {
          background: #ffc0cb;
          color: #fff;
          border-color: #fff;
        }
      `
      }
    }
  }
})
