import { styled } from '@mui/system'

import BounceLoader from 'react-spinners/BounceLoader'

interface Props {
  isFullpage?: boolean
  title?: string
}

const Wrapper = styled('div')`
  position: fixed;
  background: #fff;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
`

const LogoWrapper = styled(`div`)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 200px;
  height: 80px;

  display: flex;
  flex-direction: column;

  img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`

const LoaderText = styled(`span`)`
  position: absolute;
  bottom: -1.5rem;
  width: 100%;
  text-align: center;
`

export const Loader = (props: Props) => {
  const { title } = props

  return (
    <Wrapper>
      <LogoWrapper>
        <BounceLoader
          color='#000'
          size={150}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
        {title && <LoaderText>{title}</LoaderText>}
      </LogoWrapper>
    </Wrapper>
  )
}
