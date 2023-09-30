import { styled } from '@mui/system'
import { Button } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import Filter from 'bad-words'
import * as yup from 'yup'
import { ErrorMessage, TextArea as TextAreaComponent } from 'components'

const filter = new Filter()

interface Props {
  message?: string
  placeholder?: string
  onSubmit: (message: string) => void
  maxLength: number
}

type TextAreaProps = {
  message: string
}

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledWrapper = styled('div')`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`

const schema = yup
  .object()
  .shape({
    message: yup.string().required('Required')
  })
  .required()

export const TextArea = (props: Props) => {
  const { onSubmit, message, placeholder, maxLength } = props

  const { handleSubmit, control } = useForm<TextAreaProps>({
    resolver: yupResolver(schema)
  })

  const { t } = useTranslation()

  const handleFormSubmit = (data: TextAreaProps) =>
    onSubmit(filter.clean(data.message))

  return (
    <StyledForm>
      <Controller
        name='message'
        defaultValue={message}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <StyledWrapper>
            <TextAreaComponent
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              minRows={3}
              maxLength={maxLength}
            />
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </StyledWrapper>
        )}
      />
      <Button
        onClick={handleSubmit(handleFormSubmit)}
        variant='outlined'
        startIcon={<SaveIcon />}
        color='secondary'
      >
        {t('shared.save')}
      </Button>
    </StyledForm>
  )
}
