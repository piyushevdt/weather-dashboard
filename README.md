GitHub Repository: https://github.com/piyushevdt/weather-dashboard

Project Description
A responsive weather dashboard built with React that displays current weather conditions and forecasts using the OpenWeatherMap API. The application features real-time data updates, unit conversion, and persistent local storage of user preferences.

Project Setup:

Installation
1. Clone the repository:  git clone https://github.com/piyushevdt/weather-dashboard.git
                          cd weather-dashboard

2. Install dependencies:  npm install

3. Start the development server:  npm run dev

4. Open your browser to:  http://localhost:5173

API_KEY = 5c4f87a04fc3f0cd7ec91a5689317abf

Key Features:  
   Current weather conditions with visual icons
   5-day forecast display
   Temperature unit toggle (Celsius/Fahrenheit)
   City search functionality
   Responsive design for all screen sizes
   Error handling and loading states
   Local storage for persistent preferences


Technical Approach
1. Component Architecture:

   Created modular components following the single responsibility principle
   Separated presentational and container components
   Implemented reusable UI components (SearchBar, WeatherCard, etc.)

2. State Management:

   Used React Context API for global state management
   Implemented custom hooks for weather data fetching
   Managed local storage for persisting user preferences

3. API Integration:

   Integrated OpenWeatherMap API for current weather and forecasts
   Implemented polling every 30 seconds for live updates
   Added comprehensive error handling

4. Styling:

   Used CSS Modules for scoped styling
   Implemented responsive design with mobile-first approach
   Added subtle animations and transitions for better UX

5. Performance:

   Optimized API calls with caching
   Implemented lazy loading for components
   Used memoization where appropriate
