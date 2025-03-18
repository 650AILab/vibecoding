import React from 'react'
import { Box, Heading, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'

function Dashboard() {
  return (
    <Box p={8}>
      <Heading mb={8}>Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <Stat
          px={4}
          py={5}
          bg="white"
          shadow="base"
          rounded="lg"
        >
          <StatLabel>Total Users</StatLabel>
          <StatNumber>1,234</StatNumber>
          <StatHelpText>Feb 12 - Feb 28</StatHelpText>
        </Stat>
        <Stat
          px={4}
          py={5}
          bg="white"
          shadow="base"
          rounded="lg"
        >
          <StatLabel>Active Users</StatLabel>
          <StatNumber>789</StatNumber>
          <StatHelpText>Feb 12 - Feb 28</StatHelpText>
        </Stat>
        <Stat
          px={4}
          py={5}
          bg="white"
          shadow="base"
          rounded="lg"
        >
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>$45,670</StatNumber>
          <StatHelpText>Feb 12 - Feb 28</StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  )
}

export default Dashboard 