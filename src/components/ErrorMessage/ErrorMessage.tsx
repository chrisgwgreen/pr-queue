import { styled, css } from '@mui/system'

export const ErrorMessage = styled('span')<{ isSmall?: boolean }>(
  ({
    theme: {
      palette: { error }
    },
    isSmall = false
  }) => css`
    color: ${error.main};
    font-size: ${isSmall ? '0.75rem' : '1rem'};
    margin-bottom: 1rem;
  `
)
