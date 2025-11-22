import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './lib/theme-provider.tsx'
import { registerServiceWorker, setupInstallPrompt } from './lib/pwa'
import './index.css'

// Register service worker for PWA
registerServiceWorker()
setupInstallPrompt()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="zomato-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
