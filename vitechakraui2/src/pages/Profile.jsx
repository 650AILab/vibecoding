import React from 'react'
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react'

function Profile() {
  const bgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box p={8}>
      <Heading mb={8}>Profile</Heading>
      <Box bg={bgColor} p={6} rounded="lg" shadow="base" maxW="600px">
        <VStack spacing={6}>
          <Avatar size="xl" name="John Doe" />
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" defaultValue="John Doe" />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" defaultValue="john@example.com" />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input type="tel" defaultValue="+1 (555) 123-4567" />
          </FormControl>
          <Button colorScheme="brand" width="full">
            Save Changes
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}

export default Profile 