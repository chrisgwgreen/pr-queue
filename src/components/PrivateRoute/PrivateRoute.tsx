import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from 'contexts'

interface Props {
  children: JSX.Element
  path: string
}

export const PrivateRoute = ({ children, path }: Props) => {
  const { authUser, isUserLoading } = useContext(AuthContext)

  if (!authUser && !isUserLoading) {
    return <Navigate to={path} />
  }

  return children
}
