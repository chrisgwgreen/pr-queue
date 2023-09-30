import { yupResolver } from '@hookform/resolvers/yup'
import { Button, TextField } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'
import { AnimatedTitle, ErrorMessage } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props {
  onSubmit: (title: string, prUrl: string) => void
  error: string | null
  onClearError: () => void
}

type ItemProps = {
  title: string
  prUrl: string
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
`

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  min-width: 50vw;
`

const ButtonWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: end;
  margin-top: 0.5rem;
`

const StyledTextField = styled(TextField)`
  width: 100%;
`

const schema = yup
  .object()
  .shape({
    title: yup.string().required('Required'),
    prUrl: yup.string().required('Required')
  })
  .required()

export const Item = (props: Props) => {
  const { onSubmit, error, onClearError } = props

  const muiTheme = useTheme()
  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<ItemProps>({
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = (data: ItemProps) => {
    onClearError()
    onSubmit(data.title, data.prUrl)
  }

  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <Wrapper>
        <AnimatedTitle title='New Ticket' />
        {error && <ErrorMessage theme={muiTheme}>{error}</ErrorMessage>}
        <Controller
          name='title'
          defaultValue=''
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledTextField
              onChange={onChange}
              value={value}
              label={t('shared.titlePlaceholder')}
              error={!!error}
              helperText={error && error.message}
              required
              variant='standard'
            />
          )}
        />
        <Controller
          name='prUrl'
          defaultValue=''
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledTextField
              onChange={onChange}
              value={value}
              label='PR Url'
              error={!!error}
              helperText={error && error.message}
              required
              variant='standard'
            />
          )}
        />
      </Wrapper>
      <ButtonWrapper>
        <Button type='submit' variant='contained' size='small'>
          {t('shared.save')}
        </Button>
      </ButtonWrapper>
    </StyledForm>
  )
}
