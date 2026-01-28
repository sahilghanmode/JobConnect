import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css'
import Home from './pages/home/Home'
import { muiTheme } from './theme/muiTheme.js'
import { ThemeProvider, CssBaseline } from '@mui/material'

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
