import { styled } from '@mui/system'
import { DataContext, LoadingContext } from 'contexts'
import { useContext, useMemo } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Column from './components/Column'

const StyledColumns = styled('div')`
  display: flex;
  gap: 16px;
`

export const Board = () => {
  const { tickets, updateTicketOrder } = useContext(DataContext)
  const { isLoading, setIsDataLoading } = useContext(LoadingContext)

  const columns = useMemo(() => {
    const cols = tickets?.reduce(
      (cols, ticket) => {
        const list = cols[ticket.column].list

        list.push(ticket)
        list.sort((a, b) => (a.order > b.order ? 1 : -1))

        return {
          ...cols,
          [ticket.column]: {
            id: ticket.column,
            list
          }
        }
      },
      {
        dev: {
          id: 'dev',
          list: []
        },
        test: {
          id: 'test',
          list: []
        }
      }
    )

    return cols
  }, [tickets])

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null

    setIsDataLoading(true)

    // @ts-ignore
    const landingColumn = columns[source.droppableId]

    const currentDestinationIndexOrder =
      landingColumn.list[destination.index].order

    let newOrder: number = 0

    if (source.index > destination.index) {
      // MOVE UP...
      if (destination.index - 1 < 0) {
        // Before list...
        newOrder = currentDestinationIndexOrder - 1
      } else {
        // Mid list
        const prevDestinationIndexOrder =
          landingColumn.list[destination.index - 1].order

        newOrder =
          currentDestinationIndexOrder -
          (currentDestinationIndexOrder - prevDestinationIndexOrder) / 2
      }
    } else {
      // MOVE DOWN...
      if (destination.index + 1 === landingColumn.list.length) {
        // End of list...
        newOrder = currentDestinationIndexOrder + 1
      } else {
        // Mid list
        const nextDestinationIndexOrder =
          landingColumn.list[destination.index + 1].order

        newOrder =
          currentDestinationIndexOrder +
          (nextDestinationIndexOrder - currentDestinationIndexOrder) / 2
      }
    }

    updateTicketOrder(
      landingColumn.list[source.index].id,
      newOrder,
      destination.droppableId
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {isLoading && <>LOADING</>}
      <StyledColumns>
        {columns &&
          Object.values(columns).map(col => <Column col={col} key={col.id} />)}
      </StyledColumns>
    </DragDropContext>
  )
}
