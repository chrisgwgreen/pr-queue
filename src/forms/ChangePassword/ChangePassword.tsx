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

type ChangePasswordProps = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
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
    oldPassword: yup.string().required('Required'),
    newPassword: yup
      .string()
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
        'Must contain 8 characters and a special character.'
      ),
    confirmPassword: yup
      .string()
      .required('Required')
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
  })
  .required()

export const ChangePassword = (props: Props) => {
  const { onSubmit, error } = props
  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<ChangePasswordProps>({
    resolver: yupResolver(schema)
  })

  const onFormSubmit = (data: ChangePasswordProps) =>
    onSubmit(data.oldPassword, data.newPassword)

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Controller
        name='oldPassword'
        defaultValue=''
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label={t('account.oldPassword')}
            type='password'
            error={!!error}
            helperText={error && error.message}
            required
            variant='standard'
          />
        )}
      />
      <Controller
        name='newPassword'
        defaultValue=''
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label={t('account.newPassword')}
            type='password'
            error={!!error}
            helperText={error && error.message}
            required
            variant='standard'
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
