import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChessContextProvider } from './context/chessContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChessContextProvider>
      <App />
    </ChessContextProvider>
  </React.StrictMode>,
)
