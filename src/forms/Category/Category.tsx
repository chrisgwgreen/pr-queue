import { styled } from '@mui/system'
import { TextField, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ErrorMessage, AnimatedTitle } from 'components'

interface Props {
  onSubmit: (title: string) => void
  error: string | null
  onClearError: () => void
}

type CategoryProps = {
  title: string
}

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
    title: yup.string().required('Required')
  })
  .required()

export const Category = (props: Props) => {
  const { onSubmit, error, onClearError } = props

  const muiTheme = useTheme()
  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<CategoryProps>({
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = (data: CategoryProps) => {
    onClearError()
    onSubmit(data.title)
  }

  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <AnimatedTitle title={t('category.newCategory')} />
        {error && <ErrorMessage theme={muiTheme}>{error}</ErrorMessage>}
        <Controller
          defaultValue=''
          name='title'
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
      </div>
      <ButtonWrapper>
        <Button type='submit' variant='contained' size='small'>
          {t('shared.save')}
        </Button>
      </ButtonWrapper>
    </StyledForm>
  )
}
