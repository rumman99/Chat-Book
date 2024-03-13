import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import ChatProvider from './Context/chatContext.jsx'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
    <ChatProvider>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
    </ChatProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
