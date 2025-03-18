import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Button,
  Flex,
  keyframes,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const MotionBox = motion(Box);

const FeatureCard = ({ title, description, imageSrc, index }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    bg="bg.darker"
    borderRadius="xl"
    overflow="hidden"
    position="relative"
    style={{
      transform: 'translateY(0)',
      transition: 'transform 0.3s ease',
    }}
    _hover={{ transform: 'translateY(-8px)' }}
  >
    <Box
      bg="bg.glass"
      p={8}
      height="100%"
      borderWidth="1px"
      borderColor="neutral.800"
      borderRadius="xl"
      position="relative"
      backdropFilter="blur(10px)"
    >
      <Heading
        as="h3"
        fontSize="xl"
        mb={4}
        color="white"
      >
        {title}
      </Heading>
      <Text color="neutral.400" mb={6}>
        {description}
      </Text>
      <Box
        position="relative"
        width="100%"
        height="200px"
        overflow="hidden"
        borderRadius="lg"
        bg="bg.dark"
      >
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.3 }}
          as="img"
          src={imageSrc}
          alt={title}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </Box>
    </Box>
  </MotionBox>
);

const features = [
  {
    title: "SPEED + SCALE",
    description: "Lightning-fast analytics with unlimited scale. Support your most demanding applications with real-time analytics — no matter how big your apps, user base or concurrency demands grow.",
    imageSrc: "https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltf12737aaaa75f1e7/67b631d99bea6d864b491671/img_single-shot-retrieval-for-ai-apps_splitblock.png",
  },
  {
    title: "PLATFORM",
    description: "Feature rich. Future proof. Build your intelligent applications with a feature-rich platform that delivers everything you need.",
    imageSrc: "https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltf12737aaaa75f1e7/67b631d99bea6d864b491671/img_single-shot-retrieval-for-ai-apps_splitblock.png",
  },
  {
    title: "REAL-TIME ANALYTICS",
    description: "Scale from one to one million customers, handling SQL, JSON, full text and vector workloads — all in one unified platform.",
    imageSrc: "https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltf12737aaaa75f1e7/67b631d99bea6d864b491671/img_single-shot-retrieval-for-ai-apps_splitblock.png",
  },
];

const FeatureSection = () => {
  return (
    <Box bg="bg.dark" py={20}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={8}
        >
          {features.map((feature, index) => (
            <GridItem key={index}>
              <FeatureCard {...feature} index={index} />
            </GridItem>
          ))}
        </Grid>
        
        {/* Additional Feature Sections */}
        <Box mt={32}>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={16} alignItems="center">
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Text
                  color="neutral.400"
                  fontSize="sm"
                  fontWeight="semibold"
                  mb={4}
                >
                  SPEED + SCALE
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="bold"
                  color="white"
                  mb={6}
                >
                  Lightning-fast analytics with unlimited scale
                </Heading>
                <Text fontSize="lg" color="neutral.400" mb={8}>
                  Support your most demanding applications with real-time
                  analytics — no matter how big your apps, user base or
                  concurrency demands grow.
                </Text>
                <Button variant="glass" size="lg">
                  Learn more
                </Button>
              </MotionBox>
            </GridItem>
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                position="relative"
              >
                <Box
                  position="relative"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="2xl"
                >
                  <Box
                    as="img"
                    src="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltf12737aaaa75f1e7/67b631d99bea6d864b491671/img_single-shot-retrieval-for-ai-apps_splitblock.png"
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                </Box>
              </MotionBox>
            </GridItem>
          </Grid>
        </Box>

        <Box mt={32}>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={16} alignItems="center">
            <GridItem order={{ base: 2, lg: 1 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
              >
                <Box
                  position="relative"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="2xl"
                >
                  <Box
                    as="img"
                    src="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltf12737aaaa75f1e7/67b631d99bea6d864b491671/img_single-shot-retrieval-for-ai-apps_splitblock.png"
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                </Box>
              </MotionBox>
            </GridItem>
            <GridItem order={{ base: 1, lg: 2 }}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Text
                  color="neutral.400"
                  fontSize="sm"
                  fontWeight="semibold"
                  mb={4}
                >
                  PLATFORM
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="bold"
                  color="white"
                  mb={6}
                >
                  Feature rich. Future proof.
                </Heading>
                <Text fontSize="lg" color="neutral.400" mb={8}>
                  Build your intelligent applications with a feature-rich platform that
                  delivers everything you need.
                </Text>
                <Button variant="glass" size="lg">
                  Learn more
                </Button>
              </MotionBox>
            </GridItem>
          </Grid>
        </Box>

        {/* New Feature Section */}
        <Box mt={32} mb={20}>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={16} alignItems="center">
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Text
                  color="neutral.400"
                  fontSize="sm"
                  fontWeight="semibold"
                  mb={4}
                >
                  REAL-TIME ANALYTICS
                </Text>
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="bold"
                  color="white"
                  mb={6}
                >
                  Unified data platform for modern applications
                </Heading>
                <Text fontSize="lg" color="neutral.400" mb={8}>
                  Handle diverse workloads including SQL, JSON, full text, and vector operations 
                  with blazing-fast performance. Perfect for AI-powered applications and 
                  real-time analytics at any scale.
                </Text>
                <HStack spacing={4}>
                  <Button variant="solid" size="lg">
                    Try it now
                  </Button>
                  <Button variant="glass" size="lg">
                    View documentation
                  </Button>
                </HStack>
              </MotionBox>
            </GridItem>
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                position="relative"
              >
                <Box
                  position="relative"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="2xl"
                >
                  <Box
                    as="img"
                    src="https://images.contentstack.io/v3/assets/bltac01ee6daa3a1e14/bltf12737aaaa75f1e7/67b631d99bea6d864b491671/img_single-shot-retrieval-for-ai-apps_splitblock.png"
                    width="100%"
                    height="auto"
                    objectFit="cover"
                  />
                </Box>
                {/* Add decorative element */}
                <Box
                  position="absolute"
                  top="-20px"
                  right="-20px"
                  width="200px"
                  height="200px"
                  bgGradient="radial(circle, rgba(139, 92, 246, 0.15), transparent 70%)"
                  filter="blur(20px)"
                  zIndex={-1}
                />
              </MotionBox>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default FeatureSection; 