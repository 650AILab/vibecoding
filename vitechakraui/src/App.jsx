import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Landing from './pages/Landing'

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  // For now, we'll just check if we're on the landing page
  const isAuthenticated = window.location.pathname !== '/'
  return isAuthenticated ? children : <Navigate to="/" replace />
}

function App() {
  const bgColor = useColorModeValue('gray.50', 'gray.900')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Box minH="100vh" bg={bgColor}>
                <Sidebar />
                <Box ml="250px" p={4}>
                  <Dashboard />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/profile"
          element={
            <ProtectedRoute>
              <Box minH="100vh" bg={bgColor}>
                <Sidebar />
                <Box ml="250px" p={4}>
                  <Profile />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/settings"
          element={
            <ProtectedRoute>
              <Box minH="100vh" bg={bgColor}>
                <Sidebar />
                <Box ml="250px" p={4}>
                  <Settings />
                </Box>
              </Box>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
