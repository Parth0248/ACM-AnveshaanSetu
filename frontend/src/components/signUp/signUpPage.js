import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SignUpForm from './signUpForm';
import validatePasswordStrength from './validatePassword';
import handleSignUpSubmit from './handleSignUpSubmit';

const SignUpPage = () => {
  const [passwordStrength, setPasswordStrength] = useState("");
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    if (name === "password") {
      validatePasswordStrength(value, setPasswordStrength);
      if (passwordStrength !== "Strong") {
        setError('Please enter a strong password');
      } else {
        setError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    await handleSignUpSubmit(user, setError); // Use the new function
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', minHeight: '100vh' }}>
      <Box 
        sx={{ 
          display: 'flex', // Flexbox for alignment
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          marginBottom: 2, // Space below the title
          marginTop: 8, // Space above the title
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
          marginTop: 8,
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
      </Box>
    </Container>
  );
};

export default SignUpPage;