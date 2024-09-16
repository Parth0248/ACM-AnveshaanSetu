import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import LoginForm from './loginForm';
import { useNavigate } from 'react-router-dom';
import googleLogo from "./Icon/web_light_sq_ctn@1x.png";
import handleGoogleOauth from './handleGoogleOauth';
import handleSubmit from './handleLoginSubmit';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };


  return (
    <Container component="main" maxWidth="lg" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', minHeight: '100vh' }} >
      <Box 
        sx={{ 
          display: 'flex', // Flexbox for alignment
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          marginBottom: 2, // Space below the title
          marginTop: 8, // Space above the
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
          Login
        </Typography>
        <LoginForm credentials={credentials} handleChange={handleChange} handleSubmit={(e)=>{e.preventDefault(); handleSubmit(credentials, navigate)}} error={error} />
        <img src={googleLogo} alt="Google Logo" onClick={handleGoogleOauth} style={{ cursor: 'pointer' }}/>
      </Box>
    </Container>
  );
};

export default LoginPage;
