import { styled } from '@mui/system'
import { TextField, Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from 'components'

interface Props {
  onSubmit: (oldPassword: string, newPassword: string) => void
  error: string | null
  onClearError: () => void
}

type ChangeEmailProps = {
  email: string
  password: string
}

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`

const ButtonWrapper = styled('div')`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
`

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Required'),
    password: yup.string().required('Required')
  })
  .required()

export const ChangeEmail = (props: Props) => {
  const { onSubmit, error } = props
  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<ChangeEmailProps>({
    resolver: yupResolver(schema)
  })

  const onFormSubmit = (data: ChangeEmailProps) =>
    onSubmit(data.email, data.password)

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
            label={t('account.newEmail')}
            error={!!error}
            helperText={error && error.message}
            required
            variant='standard'
          />
        )}
      />
      <Controller
        name='password'
        defaultValue=''
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label={t('shared.password')}
            type='password'
            error={!!error}
            helperText={error && error.message}
            required
            variant='standard'
          />
        )}
      />
      <ButtonWrapper>
        <Button type='submit' variant='outlined' startIcon={<SaveIcon />}>
          {t('shared.save')}
        </Button>
      </ButtonWrapper>
    </StyledForm>
  )
}
