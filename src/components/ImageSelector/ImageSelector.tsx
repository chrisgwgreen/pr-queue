import { useState, useContext } from 'react'
import { styled } from '@mui/system'
import { Grid } from '@mui/material'
import { Dropzone } from 'components'
import { Image } from 'forms'
import { SnackbarContext } from 'contexts'

interface Props {
  maxFiles: number
  onCreateImage: (file, title, callback) => void
}

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`

const ImagesWrapper = styled('div')`
  margin-top: 1rem;
`

export const ImageSelector = (props: Props) => {
  const { onCreateImage, maxFiles } = props

  const [files, setFiles] = useState<any[]>()

  const { onEnqueueSnackbar } = useContext(SnackbarContext)

  const handleCloseImage = (file: any) => {
    if (files) {
      const index = files.findIndex(
        currentFile => currentFile.preview === file.preview
      )

      const newFiles = [...files]
      newFiles.splice(index, 1)

      setFiles(newFiles)
    }
  }

  const handleSubmit = (file: any, title: string) => {
    onCreateImage(file, title, () => handleCloseImage(file))
  }

  const handleDropZoneError = (message: string) =>
    onEnqueueSnackbar(message, 'error')

  return (
    <Wrapper>
      {files && files.length > 0 && (
        <ImagesWrapper>
          <Grid container spacing={3}>
            {files &&
              files.map(file => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={`upload-image-${file.preview}`}
                >
                  <Image
                    label='Title (optional)'
                    file={file}
                    onSubmit={handleSubmit}
                    onClose={handleCloseImage}
                  />
                </Grid>
              ))}
          </Grid>
        </ImagesWrapper>
      )}
      <Dropzone
        setFiles={setFiles}
        onError={handleDropZoneError}
        maxFiles={maxFiles}
      />
    </Wrapper>
  )
}
