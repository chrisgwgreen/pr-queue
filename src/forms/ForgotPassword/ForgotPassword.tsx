import { styled } from '@mui/system'
import { TextField, Button } from '@mui/material'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from 'components'

interface Props {
  onSubmit: (email: string) => void
  error: string | null
  onClearError: () => void
}

type LoginProps = {
  email: string
}

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
`

const ButtonWrapper = styled('div')`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Please enter a valid email').required('Required')
  })
  .required()

export const ForgotPassword = (props: Props) => {
  const { onSubmit, error, onClearError } = props

  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<LoginProps>({
    resolver: yupResolver(schema)
  })

  const onFormSubmit = (data: LoginProps) => {
    onClearError()
    onSubmit(data.email)
  }

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Controller
        name='email'
        defaultValue=''
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label={t('shared.email')}
            error={!!error}
            helperText={error && error.message}
            required
            variant='standard'
          />
        )}
      />
      <ButtonWrapper>
        <Button
          type='submit'
          variant='contained'
          startIcon={<EmailRoundedIcon />}
        >
          {t('shared.send')}
        </Button>
      </ButtonWrapper>
    </StyledForm>
  )
}
