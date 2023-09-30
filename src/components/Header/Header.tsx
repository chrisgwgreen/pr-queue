import { css, styled } from '@mui/system'
import { animated, useSpring } from '@react-spring/web'
import { Logo } from 'components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  renderSubmenu?: () => JSX.Element
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
`

const TopWrapper = styled(animated.div)(
  ({
    theme: {
      palette: { tertiary }
    }
  }) => css`
    height: 3rem;
    display: flex;
    align-items: center;
    background: ${tertiary.main};
    z-index: 10;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
  `
)
const BottomWrapper = styled('div')(
  ({
    theme: {
      palette: { secondary }
    }
  }) => css`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-left: 0.25rem;
    // padding: 0.5rem 0;

    // background: ${secondary.main};
    background: #fabfb8;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
    justify-content: space-between;
  `
)

const MiniLogoWrapper = styled('div')`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`

export const Header = (props: Props) => {
  const { renderSubmenu } = props

  const [isHeaderVisible, setIsHeaderVisible] = useState(false)

  const navigate = useNavigate()
  const headerSpring = useSpring({
    opacity: `${isHeaderVisible ? 1 : 0}`,
    config: {
      mass: 1,
      friction: 80,
      tension: 500
    }
  })

  const handleScroll = () => {
    const currentScrollPos = window.scrollY

    if (currentScrollPos > 50 && !isHeaderVisible) setIsHeaderVisible(true)
    if (currentScrollPos < 50 && isHeaderVisible) setIsHeaderVisible(false)
  }

  const handleHomeClick = () => navigate('/prs')

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <Wrapper>
      <TopWrapper>
        <MiniLogoWrapper onClick={handleHomeClick}>
          <Logo logoSize='small' islink={true} />
        </MiniLogoWrapper>
      </TopWrapper>
      {renderSubmenu && <BottomWrapper>{renderSubmenu()}</BottomWrapper>}
    </Wrapper>
  )
}
