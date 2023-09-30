import { styled } from '@mui/system'
import { AnimatedTitle } from 'components'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Ticket } from 'types'
import Item from './Item'

interface ColumnProps {
  col: {
    id: string
    list: Ticket[]
  }
}

const StyledColumn = styled('div')`
  display: flex;
  flex-direction: column;
  width: 50%;

  h2: {
    margin: 0;
    padding: 0 16px;
  }
`

const StyledList = styled('div')`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 24px;
`

const Column: React.FC<ColumnProps> = ({ col: { list, id } }) => (
  <Droppable droppableId={id}>
    {provided => (
      <StyledColumn>
        <AnimatedTitle title={id} colorType='secondary' />
        <StyledList {...provided.droppableProps} ref={provided.innerRef}>
          {list.map(
            ({ column, order, title, prUrl, userId, priority, id }, index) => (
              <Item
                id={id}
                key={title}
                text={title}
                prUrl={prUrl}
                index={index}
                userId={userId}
                priority={priority}
              />
            )
          )}
          {provided.placeholder}
        </StyledList>
      </StyledColumn>
    )}
  </Droppable>
)

export default Column
