import { styled, css } from '@mui/system'
import { useDropzone } from 'react-dropzone'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'

interface Props {
  setFiles: (file: any) => void
  onError: (message: string) => void
  maxFiles: number
  isIcon?: boolean
}

const Wrapper = styled('div')<{ isIcon: boolean }>(
  ({
    isIcon,
    theme: {
      shape: { borderRadius }
    }
  }) => css`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.25rem;
    background-color: #fafafa;
    color: #bdbdbd;
    outline: none;
    transition: border 0.24s ease-in-out;
    border-radius: ${isIcon ? '50%' : `${borderRadius}rem`};
    cursor: pointer;
    margin-top: 2rem;
  `
)

export const Dropzone = (props: Props) => {
  const { setFiles, onError, maxFiles, isIcon = false } = props
  const { t } = useTranslation()

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      maxFiles,
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/webp': [],
        'image/gif': []
      },
      onDropRejected: () =>
        onError(`Too many files selected. ${maxFiles} max.`),
      onDrop: (acceptedFiles, fileRejections) => {
        fileRejections.length === 0 &&
          setFiles(
            acceptedFiles.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          )
      }
    })

  return (
    <Wrapper
      {...getRootProps({ isFocused, isDragAccept, isDragReject })}
      isIcon={isIcon}
    >
      <input {...getInputProps()} />
      <CameraAltIcon />
      {!isIcon && (
        <>
          <p>{t('card.dropZone')}</p>
          <Typography variant='caption'>
            {t('card.uploadMax', { maxFiles })}
          </Typography>
        </>
      )}
    </Wrapper>
  )
}
