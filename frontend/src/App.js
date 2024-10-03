import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/index'; // Import HomePage component
import SignUpPage from './components/signUp/index'; // Import SignUpPage component
import LoginPage from './components/logIn/index';
import ProfilePage from './components/profilePage/profilePage';
import ApplyPage from './components/applyPage/index';
import MentorDashboard from './components/mentorDashboard/mentorDashboard';
import StaticProfilePage from './components/profilePage/index';
import MentorEditProfilePage from './components/profilePage/mentorEditProfile';
import MentorStaticProfilePage from './components/profilePage/mentorStaticProfile';
import UserDashboard from './components/userDashboard';


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<StaticProfilePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/editProfile" element={<ProfilePage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/mentorDashboard" element={<MentorDashboard />} />
          <Route path="/editMentorProfile" element={<MentorEditProfilePage />} />
          <Route path="/mentorProfile" element={<MentorStaticProfilePage />} />
          <Route path="/myApplications" element={<UserDashboard />} />
        </Routes>
      </Router>
  );
}

export default App;
