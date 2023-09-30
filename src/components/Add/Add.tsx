import AddCircleIcon from '@mui/icons-material/AddCircle'
import { IconButton } from '@mui/material'
import { styled } from '@mui/system'

interface Props {
  onClick: () => void
}

const Wrapper = styled('div')`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`

export const Add = (props: Props) => {
  const { onClick } = props
  return (
    <Wrapper>
      <IconButton onClick={onClick} size='large' color='secondary'>
        <AddCircleIcon />
      </IconButton>
    </Wrapper>
  )
}
