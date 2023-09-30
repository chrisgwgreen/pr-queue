import { useState } from 'react'
import { styled, css } from '@mui/system'
import { IconButton } from '@mui/material'
import { animated, useSpring } from '@react-spring/web'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined'

interface Props {
  title: string
}

const CloseButtonWrapper = styled('div')`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`

const Wrapper = styled('div')(
  ({
    theme: {
      shape: { borderRadius }
    }
  }) => css`
    position: relative;
  `
)

const TitleWrapper = styled(animated.div)(
  ({
    theme: {
      shape: { borderRadius }
    }
  }) => css`
    background: #fff;
    border-radius: ${borderRadius}rem;
    position: absolute;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    padding: 1rem;
    margin-right: 3rem;
  `
)

const Title = styled('span')`
  display: block;
`

export const ImageModalTitle = (props: Props) => {
  const { title } = props
  const [isTitleOpen, setIsTitleOpen] = useState(true)

  const handleToggleIsTitleOpen = () => setIsTitleOpen(!isTitleOpen)

  const fadeInSprings = useSpring({
    opacity: `${isTitleOpen ? '1' : '0'}`
  })

  return (
    <Wrapper>
      <CloseButtonWrapper>
        <IconButton
          size='small'
          color='secondary'
          onClick={handleToggleIsTitleOpen}
        >
          {isTitleOpen ? (
            <ChevronRightOutlinedIcon fontSize='small' />
          ) : (
            <ChevronLeftOutlinedIcon fontSize='small' />
          )}
        </IconButton>
      </CloseButtonWrapper>
      {isTitleOpen && (
        <TitleWrapper style={fadeInSprings}>
          <Title>{title}</Title>
        </TitleWrapper>
      )}
    </Wrapper>
  )
}
