import { yupResolver } from '@hookform/resolvers/yup'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'
import { Button, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { ErrorMessage } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { Register as RegisterProps } from 'types'
import * as yup from 'yup'

import './index.css'

interface Props {
  onSubmit: (props: RegisterProps) => void
  error: string | null
  onClearError: () => void
}

type RegistrationFormProps = {
  forename: string
  surname: string
  email: string
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
    forename: yup.string().required('Required'),
    surname: yup.string().required('Required'),
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Required'),
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

export const Register = (props: Props) => {
  const { onSubmit, error } = props

  const { handleSubmit, control } = useForm<RegistrationFormProps>({
    resolver: yupResolver(schema)
  })

  const onFormSubmit = (data: RegistrationFormProps) =>
    onSubmit({
      email: data.email,
      password: data.password,
      forename: data.forename,
      surname: data.surname
    })

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Controller
        name='forename'
        defaultValue=''
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label='First Name'
            error={!!error}
            helperText={error && error.message}
            variant='standard'
            required
          />
        )}
      />
      <Controller
        name='surname'
        defaultValue=''
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label='Last Name'
            error={!!error}
            helperText={error && error.message}
            variant='standard'
            required
          />
        )}
      />
      <Controller
        name='email'
        defaultValue=''
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label='Email'
            error={!!error}
            helperText={error && error.message}
            variant='standard'
            required
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
            label='Password'
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
            label='Confirm Password'
            type='password'
            error={!!error}
            helperText={error && error.message}
            variant='standard'
            required
          />
        )}
      />
      <ButtonWrapper>
        <Button
          type='submit'
          variant='contained'
          startIcon={<AppRegistrationOutlinedIcon />}
        >
          Register
        </Button>
      </ButtonWrapper>
    </StyledForm>
  )
}
