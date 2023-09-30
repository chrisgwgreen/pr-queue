import CloseIcon from '@mui/icons-material/Close'
import GitHubIcon from '@mui/icons-material/GitHub'
import { IconButton, Link, Typography } from '@mui/material'
import { css, styled } from '@mui/system'
import { DataContext } from 'contexts'
import React, { useContext, useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Priority, User } from 'types'

interface ItemProps {
  id?: string
  prUrl: string
  text: string
  index: number
  userId: string
  priority: Priority
}

const StyledItem = styled('div')`
  background-color: #eee;
  border-radius: 8px;
  padding: 4px;
  transition: background-color 0.8s ease-out;
  position: relative;
  margin-bottom: 8px;

  :hover: {
    background-color: #fff;
    transition: background-color 0.1s ease-in;
  }
`

const Avatar = styled('img')`
  width: 4rem;
  height: 4rem;
`

const Wrapper = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const StyledAvatar = styled(Avatar)<{ priority: Priority }>(props => {
  const { priority } = props

  return css`
    cursor: pointer;
    margin: 0.5rem;
    filter: drop-shadow(0 0 0.1rem rgba(0, 0, 0, 0.4));
    border-radius: 50%;
    border: solid 4px
      ${priority === 2 ? '#cc3300' : priority === 1 ? '#ffbf00 ' : '#555'};
  `
})

const ContentWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ControlWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`

const DetailsWrapper = styled('div')`
  margin-left: 1rem;

  span {
    display: block;
  }
`

const StyledCaption = styled(Typography)`
  opacity: 0.4;
`

const Item: React.FC<ItemProps> = ({
  text,
  index,
  prUrl,
  userId,
  priority,
  id
}) => {
  const [user, setUser] = useState<User>()
  const { fetchTicketUser, updateTicketPriority, deleteTicket } =
    useContext(DataContext)

  useEffect(() => {
    const fetchData = async (): Promise<User> => fetchTicketUser(userId)

    fetchData()
      .then(user => setUser(user))
      .catch(console.error)
  }, [fetchTicketUser, userId])

  const handleClickPriority = () => {
    let newPriority = priority + 1 > 2 ? 0 : priority + 1

    id && updateTicketPriority(id, newPriority as Priority)
  }

  const handleDeleteTicket = () => {
    id && deleteTicket(id)
  }

  return (
    <Draggable draggableId={text} index={index}>
      {provided => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Wrapper>
            <ContentWrapper>
              <StyledAvatar
                onClick={handleClickPriority}
                src={user?.avatarSrc}
                alt=''
                priority={priority}
              />
              <DetailsWrapper>
                <Typography>{text}</Typography>
                <StyledCaption variant='caption'>{`${user?.forename} ${user?.surname}`}</StyledCaption>
              </DetailsWrapper>
            </ContentWrapper>
            <ControlWrapper>
              <Link href={prUrl} target='_blank'>
                <GitHubIcon />
              </Link>
              <IconButton onClick={handleDeleteTicket}>
                <CloseIcon />
              </IconButton>
            </ControlWrapper>
          </Wrapper>
        </StyledItem>
      )}
    </Draggable>
  )
}

export default Item
