export const designSystem = {
  colors: {
    // Brand Colors (Purple)
    brand: {
      50: '#F5F3FF',
      100: '#EDE9FE',
      200: '#DDD6FE',
      300: '#C4B5FD',
      400: '#A78BFA',
      500: '#8B5CF6', // Primary Brand Color
      600: '#7C3AED',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
    },
    // Neutral Colors (Dark Theme)
    neutral: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#27272A',
      800: '#18181B',
      900: '#09090B',
    },
    // Background Colors
    bg: {
      dark: '#111111',
      darker: '#090909',
      light: '#FFFFFF',
      glass: 'rgba(255, 255, 255, 0.1)',
    },
    // Semantic Colors
    success: {
      50: '#F0FFF4',
      100: '#C6F6D5',
      200: '#9AE6B4',
      300: '#68D391',
      400: '#48BB78',
      500: '#10B981',
      600: '#059669',
      700: '#276749',
      800: '#22543D',
      900: '#1C4532',
    },
    error: {
      50: '#FFF5F5',
      100: '#FED7D7',
      200: '#FEB2B2',
      300: '#FC8181',
      400: '#F56565',
      500: '#EF4444',
      600: '#DC2626',
      700: '#9B2C2C',
      800: '#822727',
      900: '#63171B',
    },
    warning: {
      50: '#FFFAF0',
      100: '#FEEBC8',
      200: '#FBD38D',
      300: '#F6AD55',
      400: '#ED8936',
      500: '#F59E0B',
      600: '#D97706',
      700: '#9C4221',
      800: '#744210',
      900: '#5A3709',
    },
    info: {
      50: '#EBF8FF',
      100: '#BEE3F8',
      200: '#90CDF4',
      300: '#63B3ED',
      400: '#4299E1',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#2C5282',
      800: '#2A4365',
      900: '#1A365D',
    },
  },

  typography: {
    fonts: {
      heading: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
      body: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif',
      mono: 'SF Mono, SFMono-Regular, Consolas, Menlo, monospace',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },

  spacing: {
    space: {
      px: '1px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      3.5: '0.875rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
      12: '3rem',
      14: '3.5rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
  },

  breakpoints: {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(139, 92, 246, 0.3)',
    'purple-glow': '0 0 20px rgba(139, 92, 246, 0.2)',
    none: 'none',
  },

  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
        _focus: {
          boxShadow: 'glow',
          outline: 'none',
        },
      },
      variants: {
        solid: (props) => ({
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            _disabled: {
              bg: 'brand.500',
            },
          },
          _active: {
            bg: 'brand.700',
          },
        }),
        outline: {
          border: '2px solid',
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'rgba(139, 92, 246, 0.1)',
          },
        },
        ghost: {
          color: 'brand.500',
          _hover: {
            bg: 'rgba(139, 92, 246, 0.1)',
          },
        },
        link: {
          color: 'brand.500',
          _hover: {
            textDecoration: 'none',
            color: 'brand.400',
          },
        },
        'glass': {
          bg: 'bg.glass',
          backdropFilter: 'blur(10px)',
          color: 'white',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.15)',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: 'md',
          bg: 'bg.dark',
          borderColor: 'neutral.700',
          _hover: {
            borderColor: 'brand.500',
          },
          _focus: {
            borderColor: 'brand.500',
            boxShadow: 'glow',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          bg: 'bg.dark',
          borderColor: 'neutral.700',
          _hover: {
            boxShadow: 'purple-glow',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        lineHeight: 'tight',
        color: 'white',
      },
    },
    Text: {
      baseStyle: {
        color: 'neutral.300',
      },
    },
  },
}; 