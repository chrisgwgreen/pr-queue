import React, { useState, useRef, useEffect, useContext } from 'react'
import { styled, css } from '@mui/system'
import { IconButton } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import AvatarEditor from 'react-avatar-editor'
import { Dropzone } from 'components'
import { SnackbarContext } from 'contexts'
import circleOverlay from 'assets/circle-overlay.svg'

interface Props {
  onUpdateAvatar: (imageUrl: string, callback?: () => void) => void
  src?: string
  isCircleOverlayVisible?: boolean
}

const Wrapper = styled('div')(
  ({
    theme: {
      shape: { borderRadius }
    }
  }) => css`
    border-radius: ${borderRadius}rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 20rem;
    height: 20rem;
    position: relative;
    filter: drop-shadow(0 0.5rem 0.5rem rgb(0 0 0 / 0.4));
  `
)

const AvatarWrapper = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const CloseButtonWrapper = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`

const ImageWrapper = styled('img')(
  ({
    theme: {
      shape: { borderRadius }
    }
  }) => css`
    border-radius: ${borderRadius}rem;
    overflow: hidden;
    width: 100%;
  `
)

const PlaceHolder = styled('div')(
  ({
    theme: {
      shape: { borderRadius },
      palette: { primary }
    }
  }) => css`
    height: 100%;
    width: 100%;
    border-radius: ${borderRadius}rem;
    background: ${primary.main};
  `
)

const ButtonWrapper = styled('div')`
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  display: flex;
`

const CircleOverlay = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(${circleOverlay});
  opacity: 0.5;
  pointer-events: none;
`

const ZoomInput = styled('input')``

export const Avatar = (props: Props) => {
  const { src, onUpdateAvatar, isCircleOverlayVisible = true } = props

  const [file, setFile] = useState<string>()
  const [zoomLevel, setZoomLevel] = useState(1)
  const [pinchStart, setPinchStart] = useState(1)
  const [tempZoomLevel, setTempZoomLevel] = useState(-1)

  const avatarWrapper = useRef<HTMLDivElement>(null)
  const editor = useRef<AvatarEditor>(null)
  const isInteracting = useRef(false)

  const { onEnqueueSnackbar } = useContext(SnackbarContext)

  const calculateDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => {
    let xs = x2 - x1
    let ys = y2 - y1

    xs *= xs
    ys *= ys

    return Math.sqrt(xs + ys)
  }

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      const { touches } = e
      const { pageX: x1, pageY: y1 } = touches[0]
      const { pageX: x2, pageY: y2 } = touches[1]

      const currentDistance = calculateDistance(x1, y1, x2, y2)

      setZoomLevel(tempZoomLevel + (currentDistance - pinchStart) * 0.01)
    }

    const handleTouchEnd = () => {
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      setTempZoomLevel(-1)
      isInteracting.current = false
    }

    if (tempZoomLevel >= 0 && !isInteracting.current) {
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleTouchEnd)

      isInteracting.current = true
    }
  }, [isInteracting, tempZoomLevel, pinchStart])

  const handleZoomChange = (e: React.FormEvent<HTMLInputElement>) => {
    const zoomLevelValue = e.currentTarget.value
    setZoomLevel(parseFloat(zoomLevelValue))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const { touches } = e

    if (touches.length === 2) {
      const { pageX: x1, pageY: y1 } = touches[0]
      const { pageX: x2, pageY: y2 } = touches[1]

      setPinchStart(calculateDistance(x1, y1, x2, y2))
      setTempZoomLevel(zoomLevel)
    }
  }

  const handleDropZoneError = (message: string) =>
    onEnqueueSnackbar(message, 'error')

  const handleClick = () => {
    if (editor.current) {
      const imageUrl = editor.current.getImage().toDataURL('image/jpeg', 0.7)

      onUpdateAvatar(imageUrl, () => setFile(undefined))
    }
  }

  const handleClearImage = () => setFile(undefined)

  return (
    <Wrapper ref={avatarWrapper}>
      {!file && (
        <>
          {src && <ImageWrapper src={src} />}
          {!src && <PlaceHolder />}
          <ButtonWrapper>
            <Dropzone
              maxFiles={1}
              setFiles={file => {
                file && setFile(file[0].preview)
              }}
              onError={handleDropZoneError}
              isIcon
            />
          </ButtonWrapper>
        </>
      )}
      {file && (
        <AvatarWrapper onTouchStart={handleTouchStart}>
          <CloseButtonWrapper>
            <IconButton
              onClick={handleClearImage}
              size='medium'
              color='secondary'
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </CloseButtonWrapper>
          <AvatarEditor
            width={avatarWrapper.current && avatarWrapper.current.offsetWidth}
            height={avatarWrapper.current && avatarWrapper.current.offsetHeight}
            image={file}
            scale={zoomLevel}
            ref={editor}
            crossOrigin='use-credentials'
            border={0}
          />
          {isCircleOverlayVisible && <CircleOverlay />}
          <ButtonWrapper>
            <ZoomInput
              type='range'
              name='zoom'
              value={zoomLevel}
              min='1'
              max='5'
              step='0.1'
              onChange={handleZoomChange}
            />
            <IconButton onClick={handleClick} size='large' color='secondary'>
              <SaveIcon />
            </IconButton>
          </ButtonWrapper>
        </AvatarWrapper>
      )}
    </Wrapper>
  )
}
