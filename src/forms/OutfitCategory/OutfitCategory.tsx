import { styled } from '@mui/system'
import {
  TextField,
  Typography,
  IconButton,
  Select,
  MenuItem
} from '@mui/material'

import { FormControl, InputLabel } from '@mui/material'

import { useTheme } from '@mui/material/styles'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from 'components'
import { Category } from 'types'

interface Props {
  onSubmit: (title: string) => void
  error: string | null
  onClearError: () => void
  categories: Category[]
}

type CategoryProps = {
  title: string
}

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`

const ButtonWrapper = styled('div')`
  align-self: center;
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

export const OutfitCategory = (props: Props) => {
  const { onSubmit, error, onClearError, categories } = props

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
      <Typography variant='h6'>Select Category</Typography>
      {error && <ErrorMessage theme={muiTheme}>{error}</ErrorMessage>}
      <Controller
        defaultValue=''
        name='title'
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <FormControl fullWidth>
              <InputLabel>{t('shared.category')}</InputLabel>
              <Select value={value} label='Category' onChange={onChange}>
                {Object.keys(categories).map(category => (
                  <MenuItem
                    key={`select-catefory-${category}`}
                    value={category}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>

          // <StyledTextField
          //   onChange={onChange}
          //   value={value}
          //   label={t('shared.titlePlaceholder')}
          //   error={!!error}
          //   helperText={error && error.message}
          //   required
          //   variant='standard'
          // />
        )}
      />
      <ButtonWrapper>
        <IconButton type='submit' size='large' color='primary'>
          <AddCircleIcon />
        </IconButton>
      </ButtonWrapper>
    </StyledForm>
  )
}
