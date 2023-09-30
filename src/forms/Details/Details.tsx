import { styled } from '@mui/system'
import { Button, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import SaveIcon from '@mui/icons-material/Save'
import { Card } from 'types'
import { dayMonthYearTimeFormatter } from 'utils'

interface Props {
  card: Card
  onSubmit: (showDate: number, area: string, seat: string) => void
}

type DetailsProps = {
  seat: string
  area: string
  showDate: number
}

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const ButtonWrapper = styled('div')`
  margin: 1rem 0 0 0;
`

const CreateCardWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`

const schema = yup
  .object()
  .shape({
    showDate: yup.date().required('Required'),
    area: yup.string().required('Required'),
    seat: yup.string().required('Required')
  })
  .required()

export const Details = (props: Props) => {
  const { onSubmit, card } = props

  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<DetailsProps>({
    resolver: yupResolver(schema)
  })

  const onFormSubmit = (data: DetailsProps) =>
    onSubmit(data.showDate.valueOf(), data.area, data.seat)

  return (
    <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
      <CreateCardWrapper>
        <Controller
          name='showDate'
          defaultValue={card.showDate}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <TextField
                name='showDate'
                onChange={onChange}
                label={t('card.showDate')}
                defaultValue={dayMonthYearTimeFormatter(value)}
                variant='standard'
                type='datetime-local'
                InputLabelProps={{
                  shrink: true
                }}
              />
            )
          }}
        />
        <Controller
          name='area'
          defaultValue={card.area || ''}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={t('card.area')}
              error={!!error}
              helperText={error && error.message}
              required
              variant='standard'
            />
          )}
        />
        <Controller
          name='seat'
          defaultValue={card.seat || ''}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              onChange={onChange}
              value={value}
              label={t('card.seat')}
              error={!!error}
              helperText={error && error.message}
              required
              variant='standard'
            />
          )}
        />
      </CreateCardWrapper>
      <ButtonWrapper>
        <Button
          type='submit'
          variant='outlined'
          fullWidth
          startIcon={<SaveIcon />}
        >
          {t('shared.save')}
        </Button>
      </ButtonWrapper>
    </StyledForm>
  )
}
