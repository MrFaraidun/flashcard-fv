# FlashMind - AI-Powered Flashcard Learning Platform

FlashMind is a comprehensive web application that combines intelligent flashcard creation with task management and progress tracking. Built with React frontend and Node.js/Express backend, it provides students and learners with powerful tools to optimize their study sessions.

## 🌟 Key Features

### 📚 Flashcard Management
- **Create Custom Flashcard Sets**: Build personalized study decks with front/back content
- **Interactive Quiz Mode**: Practice with confidence-based learning system
- **Spaced Repetition Algorithm**: SM-2 algorithm optimizes review intervals for better retention
- **Card Organization**: Organize flashcards into sets with search and filtering capabilities
- **Edit & Delete**: Full CRUD operations for both sets and individual cards

### 🎯 Study & Quiz Features
- **Smart Quiz Sessions**: Start timed quiz sessions with random card selection
- **Confidence Rating**: Rate your knowledge ("I Knew It" / "I Didn't Know") for adaptive learning
- **Progress Tracking**: Track quiz scores and completion rates
- **Quiz History**: View past quiz performance for each set
- **Score Analytics**: Visual progress bars and percentage calculations

### ✅ Task Management
- **Integrated Todo System**: Manage study tasks alongside flashcards
- **Task Organization**: Separate pending and completed tasks
- **Real-time Updates**: Add, edit, delete, and toggle task completion
- **Timestamps**: Track when tasks were created and last updated
- **Guest Mode**: Access todo functionality without registration

### 👤 User Management & Authentication
- **Secure Registration**: Email-based account creation with validation
- **Email Verification**: Account activation through email verification
- **Google OAuth**: Sign in with Google for quick access
- **Profile Management**: Customizable profiles with age, purpose, and profile pictures
- **Account Settings**: Edit personal information and manage account preferences
- **Account Deletion**: Secure account removal with data cleanup

### 📊 Progress & Analytics
- **Study Streaks**: Track consecutive days of study activity
- **Streak Counter**: Visual streak display with fire emoji indicators
- **Activity Tracking**: Monitor learning progress across all features
- **User Statistics**: View comprehensive learning analytics

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Interactive Elements**: Smooth animations and hover effects
- **Mobile Responsive**: Optimized for all device sizes
- **Intuitive Navigation**: Easy-to-use interface with clear visual hierarchy
- **Loading States**: Smooth loading indicators and error handling

## 🛠 Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and functional components
- **React Router DOM**: Client-side routing and navigation
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Icons**: Comprehensive icon library
- **Axios**: HTTP client for API communication
- **Date-fns**: Date manipulation and formatting
- **Google OAuth**: Authentication integration

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **PostgreSQL**: Relational database management
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing and security
- **Multer**: File upload handling
- **Nodemailer**: Email service integration
- **Passport.js**: Authentication middleware

### Database Schema
- **Users**: User accounts with authentication and profile data
- **Sets**: Flashcard collections with metadata
- **Cards**: Individual flashcards with front/back content
- **Todos**: Task management with completion tracking
- **QuizSessions**: Quiz attempts and performance data
- **CardProgress**: Spaced repetition algorithm data
- **Streaks**: User study streak tracking

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flashcard-fv
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   Create `.env` file in the backend directory:
   ```env
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=flashcard
   FRONTEND_URL=http://localhost:3000
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   PORT=5000
   ```

5. **Set up the database**
   ```bash
   # Create PostgreSQL database
   createdb flashcard
   # Run database migrations (if available)
   ```

6. **Start the application**
   ```bash
   # Start backend server (from backend directory)
   npm start

   # Start frontend development server (from frontend directory)
   npm start
   ```

## 📱 Application Structure

### Frontend Pages
- **Home**: Landing page with feature showcase and interactive demo
- **Sets**: Flashcard set management and organization
- **Quiz**: Interactive study sessions with progress tracking
- **Todo**: Task management with completion tracking
- **Profile**: User profile and statistics display
- **Settings**: Account management and preferences
- **Login/Register**: Authentication and account creation

### Backend Routes
- **User Routes**: Authentication, profile management, and account operations
- **Set Routes**: Flashcard set CRUD operations
- **Card Routes**: Individual flashcard management
- **Quiz Routes**: Quiz sessions and progress tracking
- **Todo Routes**: Task management operations

## 🎯 Core Algorithms

### Spaced Repetition (SM-2 Algorithm)
The application implements the SM-2 spaced repetition algorithm to optimize learning:
- **Ease Factor**: Adjusts difficulty based on performance
- **Interval Calculation**: Determines next review date
- **Confidence Rating**: Uses "I Knew It" / "I Didn't Know" responses
- **Progressive Intervals**: Increases review intervals for mastered content

### Streak Calculation
- **Daily Activity Tracking**: Monitors user engagement across all features
- **Streak Maintenance**: Resets streak after missed days
- **Visual Indicators**: Displays current streak with fire emoji
- **Activity Integration**: Updates streak for all learning activities

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for password security
- **Input Validation**: Server-side validation for all user inputs
- **CORS Configuration**: Cross-origin resource sharing protection
- **File Upload Security**: Secure image upload handling
- **Session Management**: Proper session handling and cleanup

## 📊 Performance Features

- **Database Optimization**: Efficient PostgreSQL queries
- **Image Optimization**: Optimized profile picture handling
- **Loading States**: Smooth user experience with loading indicators
- **Error Handling**: Comprehensive error management and user feedback
- **Responsive Design**: Optimized for all device sizes

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Interactive Elements**: Smooth animations and transitions
- **Color-coded Feedback**: Visual indicators for different states
- **Accessibility**: Keyboard navigation and screen reader support
- **Mobile-First**: Responsive design for all devices

## 🔄 Development Features

- **Hot Reload**: Development server with automatic reloading
- **Error Boundaries**: React error handling and recovery
- **Component Architecture**: Modular, reusable components
- **API Integration**: RESTful API communication
- **State Management**: React Context for global state

## 📈 Future Enhancements

- **AI-Powered Content**: Automatic flashcard generation from text
- **Collaborative Features**: Share sets with other users
- **Advanced Analytics**: Detailed learning insights and recommendations
- **Offline Support**: Progressive Web App capabilities
- **Mobile App**: Native mobile application
- **Integration APIs**: Connect with external learning platforms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👥 Authors

- **Development Team**: Full-stack development and UI/UX design

## 🙏 Acknowledgments

- React community for excellent documentation
- PostgreSQL team for robust database system
- Tailwind CSS for beautiful styling framework
- All open-source contributors who made this project possible

---

**FlashMind** - Transform your learning experience with intelligent flashcards and comprehensive study tools. Start studying smarter today!
