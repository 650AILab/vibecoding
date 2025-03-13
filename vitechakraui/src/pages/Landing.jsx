import React from 'react'
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useDisclosure,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

function Landing() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')

  const handleLogin = (e) => {
    e.preventDefault()
    onClose()
    navigate('/dashboard')
  }

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Navigation Bar */}
      <Box
        as="nav"
        position="fixed"
        top="0"
        left="0"
        right="0"
        bg={bgColor}
        boxShadow="sm"
        zIndex="sticky"
      >
        <Container maxW="container.xl" py={4}>
          <Flex justify="space-between" align="center">
            <Heading size="md" color={textColor}>
              Your Logo
            </Heading>
            <Button
              leftIcon={<FiLogIn />}
              colorScheme="brand"
              onClick={onOpen}
            >
              Login
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" pt="80px">
        <VStack spacing={8} align="center" py={20}>
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, brand.500, brand.700)"
            bgClip="text"
            textAlign="center"
          >
            Welcome to Our Platform
          </Heading>
          <Text fontSize="xl" textAlign="center" color={textColor}>
            Your one-stop solution for managing everything
          </Text>
          <Button
            size="lg"
            colorScheme="brand"
            onClick={onOpen}
          >
            Get Started
          </Button>
        </VStack>
      </Container>

      {/* Login Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Login</DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleLogin}>
              <VStack spacing={4} mt={4}>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="Enter your email" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Enter your password" />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="brand"
                  width="full"
                >
                  Login
                </Button>
              </VStack>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Landing 