import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Flex,
  Image,
  HStack,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';

const MotionBox = motion(Box);

const StarRating = () => (
  <HStack spacing={1} mb={4}>
    {[...Array(5)].map((_, i) => (
      <Icon key={i} as={FaStar} color="brand.400" boxSize={5} />
    ))}
  </HStack>
);

const TestimonialCard = ({ company, logo, quote, author, role, verified = false, delay }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    bg="bg.darker"
    borderRadius="xl"
    p={8}
    height="100%"
    borderWidth="1px"
    borderColor="neutral.800"
    position="relative"
    style={{
      transform: 'translateY(0)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}
    _hover={{
      transform: 'translateY(-12px)',
      boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)',
      borderColor: 'brand.500',
      '&::before': {
        opacity: 1,
        transform: 'scale(1)',
      },
    }}
    sx={{
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: '-1px',
        borderRadius: 'xl',
        padding: '1px',
        background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.5), rgba(91, 33, 182, 0.5))',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        opacity: 0,
        transform: 'scale(0.98)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: 'xl',
        background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), transparent 40%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
      },
      '&:hover::after': {
        opacity: 1,
      },
    }}
  >
    <Box position="relative" zIndex={1}>
      {logo && (
        <Image
          src={logo}
          alt={company}
          height="32px"
          mb={6}
          objectFit="contain"
          filter="brightness(0.9) contrast(1.1)"
          transition="filter 0.3s ease"
          _hover={{ filter: 'brightness(1) contrast(1.2)' }}
        />
      )}
      <StarRating />
      <Text 
        color="neutral.300" 
        fontSize="lg" 
        mb={6} 
        lineHeight="tall"
        transition="color 0.3s ease"
        _groupHover={{ color: 'white' }}
      >
        "{quote}"
      </Text>
      <Flex align="center" mt="auto">
        <Box>
          <Text 
            color="white" 
            fontWeight="semibold"
            transition="color 0.3s ease"
          >
            {author}
          </Text>
          <Flex align="center" color="neutral.400">
            <Text 
              fontSize="sm"
              transition="color 0.3s ease"
            >
              {role}
            </Text>
            {verified && (
              <HStack spacing={1} ml={2}>
                <Icon 
                  as={FaCheckCircle} 
                  color="brand.400" 
                  boxSize={4}
                  transition="transform 0.3s ease"
                  _groupHover={{ transform: 'scale(1.1)' }}
                />
                <Text 
                  fontSize="sm"
                  transition="color 0.3s ease"
                >
                  Verified
                </Text>
              </HStack>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  </MotionBox>
);

const testimonials = [
  {
    company: 'Fathom Analytics',
    logo: 'https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/blt0c641037283efe9b/65c6a4a0c6197d424d9f0d4c/fathom-analytics.svg',
    quote: 'We are now all in on SingleStore Helios, which has allowed us to drop Redis, DynamoDB and MySQL, saving us an absolute fortune in monthly costs while dramatically improving performance.',
    author: 'Jack Ellis',
    role: 'Co-Founder, Fathom Analytics',
    verified: true,
  },
  {
    company: 'Siemens',
    logo: 'https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltf0b1e3a6c3a2c2a9/65c6a4a0c6197d424d9f0d4e/siemens.svg',
    quote: 'With SingleStore, we no longer look at the database as a limiting factor in our business',
    author: 'Christoph Malassa',
    role: 'Managing Consultant / Head of Analytics and Intelligence Solutions, Siemens',
    verified: true,
  },
  {
    company: 'Dell',
    logo: 'https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/blt0c641037283efe9b/65c6a4a0c6197d424d9f0d4c/dell.svg',
    quote: 'We considered MariaDB and NoSQL databases, as well as Oracle solutions, but SingleStore was the clear winner.',
    author: 'Technical Lead',
    role: 'Dell Technologies',
    verified: true,
  },
];

const CommunityFeedback = () => {
  return (
    <Box bg="bg.dark" py={20}>
      <Container maxW="container.xl">
        <VStack spacing={4} mb={16} textAlign="center">
          <Text
            color="neutral.400"
            fontSize="sm"
            fontWeight="semibold"
            textTransform="uppercase"
          >
            COMMUNITY
          </Text>
          <Heading
            as="h2"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color="white"
          >
            Building success together
          </Heading>
          <Text fontSize="xl" color="neutral.400" maxW="600px">
            Customers love SingleStore
          </Text>
        </VStack>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={8}
        >
          {testimonials.map((testimonial, index) => (
            <GridItem key={index}>
              <TestimonialCard {...testimonial} delay={index * 0.2} />
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CommunityFeedback; 