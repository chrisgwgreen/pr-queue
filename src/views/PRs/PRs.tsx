import { styled } from '@mui/system'
import { Add, Board, HTMLTitle, Modal } from 'components'
import { DataContext } from 'contexts'
import { Item } from 'forms'
import { useContext, useState } from 'react'

const Wrapper = styled('div')`
  min-height: 80vh;
  padding: 10vh;
  background-image: url(https://source.unsplash.com/random?dark);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`

export const PRs = () => {
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false)

  const { writeTicket } = useContext(DataContext)

  const handleItemClose = () => setIsNewItemModalOpen(false)

  const handleCreateItem = async (title: string, prUrl: string) =>
    writeTicket(title, prUrl, () => setIsNewItemModalOpen(false))

  const handleAddItemClick = () => setIsNewItemModalOpen(true)

  return (
    <Wrapper>
      <HTMLTitle title='Queue' />
      <Board />
      <Add onClick={handleAddItemClick} />
      {isNewItemModalOpen && (
        <Modal isOpen={isNewItemModalOpen} onClose={handleItemClose}>
          <Item onSubmit={handleCreateItem} error='' onClearError={() => {}} />
        </Modal>
      )}
    </Wrapper>
  )
}
