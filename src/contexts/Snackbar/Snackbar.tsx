import { createContext } from 'react'
import { useSnackbar, VariantType } from 'notistack'

interface SnackbarContextProps {
  onEnqueueSnackbar: (message: string, variant?: VariantType) => void
}

export const SnackbarContext = createContext<SnackbarContextProps>(
  {} as SnackbarContextProps
)

export const SnackbarProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()

  const handleEnqueueSnackbar = (
    message: string,
    variant: VariantType = 'default'
  ) => {
    enqueueSnackbar(message, { variant, autoHideDuration: 3000 })
  }

  return (
    <SnackbarContext.Provider
      value={{
        onEnqueueSnackbar: handleEnqueueSnackbar
      }}
    >
      {children}
    </SnackbarContext.Provider>
  )
}

export const SnackbarConsumer = SnackbarContext.Consumer
