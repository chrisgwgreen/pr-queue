import moment from 'moment'

export const dayMonthYearFormatter = (date: number) =>
  moment(date).format('DD/MM/YYYY')

export const dayMonthYearTimeFormatter = (date: number) =>
  moment(date).format('DD/MM/YYYY, hh:mm')

export const dayNumberFormatter = (number: number) =>
  `${number}`.padStart(2, '0')
