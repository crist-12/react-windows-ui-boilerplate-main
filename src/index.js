import React from 'react'
import ReactDOM from 'react-dom'
import 'react-windows-ui/config/app-config.css'
import 'react-windows-ui/dist/react-windows-ui.min.css'
import 'react-windows-ui/icons/fonts/fonts.min.css'
import App from './react/App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);