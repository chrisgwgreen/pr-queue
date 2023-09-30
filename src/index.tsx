import { ThemeProvider } from '@mui/material/styles'
import { App } from 'components'
import {
  AuthProvider,
  DataProvider,
  LoadingProvider,
  SnackbarProvider,
  StorageProvider
} from 'contexts'
import { SnackbarProvider as SnackbarProviderNotistack } from 'notistack'
import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import { moni } from 'themes'

import 'assets/index.css'
import 'utils/locale'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Suspense>
    <BrowserRouter>
      <SnackbarProviderNotistack>
        <SnackbarProvider>
          <ParallaxProvider>
            <HelmetProvider>
              <LoadingProvider>
                <StorageProvider>
                  <DataProvider>
                    <ThemeProvider theme={moni}>
                      <AuthProvider>
                        <App />
                        <div id='modal' />
                      </AuthProvider>
                    </ThemeProvider>
                  </DataProvider>
                </StorageProvider>
              </LoadingProvider>
            </HelmetProvider>
          </ParallaxProvider>
        </SnackbarProvider>
      </SnackbarProviderNotistack>
    </BrowserRouter>
  </Suspense>
)
