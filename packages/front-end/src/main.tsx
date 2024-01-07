import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { ThemeProvider } from '@mui/material/styles'
import theme from '../theme.ts'
import { Provider } from 'react-redux'
import store from './Context/store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider
        clientId={'39117436981-anag4bcvqh8fc4ausd5j4ae5s61keuvi.apps.googleusercontent.com'}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
