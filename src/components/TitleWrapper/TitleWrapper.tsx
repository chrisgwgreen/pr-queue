import { styled, css } from '@mui/system'

export const TitleWrapper = styled('div')(
  ({ theme: { breakpoints } }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: end;

    ${breakpoints.down('sm')} {
      padding: 0.5rem;
    }
  `
)
