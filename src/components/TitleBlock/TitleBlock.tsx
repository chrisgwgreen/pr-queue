import { styled, css } from '@mui/system'
import { Typography } from '@mui/material'

interface Props {
  children: string
  isInverted?: boolean
}

const StyledTypography = styled(Typography, {
  shouldForwardProp: prop => prop !== 'isInverted'
})<{ isInverted?: boolean }>(
  ({
    isInverted,
    theme: {
      shape: { borderRadius },
      palette: { titleBlock }
    }
  }) => css`
    color: ${isInverted ? titleBlock.secondary : titleBlock.primary};
    background: ${isInverted ? titleBlock.primary : titleBlock.secondary};
    text-transform: uppercase;
    width: fit-content;
    display: block;
    padding: 1rem;
    border-radius: ${borderRadius}rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
    margin-bottom: 1.5rem;
  `
)

export const TitleBlock = (props: Props) => {
  const { children, isInverted = false } = props

  return <StyledTypography isInverted={isInverted}>{children}</StyledTypography>
}
