import { yupResolver } from '@hookform/resolvers/yup'
import CloseIcon from '@mui/icons-material/Close'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton
} from '@mui/material'
import { styled } from '@mui/system'
import { ErrorMessage, Loader } from 'components'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TextareaAutosize from 'react-textarea-autosize'
import * as yup from 'yup'

interface Props {
  label: string
  onSubmit: (file: any, title: string) => void
  onClose: (file: any) => void
  file: any
}

type InputFormProps = {
  title: string
}

const StyledForm = styled('form')`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const CardTileWrapper = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
`

const StyledWrapper = styled('div')`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`

const CloseButtonWrapper = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
`

const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  border: none;
  outline: none;
  text-align: center;
  text-transform: uppercase;

  ::placeholder {
    text-transform: initial;
  }
`

const schema = yup
  .object()
  .shape({
    title: yup.string()
  })
  .required()

export const Image = (props: Props) => {
  const { onSubmit, onClose, label, file } = props

  const [isUploading, setIsUploading] = useState(false)

  const { t } = useTranslation()

  const { handleSubmit, control } = useForm<InputFormProps>({
    resolver: yupResolver(schema)
  })

  const onFormSubmit = (data: InputFormProps) => {
    setIsUploading(true)

    onSubmit(file, data.title)
  }

  return (
    <StyledForm>
      <CardTileWrapper>
        <CloseButtonWrapper>
          <IconButton
            onClick={() => onClose(file)}
            size='medium'
            color='secondary'
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </CloseButtonWrapper>
        <div>
          <CardMedia component='img' alt='Alt text' image={file.preview} />
          <CardContent>
            <Controller
              name='title'
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error }
              }) => (
                <StyledWrapper>
                  <StyledTextArea
                    placeholder={label}
                    value={value}
                    onChange={onChange}
                    minRows={2}
                  />
                  {error && <ErrorMessage>{error.message}</ErrorMessage>}
                </StyledWrapper>
              )}
            />
          </CardContent>
        </div>
        <CardActions>
          <StyledButton
            onClick={handleSubmit(onFormSubmit)}
            variant='outlined'
            startIcon={<FileUploadOutlinedIcon />}
          >
            {t(`shared.upload`)}
          </StyledButton>
        </CardActions>

        {isUploading && <Loader />}
      </CardTileWrapper>
    </StyledForm>
  )
}
