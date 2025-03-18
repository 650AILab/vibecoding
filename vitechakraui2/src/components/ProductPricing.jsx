import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  VStack,
  HStack,
  Button,
  Switch,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const MotionBox = motion(Box);

const PricingCard = ({ title, price, description, features, buttonText, isPrimary, delay, isCloud }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.5,
      delay,
      layout: { duration: 0.3 }
    }}
    layout
    bg="bg.darker"
    borderRadius="xl"
    p={8}
    height="100%"
    minH={{ base: "600px", lg: "650px" }}
    display="flex"
    flexDirection="column"
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
    <VStack align="stretch" spacing={6} height="100%" position="relative" zIndex={1}>
      <Box flex="0 0 auto">
        <Heading size="lg" color="white" mb={2}>
          {title}
        </Heading>
        <Text color="neutral.400" fontSize="md" minH="48px">
          {description}
        </Text>
      </Box>

      <Box flex="0 0 auto">
        <Text color="neutral.400" fontSize="sm" mb={1}>
          Starts at
        </Text>
        <Heading size="2xl" color="white">
          {price}
          {price !== 'Free' && price !== 'Custom' && (
            <Text as="span" fontSize="xl" color="neutral.400">
              {isCloud ? "/hr" : "/mo"}
            </Text>
          )}
        </Heading>
      </Box>

      <List spacing={4} flex="1 1 auto" minH="280px">
        {features.map((feature, index) => (
          <ListItem key={index} display="flex" alignItems="center">
            <ListIcon as={FaCheck} color="brand.400" boxSize={4} />
            <Text color="neutral.300">{feature}</Text>
          </ListItem>
        ))}
      </List>

      <Box flex="0 0 auto" mt="auto">
        <Button
          size="lg"
          width="full"
          variant={isPrimary ? "solid" : "outline"}
          colorScheme="brand"
          bg={isPrimary ? "brand.400" : "transparent"}
          _hover={{
            bg: isPrimary ? "brand.500" : "rgba(139, 92, 246, 0.1)",
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </VStack>
  </MotionBox>
);

const cloudPlans = [
  {
    title: "Free",
    price: "Free",
    description: "For evaluation, development and non-production testing",
    features: [
      "Shared Workspace",
      "All SQL and Programmability features",
      "Monitoring",
      "Self-support",
    ],
    buttonText: "Try SingleStore Free",
    isPrimary: true,
  },
  {
    title: "Standard",
    price: "$0.90",
    description: "For general-purpose production workloads",
    features: [
      "Read-replicas",
      "All SQL and Programmability features",
      "Database Branching",
      "Monitoring (30-day)",
      "99.9% SLA",
      "Standard Support",
    ],
    buttonText: "Try SingleStore Free",
  },
  {
    title: "Enterprise",
    price: "$1.35",
    description: "Enhanced DR & security for customer-facing workloads",
    features: [
      "Online PITR",
      "Smart DR",
      "Audit Logging",
      "SCIM with Okta",
      "CMEK",
      "99.9% SLA (1 AZ) or 99.99% SLA (2 AZ)",
    ],
    buttonText: "Learn more",
  },
];

const selfManagedPlans = [
  {
    title: "Community",
    price: "Free",
    description: "For individual developers and small projects",
    features: [
      "Single-node deployment",
      "Basic SQL features",
      "Community support",
      "Limited to 4 cores",
      "Development use only",
    ],
    buttonText: "Download Now",
    isPrimary: true,
  },
  {
    title: "Professional",
    price: "$1999",
    description: "For small to medium-sized production deployments",
    features: [
      "Multi-node deployment",
      "Advanced SQL features",
      "8/5 Support",
      "Up to 32 cores",
      "Monitoring & Alerts",
      "Basic security features",
    ],
    buttonText: "Contact Sales",
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "For large-scale mission-critical deployments",
    features: [
      "Unlimited nodes",
      "Full feature set",
      "24/7 Premium Support",
      "Unlimited cores",
      "Advanced security",
      "Custom SLAs",
    ],
    buttonText: "Contact Sales",
  },
];

const ProductPricing = () => {
  const [isCloud, setIsCloud] = React.useState(true);
  const currentPlans = isCloud ? cloudPlans : selfManagedPlans;

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
            PRICING
          </Text>
          <Heading
            as="h2"
            fontSize={{ base: "4xl", md: "6xl" }}
            fontWeight="bold"
            color="white"
            mb={8}
          >
            Choose your Plan
          </Heading>

          <HStack spacing={8} mb={8}>
            <Text
              color={isCloud ? "white" : "neutral.400"}
              fontWeight={isCloud ? "semibold" : "normal"}
            >
              Helios® Cloud
            </Text>
            <Switch
              size="lg"
              colorScheme="brand"
              isChecked={!isCloud}
              onChange={() => setIsCloud(!isCloud)}
            />
            <Text
              color={!isCloud ? "white" : "neutral.400"}
              fontWeight={!isCloud ? "semibold" : "normal"}
            >
              Self-Managed
            </Text>
          </HStack>
        </VStack>

        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
          gap={8}
          alignItems="stretch"
        >
          {currentPlans.map((plan, index) => (
            <GridItem 
              key={`${isCloud ? 'cloud' : 'self'}-${index}`}
              display="flex"
              alignItems="stretch"
            >
              <PricingCard {...plan} delay={index * 0.2} isCloud={isCloud} />
            </GridItem>
          ))}
        </Grid>

        <Text
          textAlign="center"
          mt={8}
          color="neutral.400"
          fontSize="sm"
        >
          View a more detailed feature list on our{" "}
          <Text
            as="span"
            color="brand.400"
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            pricing page
          </Text>
        </Text>
      </Container>
    </Box>
  );
};

export default ProductPricing; 