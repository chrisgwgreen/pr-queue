import { styled } from '@mui/system'

interface Props {
  src: string
  alt: string
}

const StyledImage = styled('img')`
  width: 80vw;
  max-width: 43.75rem;
  filter: drop-shadow(0 0.5rem 0.5rem rgb(0 0 0 / 0.4));
`

export const Image = (props: Props) => {
  const { src, alt } = props

  return <StyledImage src={src} alt={alt} />
}
