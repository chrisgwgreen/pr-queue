import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Dialog as MaterialDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

interface Props {
  title: string
  copy: string
  onSubmit: () => void
  onCancel: () => void
}

export const Dialog = (props: Props) => {
  const { title, copy, onSubmit, onCancel } = props

  const { t } = useTranslation()

  return (
    <MaterialDialog
      open={true}
      onClose={onCancel}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {copy}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} variant='contained'>
          {t('shared.yes')}
        </Button>
        <Button onClick={onCancel}>{t('shared.no')}</Button>
      </DialogActions>
    </MaterialDialog>
  )
}
