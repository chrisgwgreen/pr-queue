import { Loader } from 'components'
import { useUnload } from 'hooks'
import { createContext, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface LoadingContextProps {
  isLoading: boolean
  setIsAuthLoading: (isLoading: boolean) => void
  setIsDataLoading: (isLoading: boolean) => void
  setIsTranslationLoading: (isLoading: boolean) => void
  setIsStorageLoading: (isLoading: boolean) => void
  setIsEmailLoading: (isLoading: boolean) => void
}

export const LoadingContext = createContext<LoadingContextProps>(
  {} as LoadingContextProps
)

export const LoadingProvider = ({ children }) => {
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [isStorageLoading, setIsStorageLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [isTranslationLoading, setIsTranslationLoading] = useState(false)
  const [isEmailLoading, setIsEmailLoading] = useState(false)

  const isLoading =
    isAuthLoading ||
    isDataLoading ||
    isTranslationLoading ||
    isStorageLoading ||
    isEmailLoading

  const { t } = useTranslation()

  useUnload(e => {
    e.preventDefault()
    const exit = window.confirm(t('shared.leave'))

    if (exit) window.close()
  })

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsAuthLoading,
        setIsDataLoading,
        setIsTranslationLoading,
        setIsStorageLoading,
        setIsEmailLoading
      }}
    >
      {isLoading && <Loader />}
      {children}
    </LoadingContext.Provider>
  )
}

export const LoadingConsumer = LoadingContext.Consumer
