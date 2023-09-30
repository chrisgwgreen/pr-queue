import { yupResolver } from '@hookform/resolvers/yup'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { Button, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { ErrorMessage } from 'components'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

interface Props {
  onSubmit: (email: string, password: string) => void
  error: string | null
  onClearError: () => void
}

type LoginProps = {
  email: string
  password: string
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
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Required'),
    password: yup.string().required('Required')
  })
  .required()

export const Login = (props: Props) => {
  const { onSubmit, error, onClearError } = props

  const { handleSubmit, control } = useForm<LoginProps>({
    resolver: yupResolver(schema)
  })

  const onFormSubmit = (data: LoginProps) => {
    onClearError()
    onSubmit(data.email, data.password)
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
            label='Email'
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
            label='Password'
            type='password'
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
          startIcon={<LoginOutlinedIcon />}
        >
          Login
        </Button>
      </ButtonWrapper>
    </StyledForm>
  )
}
