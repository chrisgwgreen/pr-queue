import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export const useViewportSize = () => {
  const theme = useTheme()

  return {
    isXS: useMediaQuery(theme.breakpoints.only('xs')),
    isS: useMediaQuery(theme.breakpoints.only('sm')),
    isM: useMediaQuery(theme.breakpoints.only('md')),
    isL: useMediaQuery(theme.breakpoints.only('lg')),
    isXL: useMediaQuery(theme.breakpoints.only('xl'))
  }
}
