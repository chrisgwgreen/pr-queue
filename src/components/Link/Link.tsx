import { Typography } from '@mui/material'
import { styled, css } from '@mui/system'

interface Props {
  title: string
  onClick: (id: string) => void
  isSelected: boolean
}

const StyledTypography = styled(Typography, {
  shouldForwardProp: prop => prop !== 'isSelected'
})<{ isSelected: boolean }>(props => {
  const { isSelected } = props

  return css`
    margin: 0 0.25rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    text-decoration: ${isSelected ? 'underline' : 'initial'};
  `
})

export const Link = (props: Props) => {
  const { title, onClick, isSelected } = props

  const handleClick = () => onClick(title)

  return (
    <StyledTypography
      variant='body1'
      onClick={handleClick}
      isSelected={isSelected}
    >
      {title}
    </StyledTypography>
  )
}
