import { useState, useEffect } from 'react'
import { styled, css } from '@mui/system'
import { Typography } from '@mui/material'
import TextareaAutosize from 'react-textarea-autosize'

interface Props {
  placeholder?: string
  value?: string
  onChange?: (text: string) => void
  minRows?: number
  maxLength?: number
}

const StyledTextarea = styled(TextareaAutosize)(
  ({
    theme: {
      shape: { borderRadius }
    }
  }) => css`
    resize: none;
    border: none;
    outline: none;
    border-radius: ${borderRadius}rem;
    padding: 1rem;

    font-family: 'Fira Sans';
    ::placeholder {
      text-transform: initial;
    }
  `
)

const LetterCount = styled(Typography)`
  text-align: right;
  margin-top: 1rem;
`

export const TextArea = (props: Props) => {
  const { placeholder, value = '', onChange, minRows, maxLength = 150 } = props

  const [text, setText] = useState<string>(value)

  useEffect(() => {}, [])

  const handleSetText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target

    if (value.length <= maxLength) {
      const text = value.substring(0, maxLength)
      setText(text)
      onChange && onChange(text)
    }
  }

  return (
    <>
      <StyledTextarea
        placeholder={placeholder}
        value={text}
        onChange={handleSetText}
        minRows={minRows}
      />
      <LetterCount variant='body2' color='text.secondary'>
        {`${text ? text.length : 0}/${maxLength}`}
      </LetterCount>
    </>
  )
}
