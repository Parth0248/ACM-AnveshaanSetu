import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/index'; // Import HomePage component
import SignUpPage from './components/signUp/index'; // Import SignUpPage component
import LoginPage from './components/logIn/index';
// import ProfileCreationPage from './components/ProfileCreationPage';
// import MentorshipApplicationPage from './components/MentorshipApplicationPage';
// import LoginPage from './components/LoginPage';
// import { ThemeProviderWrapper } from './ThemeContext';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/profile" element={<ProfileCreationPage />} /> */}
          {/* <Route path="/mentorship" element={<MentorshipApplicationPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </Router>
  );
}

export default App;
