import { styled, css } from '@mui/system'
import ReactModal from 'react-modal'

interface Props {
  children: JSX.Element
  onClose: () => void
  isOpen: boolean
}

const ContentStyle = styled('div')(
  ({ theme: { breakpoints } }) => css`
    position: absolute;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    height: fit-content !important;
    width: fit-content !important;
    overflow: hidden !important;
    border: none !important ;
    filter: drop-shadow(0 0.5rem 0.5rem rgb(0 0 0 / 0.4));
  `
)

const OverlayStyle = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75) !important;
  z-index: 2;
`

export const Modal = (props: Props) => {
  const { children, onClose, isOpen } = props

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById('modal')}
      contentElement={(props, children) => (
        <ContentStyle {...props}>{children}</ContentStyle>
      )}
      overlayElement={(props, contentElement) => (
        <OverlayStyle {...props}>{contentElement}</OverlayStyle>
      )}
    >
      {children}
    </ReactModal>
  )
}
