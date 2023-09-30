import { styled, css, Container } from '@mui/system'

export const MarginWrapper = styled(Container)(
  ({ theme: { breakpoints } }) => css`
    height: 100%;

    ${breakpoints.down('sm')} {
      padding: 1.5rem;
    }
    ${breakpoints.between('sm', 'lg')} {
      padding: 2rem;
    }
    ${breakpoints.up('lg')} {
      padding: 3rem;
    }
  `
)
