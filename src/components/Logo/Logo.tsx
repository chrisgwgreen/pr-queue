import { useNavigate } from 'react-router-dom'
import { styled, useTheme, css } from '@mui/system'
import { LogoLarge } from './large'
import { LogoSmall } from './small'
import { LogoMedium } from './medium'

type logoSize = 'small' | 'medium' | 'large'

interface Props {
  islink: boolean
  logoSize?: logoSize
  fill?: string
}

const LogoSmallWrapper = styled('div')<{ islink: boolean }>(
  ({ islink }) => css`
    width: 100%;
    cursor: ${islink ? 'pointer' : 'initial'};
    pointer-events: ${islink ? 'auto' : 'none'};
    max-width: 1rem;

    svg {
      width: 100%;
    }
  `
)

const LogoMediumWrapper = styled('div')<{ islink: boolean }>(
  ({ islink }) => css`
    width: 100%;
    cursor: ${islink ? 'pointer' : 'initial'};
    pointer-events: ${islink ? 'auto' : 'none'};
    max-width: 25rem;

    svg {
      width: 100%;
    }
  `
)

const LogoLargeWrapper = styled('div')<{ islink: boolean }>(
  ({ islink }) => css`
    width: 100%;
    cursor: ${islink ? 'pointer' : 'initial'};
    pointer-events: ${islink ? 'auto' : 'none'};
    max-width: 20rem;

    svg {
      width: 100%;
    }
  `
)

export const Logo = (props: Props) => {
  const { logoSize = 'large', islink = true, fill } = props

  const navigate = useNavigate()
  const handleTileClick = () => navigate(`/`)

  const theme = useTheme()

  const fillColor = fill || theme.palette.primary.main

  return (
    <>
      {logoSize === 'small' && (
        <LogoSmallWrapper islink={islink}>
          <LogoSmall onClick={() => islink && handleTileClick()} />
        </LogoSmallWrapper>
      )}

      {logoSize === 'medium' && (
        <LogoMediumWrapper islink={islink}>
          <LogoMedium
            onClick={() => islink && handleTileClick()}
            fill={fillColor}
          />
        </LogoMediumWrapper>
      )}

      {logoSize === 'large' && (
        <LogoLargeWrapper islink={islink}>
          <LogoLarge
            onClick={() => islink && handleTileClick()}
            fill={fillColor}
          />
        </LogoLargeWrapper>
      )}
    </>
  )
}
