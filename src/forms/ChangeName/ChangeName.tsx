import { yupResolver } from '@hookform/resolvers/yup'
import SaveIcon from '@mui/icons-material/Save'
import { Button, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { ErrorMessage } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'

interface Props {
  onSubmit: (forename: string, surname: string) => void
  error: string | null
  onClearError: () => void
  forename: string
  surname: string
}

type ChangeNameProps = {
  forename: string
  surname: string
}

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
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
    surname: yup.string().required('Required')
  })
  .required()

export const ChangeName = (props: Props) => {
  const { onSubmit, error, forename, surname } = props
  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<ChangeNameProps>({
    resolver: yupResolver(schema)
  })

  const onFormSubmit = (data: ChangeNameProps) =>
    onSubmit(data.forename, data.surname)

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Controller
        name='forename'
        defaultValue={forename}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label={t('shared.forename')}
            error={!!error}
            helperText={error && error.message}
            required
            variant='standard'
          />
        )}
      />
      <Controller
        name='surname'
        defaultValue={surname}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            onChange={onChange}
            value={value}
            label={t('shared.surname')}
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
