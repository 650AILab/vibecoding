import React from 'react'
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'

function Settings() {
  const bgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box p={8}>
      <Heading mb={8}>Settings</Heading>
      <Box bg={bgColor} p={6} rounded="lg" shadow="base" maxW="600px">
        <VStack spacing={6} align="stretch">
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Email Notifications</FormLabel>
            <Switch defaultChecked />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Push Notifications</FormLabel>
            <Switch defaultChecked />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Two-Factor Authentication</FormLabel>
            <Switch />
          </FormControl>
          <Button colorScheme="brand" width="full">
            Save Settings
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}

export default Settings 