import { styled } from '@mui/system'
import { HTMLTitle } from 'components'
import { useNavigate } from 'react-router-dom'

import asset from 'assets/404.svg'

const Wrapper = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 40rem;
  width: 100%;
  cursor: pointer;
`

const Message = styled('img')`
  opacity: 0.1;
  width: 100%;
`

export const NotFound = () => {
  const navigate = useNavigate()

  const handleClick = () => navigate('/prs')

  return (
    <>
      <HTMLTitle title='Not Found' />
      <Wrapper>
        <Message src={asset} alt='404 message' onClick={handleClick} />
      </Wrapper>
    </>
  )
}
