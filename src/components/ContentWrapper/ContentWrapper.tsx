import { TitleBlock } from 'components'
import { styled } from '@mui/system'
import { Container } from '@mui/material'
import { ThemeColorType } from 'types'

interface Props {
  title?: string
  children: JSX.Element
  background?: ThemeColorType
  isTitleInverted?: boolean
}

const StyledContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`

export const ContentWrapper = (props: Props) => {
  const { title, children, isTitleInverted = false } = props

  return (
    <StyledContainer maxWidth='lg'>
      {title && <TitleBlock isInverted={isTitleInverted}>{title}</TitleBlock>}
      {children}
    </StyledContainer>
  )
}
