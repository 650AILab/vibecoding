# Vite + React + Chakra UI Template

## Project Updates

### March 19, 2024
- Initial project setup
- Added Chakra UI integration
- Created basic theme configuration
- Implemented responsive sidebar
- Added dashboard layout
- Created landing page with login form
- Implemented protected routes
- Added user profile and settings pages
- Integrated dark/light mode toggle
- Added logout functionality

## Project Overview

A modern React application template built with Vite and Chakra UI, featuring a complete authentication flow and responsive dashboard layout.

## Features

- 🚀 Built with Vite for lightning-fast development
- 🎨 Modern UI with Chakra UI components
- 🌓 Dark/Light mode support
- 🔒 Protected routes with authentication
- 📱 Fully responsive design
- 🎯 Clean and organized code structure

## Tech Stack

- React 18
- Vite
- Chakra UI
- React Router
- Framer Motion
- React Icons

## Project Structure

```
src/
  ├── components/
  │   └── Sidebar.jsx        # Navigation sidebar component
  ├── pages/
  │   ├── Landing.jsx       # Landing page with login
  │   ├── Dashboard.jsx     # Main dashboard
  │   ├── Profile.jsx       # User profile page
  │   └── Settings.jsx      # User settings page
  ├── App.jsx               # Main application component
  └── main.jsx              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vitechakraui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Features in Detail

### Authentication
- Landing page with login form
- Protected routes
- Logout functionality
- Session management (to be implemented)

### Navigation
- Responsive sidebar
- Nested menu structure
- Active route highlighting
- Dark/Light mode toggle

### Dashboard
- Modern card-based layout
- Statistics display
- Responsive grid system
- User profile management

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Customization

1. Theme customization:
   - Edit `src/theme.js` for global theme settings
   - Modify colors, fonts, and component styles

2. Routing:
   - Add new routes in `App.jsx`
   - Create corresponding page components

3. Components:
   - Add new components in the `components` directory
   - Follow the existing component structure

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
