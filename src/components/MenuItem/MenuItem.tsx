import { styled, css } from '@mui/system'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  title: string
  to: string
  onClick?: () => void
}

const StyledLink = styled(Link)<{ selected?: boolean }>(
  ({
    selected,
    theme: {
      palette: { primary }
    }
  }) => css`
    display: block;
    text-transform: uppercase;
    text-decoration: ${selected ? 'underlined' : 'none'};
    color: ${primary.main};
    margin: 0.5rem 0;
    font-size: 1.4rem;

    :hover {
      text-decoration: underline;
    }
  `
)

export const MenuItem = (props: Props) => {
  const { title, to, onClick } = props

  const location = useLocation()

  return (
    <StyledLink selected={location.pathname === to} to={to} onClick={onClick}>
      {title}
    </StyledLink>
  )
}
