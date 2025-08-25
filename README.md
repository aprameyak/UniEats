# UniEats Mobile App

A social eating app for university students to connect over food. Built with React Native and Expo.

## Features

### 🍽️ Core Features
- **Eating Statuses**: Share when you're looking to eat or currently eating
- **Location-based**: Find friends and eating spots near you
- **Campus Mode**: Connect only with students at your university
- **Photo Sharing**: Share pictures of your meals
- **Friend System**: Add and connect with classmates

### 📱 Mobile Features
- **iOS Native**: Optimized for iPhone and iPad
- **Location Services**: Automatic location detection
- **Camera Integration**: Take and share food photos
- **Push Notifications**: Real-time updates (coming soon)
- **Offline Support**: Works without internet connection

## Tech Stack

- **Frontend**: React Native + TypeScript
- **Navigation**: React Navigation v6
- **State Management**: React Hooks + AsyncStorage
- **UI Components**: Custom components with React Native
- **Icons**: Expo Vector Icons (Ionicons)
- **Location**: Expo Location
- **Camera**: Expo Image Picker
- **Development**: Expo CLI

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UniEatsMobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on iOS Simulator**
   ```bash
   npm run ios
   ```

### Development Commands

```bash
# Start Expo development server
npm start

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android

# Run on Web
npm run web

# Build for production
npm run build
```

## Project Structure

```
UniEatsMobile/
├── src/
│   ├── screens/           # App screens
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── ProfileSetupScreen.tsx
│   │   ├── MainFeedScreen.tsx
│   │   ├── StatusCreateScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── FriendSearchScreen.tsx
│   └── types/             # TypeScript interfaces
│       └── index.ts
├── assets/                # Images and static files
├── App.tsx               # Main app component
├── app.json             # Expo configuration
└── package.json         # Dependencies
```

## App Flow

1. **Authentication**: Login/Signup with email
2. **Profile Setup**: Select university and add profile photo
3. **Main App**: 
   - Feed: View friends' eating statuses
   - Create Status: Share your eating status
   - Friends: Find and add new friends
   - Profile: Manage your profile and settings

## Features in Detail

### Authentication
- Email/password login and signup
- Session persistence with AsyncStorage
- Profile setup flow for new users

### Main Feed
- Real-time eating status updates
- Location-based status filtering
- Campus mode toggle
- Pull-to-refresh functionality

### Status Creation
- Two status types: "Looking to Eat" and "Eating Now"
- Location selection from nearby spots
- Photo upload capability
- Campus mode privacy setting

### Friend System
- Search for friends by name or username
- Add friend requests
- Verified user badges
- University-based friend suggestions

### Profile Management
- Profile photo upload
- University selection
- Status and friend statistics
- Logout functionality

## Mock Data

The app currently uses mock data for demonstration:
- Sample users with profile information
- Mock eating statuses with locations
- University list for profile setup
- Friend suggestions

## Future Enhancements

### Backend Integration
- Real API endpoints for user management
- Database integration (Firebase/PostgreSQL)
- Real-time messaging system
- Push notifications

### Additional Features
- Restaurant recommendations
- Group eating sessions
- Dietary preference matching
- Campus dining menu integration
- Social features (likes, comments)

### Performance Optimizations
- Image caching and optimization
- Lazy loading for feed items
- Background location updates
- Offline data synchronization

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@unieats.com or create an issue in the repository.

---

Built with ❤️ for university students who love food and friendship!
