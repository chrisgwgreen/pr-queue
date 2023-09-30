import { useState, useEffect } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { styled, css } from '@mui/system'
import { IconButton } from '@mui/material'
import { useWindowSize } from 'hooks'
import { loadImage } from 'utils'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { ImageModalTitle, Modal } from 'components'

interface Props {
  src: string
  title?: string
  onClose: () => void
}

const CloseButtonWrapper = styled('div')`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 11;
`
const Wrapper = styled('div')`
  min-width: 20vw;
`

const Image = styled(animated.img, {
  shouldForwardProp: prop => prop !== 'isWide'
})<{ isWide?: boolean }>(
  ({ isWide }) => css`
    max-width: 50rem;
    display: block;

    ${isWide
      ? css`
          width: calc(100vw - 4rem);
        `
      : css`
          height: calc(100vh - 4rem);
        `}
  `
)

export const ImageModal = (props: Props) => {
  const { src, title, onClose } = props

  const [imageDimensions, setImageDimensions] = useState<{
    width: number
    height: number
  } | null>(null)

  const { windowHeight, windowWidth } = useWindowSize()

  const fadeInDownSprings = useSpring({
    from: { opacity: 0, transform: 'translateY(-2rem)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  })

  useEffect(() => {
    const handleEscape = (event: any) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape, false)

    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [onClose])

  useEffect(() => {
    if (imageDimensions === null) {
      loadImage(setImageDimensions, src)
    }
  }, [imageDimensions, src])

  return (
    <Modal onClose={onClose} isOpen={true}>
      <Wrapper>
        <Image
          style={fadeInDownSprings}
          src={src}
          alt=''
          isWide={
            imageDimensions
              ? windowHeight / windowWidth >
                imageDimensions.height / imageDimensions.width
              : false
          }
        />
        {title && <ImageModalTitle title={title} />}
        <CloseButtonWrapper>
          <IconButton onClick={onClose} size='small' color='secondary'>
            <CloseOutlinedIcon fontSize='small' />
          </IconButton>
        </CloseButtonWrapper>
      </Wrapper>
    </Modal>
  )
}
