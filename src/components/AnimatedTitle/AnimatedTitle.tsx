import React from 'react'
import { styled, css } from '@mui/system'
import { useTrail, animated } from '@react-spring/web'
import { useInView } from 'react-intersection-observer'
import { v4 as uuidv4 } from 'uuid'
import { ThemeColorType } from 'types'

interface Props {
  isRightAligned?: boolean
  title: string
  colorType?: ThemeColorType
  isSmall?: boolean
}

export const Wrapper = styled('span')<{ isRightAligned: boolean }>(
  ({ isRightAligned }) => css`
    position: relative;
    display: flex;

    ${isRightAligned &&
    css`
      justify-content: right;
      text-align: right;
    `}
  `
)

const AnimatedText = styled(animated.span, {
  shouldForwardProp: prop => prop !== 'isSmall' && prop !== 'colorType'
})<{ isSmall?: boolean; colorType: ThemeColorType }>(
  ({
    colorType,
    isSmall = false,
    theme: {
      palette: { primary, secondary }
    }
  }) => css`
    position: relative;
    width: 100%;
    line-height: ${isSmall ? '2rem' : '3rem'};
    color: black;
    font-size: ${isSmall ? '2rem' : '3rem'};
    font-weight: 800;
    letter-spacing: 0;
    will-change: transform, opacity;
    color: ${colorType === 'primary' ? primary.main : secondary.main};
  `
)

const TitleWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`

export const Underline = styled('div')<{
  isRightAligned: boolean
  colorType: ThemeColorType
}>(
  ({
    colorType,
    isRightAligned,
    theme: {
      palette: { primary, secondary }
    }
  }) => css`
    width: 6rem;
    height: 0.25rem;
    margin: 1rem 0;
    align-self: ${isRightAligned ? 'end' : 'start'};
    background: ${colorType === 'primary' ? primary.main : secondary.main};
  `
)

const AnimatedTitleWrapper: React.FC<{
  open: boolean
  isSmall: boolean
  isRightAligned: boolean
  children: JSX.Element[]
  colorType: ThemeColorType
}> = props => {
  const { open, children, isRightAligned, colorType, isSmall } = props

  const items = React.Children.toArray(children)

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    from: { opacity: 0, x: 20 }
  })

  return (
    <TitleWrapper>
      {trail.map(({ ...style }, index) => (
        <AnimatedText
          key={index}
          style={style}
          colorType={colorType}
          isSmall={isSmall}
        >
          <animated.div>{items[index]}</animated.div>
        </AnimatedText>
      ))}
      <Underline isRightAligned={isRightAligned} colorType={colorType} />
    </TitleWrapper>
  )
}

export const AnimatedTitle = (props: Props) => {
  const {
    isRightAligned = false,
    title,
    colorType = 'primary',
    isSmall = false
  } = props

  const { ref, inView } = useInView({
    threshold: 1
  })

  return (
    <Wrapper ref={ref} isRightAligned={isRightAligned}>
      <AnimatedTitleWrapper
        open={inView}
        isRightAligned={isRightAligned}
        colorType={colorType}
        isSmall={isSmall}
      >
        {title.split('%').map(line => (
          <span key={`animated-title-${uuidv4()}`}>{line}</span>
        ))}
      </AnimatedTitleWrapper>
    </Wrapper>
  )
}
