import { CardDetails } from 'types'

interface cardDetailsFilterProps {
  cardDetails: CardDetails[]
  selectedShowId: string
  sortByDate: boolean
}

export const cardDetailsFilter = (props: cardDetailsFilterProps) => {
  const { cardDetails, selectedShowId } = props

  const filteredCardDetails = cardDetails.reduce<CardDetails[]>(
    (acc, cardDetail) => {
      const { card } = cardDetail

      return card.theme === selectedShowId ? [...acc, cardDetail] : [...acc]
    },
    []
  )

  return filteredCardDetails
}
