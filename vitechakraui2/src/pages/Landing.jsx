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
  HStack,
  Image,
  useToast,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import FeatureSection from '../components/FeatureSection'
import { motion } from 'framer-motion'
import CommunityFeedback from '../components/CommunityFeedback'
import ProductPricing from '../components/ProductPricing'
import PageFooter from '../components/PageFooter'

const MotionBox = motion(Box)

const Landing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const toast = useToast()

  const handleLogin = (e) => {
    e.preventDefault()
    toast({
      title: 'Login Successful',
      description: 'Redirecting to dashboard...',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    setTimeout(() => navigate('/dashboard'), 1000)
  }

  return (
    <Box minH="100vh" bg="bg.dark">
      {/* Navigation */}
      <Box 
        position="fixed" 
        top={0} 
        left={0} 
        right={0} 
        zIndex={10}
        bg="rgba(9, 9, 9, 0.8)"
        backdropFilter="blur(10px)"
        borderBottom="1px solid"
        borderColor="neutral.800"
      >
        <Container maxW="container.xl">
          <Flex py={4} justify="space-between" align="center">
            <Heading size="md" color="white">Your Logo</Heading>
            <HStack spacing={4}>
              <Button variant="ghost" color="white">Products</Button>
              <Button variant="ghost" color="white">Solutions</Button>
              <Button variant="ghost" color="white">Resources</Button>
              <Button variant="ghost" color="white">Company</Button>
              <Button variant="ghost" color="white">Pricing</Button>
              <Button variant="outline" onClick={onOpen}>Login</Button>
              <Button variant="solid">Start free</Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box pt="100px">
        <Container maxW="container.xl" py={20}>
          <Flex direction="column" align="center" textAlign="center" maxW="800px" mx="auto">
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="bold"
              mb={6}
              bgGradient="linear(to-r, brand.400, brand.600)"
              bgClip="text"
            >
              Your app is about to get
            </Heading>
            <Heading
              fontSize={{ base: '4xl', md: '6xl' }}
              fontWeight="bold"
              mb={8}
              color="brand.400"
            >
              more reliable
            </Heading>
            <Text fontSize="xl" color="neutral.400" maxW="600px" mb={12}>
              Scale from one to one million customers, handling SQL, JSON, full text
              and vector workloads — all in one unified platform.
            </Text>
            <HStack spacing={6}>
              <Button size="lg" variant="solid">
                Start free
              </Button>
              <Button size="lg" variant="glass">
                Contact sales
              </Button>
            </HStack>
          </Flex>
        </Container>

        {/* Hero Image */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          maxW="container.xl"
          mx="auto"
          mb={20}
        >
          <Box
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="2xl"
          >
            <Image
              src="https://images.pexels.com/photos/370799/pexels-photo-370799.jpeg"
              alt="Dashboard Preview"
              width="100%"
              height="auto"
              objectFit="cover"
            />
          </Box>
        </MotionBox>
      </Box>

      {/* Feature Sections */}
      <FeatureSection />

      {/* Community Feedback Section */}
      <CommunityFeedback />

      {/* Pricing Section */}
      <ProductPricing />

      {/* Footer */}
      <PageFooter />

      {/* Login Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
        <DrawerOverlay />
        <DrawerContent bg="bg.dark" borderLeft="1px solid" borderColor="neutral.800">
          <DrawerCloseButton color="white" />
          <DrawerHeader borderBottomWidth="1px" borderColor="neutral.800">
            <Heading size="lg" color="white">Login</Heading>
          </DrawerHeader>
          <DrawerBody>
            <form onSubmit={handleLogin}>
              <VStack spacing={6} mt={8}>
                <FormControl>
                  <FormLabel color="neutral.400">Email</FormLabel>
                  <Input 
                    type="email" 
                    placeholder="Enter your email"
                    required
                    _placeholder={{ color: 'neutral.600' }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color="neutral.400">Password</FormLabel>
                  <Input 
                    type="password" 
                    placeholder="Enter your password"
                    required
                    _placeholder={{ color: 'neutral.600' }}
                  />
                </FormControl>
                <Button type="submit" w="full" size="lg" mt={4}>
                  Sign In
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