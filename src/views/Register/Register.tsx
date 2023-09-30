import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { AnimatedTitle, HTMLTitle, MarginWrapper } from 'components'
import { AuthContext } from 'contexts'
import { Register as RegisterForm } from 'forms'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const ButtonWrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

export const Register = () => {
  const { register, registerError, clearError } = useContext(AuthContext)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLoginClick = () => navigate(`/`, { replace: true })

  return (
    <>
      <HTMLTitle title='Register' />
      <MarginWrapper>
        <Helmet>
          <title>{`${t('shared.title')} - ${`shared.register`}`}</title>
        </Helmet>
        <Wrapper>
          <div>
            <AnimatedTitle title={t('register.title')} />
            <RegisterForm
              onSubmit={register}
              onClearError={clearError}
              error={registerError}
            />
          </div>
          <ButtonWrapper>
            <Button onClick={handleLoginClick}>{t('shared.login')}</Button>
          </ButtonWrapper>
        </Wrapper>
      </MarginWrapper>
    </>
  )
}
