import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { AnimatedTitle, HTMLTitle, MarginWrapper } from 'components'
import { AuthContext } from 'contexts'
import { Login as LoginForm } from 'forms'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: center;
`

export const Login = () => {
  const { login, authUser, loginError, clearError } = useContext(AuthContext)
  const navigate = useNavigate()
  const { t } = useTranslation()
  let [searchParams] = useSearchParams()

  const handleRegisterButton = () =>
    navigate(`/register?${searchParams.toString()}`, { replace: true })

  useEffect(() => {
    authUser && navigate(`/prs?${searchParams.toString()}`, { replace: true })
  }, [authUser, navigate, searchParams])

  const handleLogin = (email: string, password: string) => {
    login(email, password, searchParams.toString())
  }

  return (
    <>
      <HTMLTitle title='Login' />
      <MarginWrapper>
        <Wrapper>
          <div>
            <AnimatedTitle title={t('login.title')} />
            <LoginForm
              onSubmit={handleLogin}
              onClearError={clearError}
              error={loginError}
            />
          </div>
          <ButtonWrapper>
            <Button onClick={handleRegisterButton}>
              {t('shared.register')}
            </Button>
          </ButtonWrapper>
        </Wrapper>
      </MarginWrapper>
    </>
  )
}
