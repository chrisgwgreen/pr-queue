import { createTheme } from '@mui/material/styles'

const borderRadius = 0.5

export const shared = createTheme({
  shape: {
    borderRadius
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: `
          :first-of-type {
            border-top-left-radius: ${borderRadius}rem;
            border-top-right-radius: ${borderRadius}rem;
          }
          :last-of-type {
            border-bottom-left-radius: ${borderRadius}rem;
            border-bottom-right-radius: ${borderRadius}rem;
          }
        `
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: `
          border-radius: ${borderRadius}rem;
        `
      }
    },
    MuiButton: {
      styleOverrides: {
        root: `
          border-radius: ${borderRadius}rem;
        `
      }
    },
    MuiCard: {
      styleOverrides: {
        root: `
          border-radius: ${borderRadius}rem;
        `
      }
    },
    MuiSelect: {
      styleOverrides: {
        // @ts-ignore - f&*% up mui
        root: `
          align-items: center;
          border-radius: ${borderRadius}rem;
        `
      }
    },
    MuiPopover: {
      styleOverrides: {
        root: `
          border-radius: ${borderRadius}rem;
        `
      }
    },
    MuiDialog: {
      styleOverrides: { paper: { borderRadius: `${borderRadius}rem` } }
    }
  },
  typography: {
    fontFamily: ['Bebas Neue', 'Fira Sans', 'sans-serif'].join(','),
    fontSize: 16,
    button: {
      fontSize: '1.5rem'
    }
  },
  palette: {
    primary: {
      main: '#393939'
    }
  }
})
