import React from 'react'
import {
  Box,
  VStack,
  Icon,
  Text,
  Link,
  Collapse,
  useDisclosure,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  FiHome,
  FiUsers,
  FiUser,
  FiSettings,
  FiChevronDown,
  FiLogOut,
} from 'react-icons/fi'

const MenuItem = ({ children, icon, to = '/', onClick }) => (
  <Link
    as={RouterLink}
    to={to}
    display="flex"
    alignItems="center"
    px={4}
    py={2}
    color={useColorModeValue('gray.700', 'white')}
    _hover={{
      bg: useColorModeValue('gray.100', 'gray.700'),
      color: useColorModeValue('gray.900', 'white'),
    }}
    rounded="md"
    onClick={onClick}
  >
    <Icon as={icon} mr={3} />
    <Text>{children}</Text>
  </Link>
)

const SubMenu = ({ label, icon, children }) => {
  const { isOpen, onToggle } = useDisclosure()
  const iconColor = useColorModeValue('gray.700', 'white')

  return (
    <Box>
      <Box
        onClick={onToggle}
        display="flex"
        alignItems="center"
        px={4}
        py={2}
        cursor="pointer"
        color={iconColor}
        _hover={{
          bg: useColorModeValue('gray.100', 'gray.700'),
          color: useColorModeValue('gray.900', 'white'),
        }}
        rounded="md"
      >
        <Icon as={icon} mr={3} />
        <Text flex="1">{label}</Text>
        <Icon
          as={FiChevronDown}
          transform={isOpen ? 'rotate(180deg)' : ''}
          transition="transform 0.2s"
        />
      </Box>
      <Collapse in={isOpen}>
        <VStack align="stretch" pl={4} spacing={1}>
          {children}
        </VStack>
      </Collapse>
    </Box>
  )
}

function Sidebar() {
  const navigate = useNavigate()
  const bgColor = useColorModeValue('white', 'gray.800')

  const handleLogout = () => {
    // For now, just navigate to landing page
    navigate('/')
  }

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      h="100vh"
      w="250px"
      bg={bgColor}
      borderRight="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      display="flex"
      flexDirection="column"
    >
      <Box flex="1" py={5}>
        <VStack spacing={1} align="stretch">
          <MenuItem icon={FiHome} to="/dashboard">
            Dashboard
          </MenuItem>
          <SubMenu label="Users" icon={FiUsers}>
            <MenuItem icon={FiUser} to="/users/profile">
              Profile
            </MenuItem>
            <MenuItem icon={FiSettings} to="/users/settings">
              Settings
            </MenuItem>
          </SubMenu>
        </VStack>
      </Box>
      
      <Divider />
      
      <Box py={5}>
        <MenuItem icon={FiLogOut} to="/" onClick={handleLogout}>
          Logout
        </MenuItem>
      </Box>
    </Box>
  )
}

export default Sidebar 