import { PrivateRoute } from 'components'
import { Account } from 'containers'
import { Route, Routes } from 'react-router-dom'
import { Login, NotFound, PRs, Profile, Register } from 'views'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='/'
        element={
          <PrivateRoute path='/'>
            <Account />
          </PrivateRoute>
        }
      >
        <Route path='profile' element={<Profile />} />
        <Route path='prs' element={<PRs />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
