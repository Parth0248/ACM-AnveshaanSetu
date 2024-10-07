import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SignUpForm from './signUpForm';
import validatePasswordStrength from './validatePassword';
import handleSignUpSubmit from './handleSignUpSubmit';
import { useNavigate } from 'react-router-dom';
import googleLogo from "../logIn/Icon/web_light_sq_ctn@1x.png";

const SignUpPage = () => {
  const [passwordStrength, setPasswordStrength] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    lastName: '',
    firstName: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setError('');
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    console.log(user.password, user.confirmPassword);
    if (name === "password") {
      validatePasswordStrength(value, setPasswordStrength);
      if (passwordStrength !== "Strong") {
        setError('Please enter a strong password');
      } 
      else {
        setError('');
      }
    }
  };
  
  const google = async () => {
    window.open("http://localhost:8000/auth/google", "_self");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    await handleSignUpSubmit(user, setError, navigate); // Use the new function
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', minHeight: '100vh', paddingBottom: 2 }}>
      <Box 
        sx={{ 
          display: 'flex', // Flexbox for alignment
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          marginBottom: 0, // Space below the title
          marginTop: 6, // Space above the title
        }}
      >
        <Typography variant="h3" align="center">ACM India Anveshan Setu Fellowship</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          width: '50%',
          marginTop: 3.5,
          boxShadow: 4, // Add shadow
        }}
      >
        <Typography component="h1" variant="h4">
          Sign Up
        </Typography>
        {error && (
          <Box sx={{ textAlign: "center", my: 2 }}>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Box>
        )}
        <SignUpForm user={user} handleChange={handleChange} handleSubmit={handleSubmit} />
        <img src={googleLogo} alt="Google Logo" onClick={google} style={{ cursor: 'pointer' }}/>
      </Box>
    </Container>
  );
};

export default SignUpPage;