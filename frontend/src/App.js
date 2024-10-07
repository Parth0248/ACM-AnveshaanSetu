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
import UnauthorizedAccessPage from './components/errorPages/unauthorizedAccess';
import ServerErrorPage from './components/errorPages/serverError';
import AdminStaticProfilePage from './components/profilePage/adminStaticProfile';
import AdminEditProfilePage from './components/profilePage/adminEditProfile';
import AdminDashboard from './components/adminDashboard';
import AddNewMentorPage from './components/addNewMentor';
import ForgotPasswordPage from './components/forgotPassword';



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
          <Route path="/unauthorized" element={<UnauthorizedAccessPage />} />
          <Route path="/serverError" element={<ServerErrorPage />} /> 
          <Route path="/adminProfile" element={<AdminStaticProfilePage />} />
          <Route path="/editAdminProfile" element={<AdminEditProfilePage />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/addNewMentor" element={<AddNewMentorPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
        </Routes>
      </Router>
  );
}

export default App;
