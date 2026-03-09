import React from 'react'
import ReactDOM from 'react-dom/client'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import App from './App'
import './style.css'

const rootElement = document.getElementById('root')
const appShell = document.getElementById('app-shell')

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

if (appShell) {
  window.requestAnimationFrame(() => {
    appShell.setAttribute('data-state', 'hidden')
    window.setTimeout(() => {
      appShell.remove()
    }, 240)
  })
}
