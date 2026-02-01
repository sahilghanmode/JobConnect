import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './App.css'
import Home from './pages/home/Home'
import Auth from './pages/auth/Auth.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { muiTheme } from './theme/muiTheme.js'
import { ThemeProvider, CssBaseline } from '@mui/material'
import VerifyOtp from './pages/auth/VerifyOtp.jsx';
import ProfileSetup from './pages/auth/SetProfile.jsx';
import Profile from './pages/profile/Profile.jsx';

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path='/auth/verify' element={<VerifyOtp />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/profile/me" element={<Profile/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
