import React from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  VStack,
  Text,
  Link,
  Image,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { FaLinkedin, FaTwitter, FaFacebook, FaYoutube, FaGithub, FaDiscord } from 'react-icons/fa';

const FooterSection = ({ title, links }) => (
  <VStack align="flex-start" spacing={3}>
    <Text color="white" fontWeight="semibold" fontSize="sm">
      {title}
    </Text>
    {links.map((link, index) => (
      <Link
        key={index}
        href="#"
        color="neutral.400"
        fontSize="sm"
        _hover={{ color: 'white', textDecoration: 'none' }}
      >
        {link}
      </Link>
    ))}
  </VStack>
);

const SocialIcon = ({ icon: Icon, label }) => (
  <Link
    href="#"
    aria-label={label}
    color="neutral.400"
    _hover={{ color: 'white' }}
  >
    <Icon size={20} />
  </Link>
);

const PageFooter = () => {
  const sections = {
    PRODUCT: ['Platform', 'Security', 'Data Ingestion', 'Pricing', 'Professional Services', 'Support'],
    SOLUTIONS: [
      'Why SingleStore?',
      'Compare Databases',
      'Customer Case Studies',
      'Accelerate Your Analytics',
      'Modernize for Scale',
      'Generative AI',
      'Financial Services',
      'Media and Communications',
      'High Tech'
    ],
    DOCS: [
      'Getting Started',
      'Build an Application',
      'Speed up Dashboard',
      'Helios',
      'Helios Releases',
      'Self-Managed',
      'Self-Managed Releases'
    ],
    RESOURCES: [
      'Content Library',
      'Forums',
      'Events',
      'Webinars',
      'Training',
      'Certifications',
      'Courses',
      'Free Database Tools'
    ],
    COMPANY: [
      'About Us',
      'Brand',
      'Blog',
      'News & Press',
      'Leadership',
      'Careers',
      'Legal',
      'Contact Us'
    ],
  };

  return (
    <Box bg="bg.darker" py={16}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
          gap={8}
        >
          {Object.entries(sections).map(([title, links]) => (
            <GridItem key={title}>
              <FooterSection title={title} links={links} />
            </GridItem>
          ))}
        </Grid>

        <Divider my={8} borderColor="neutral.800" />

        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'center' }}
          gap={4}
        >
          <HStack spacing={4}>
            <Image
              src="https://www.singlestore.com/static/images/certifications/soc2.svg"
              alt="SOC 2 Type II Certified"
              height="40px"
            />
            <Image
              src="https://www.singlestore.com/static/images/certifications/iso27001.svg"
              alt="ISO 27001 Certified"
              height="40px"
            />
          </HStack>

          <HStack spacing={6}>
            <Box
              px={3}
              py={1}
              bg="green.900"
              color="green.400"
              fontSize="sm"
              borderRadius="md"
            >
              ● All Systems Operational
            </Box>
            <Link href="#" color="neutral.400" fontSize="sm" _hover={{ color: 'white' }}>
              Privacy
            </Link>
            <Link href="#" color="neutral.400" fontSize="sm" _hover={{ color: 'white' }}>
              Terms
            </Link>
            <Link href="#" color="neutral.400" fontSize="sm" _hover={{ color: 'white' }}>
              Legal
            </Link>
            <Link href="#" color="neutral.400" fontSize="sm" _hover={{ color: 'white' }}>
              Responsible Disclosure
            </Link>
          </HStack>

          <HStack spacing={4}>
            <SocialIcon icon={FaLinkedin} label="LinkedIn" />
            <SocialIcon icon={FaTwitter} label="Twitter" />
            <SocialIcon icon={FaFacebook} label="Facebook" />
            <SocialIcon icon={FaYoutube} label="YouTube" />
            <SocialIcon icon={FaGithub} label="GitHub" />
            <SocialIcon icon={FaDiscord} label="Discord" />
          </HStack>

          <Text color="neutral.400" fontSize="sm">
            © SingleStore, Inc.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default PageFooter; 