import { DataContext } from 'contexts'
import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

export const Account = () => {
  const { fetchTickets } = useContext(DataContext)

  useEffect(() => {
    fetchTickets()
  }, [fetchTickets])

  return <Outlet />
}
