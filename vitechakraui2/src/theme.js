import { extendTheme } from '@chakra-ui/react'
import { designSystem } from './theme/designSystem'

const theme = extendTheme({
  ...designSystem,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'bg.dark',
        color: 'white',
        minHeight: '100vh',
      },
      '::-webkit-scrollbar': {
        width: '10px',
      },
      '::-webkit-scrollbar-track': {
        bg: 'bg.darker',
      },
      '::-webkit-scrollbar-thumb': {
        bg: 'neutral.700',
        borderRadius: 'full',
      },
      '::-webkit-scrollbar-thumb:hover': {
        bg: 'neutral.600',
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: 'container.xl',
      },
    },
    Link: {
      baseStyle: {
        color: 'brand.400',
        _hover: {
          textDecoration: 'none',
          color: 'brand.500',
        },
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
    },
  },
})

export default theme 