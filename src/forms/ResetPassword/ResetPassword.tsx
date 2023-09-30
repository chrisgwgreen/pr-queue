import { styled } from '@mui/system'
import { TextField, Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from 'components'

interface Props {
  onSubmit: (password: string) => void
  error: string | null
  onClearError: () => void
}

type ResetPasswordFormProps = {
  password: string
  confirmPassword: string
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
    password: yup
      .string()
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must contain 8 characters and a special character.'
      ),
    confirmPassword: yup
      .string()
      .required('Required')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  })
  .required()

export const ResetPassword = (props: Props) => {
  const { onSubmit, error } = props

  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<ResetPasswordFormProps>({
    resolver: yupResolver(schema)
  })

  const onFormSubmit = (data: ResetPasswordFormProps) => onSubmit(data.password)

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      {error && <ErrorMessage>{error}</ErrorMessage>}

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
            variant='standard'
            required
          />
        )}
      />
      <Controller
        name='confirmPassword'
        defaultValue=''
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label={t('shared.confirmPassword')}
            type='password'
            error={!!error}
            helperText={error && error.message}
            variant='standard'
            required
          />
        )}
      />

      <ButtonWrapper>
        <Button type='submit' variant='contained' startIcon={<SaveIcon />}>
          {t('shared.save')}
        </Button>
      </ButtonWrapper>
    </StyledForm>
  )
}
