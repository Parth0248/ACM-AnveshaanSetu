import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setError('')
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if(credentials.email === '' || credentials.password === '' || !email_regex.test(credentials.email)){
            setError('Please enter valid email and password');
            return
        }
        else{
            setError('');
        }

        const res = await axios.post('/auth/login', credentials,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(res.status === 200){
            const type = res.data.type
            
            localStorage.setItem('User', res.data.token);
            localStorage.setItem('type', res.data.type);
            
            if(type === 'admin'){
                navigate('/');
            }
            else if(type === 'mentee'){
                navigate('/');
            }
            else if(type === 'mentor'){
                navigate('/');
            } 
        }        
    } catch (error) {
        if(error.response.status === 500){
            navigate("/serverError")
        }
        else if(error.response.status === 401){
          setError('Please Sign Up')
        }
        else if(error.response.status===400){
          setError('Enter Correct Credentials')
        }
    }
  }

  const handleLoginSuccess = async (response) => {
    const token = response.credential;
    const decodedUser = jwtDecode(token);
    
    const res = await axios.post('/auth/google_login', decodedUser,
    {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(res.status === 200){
      const type = res.data.type
      
      localStorage.setItem('User', res.data.token);
      localStorage.setItem('type', res.data.type);
      
      if(type === 'admin'){
          navigate('/');
      }
      else if(type === 'mentee'){
          navigate('/');
      }
      else if(type === 'mentor'){
          navigate('/');
      } 
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };


  return (
    <Container component="main" maxWidth="lg" sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'top', minHeight: '100vh' }} >
      <Box 
        sx={{ 
          display: 'flex', // Flexbox for alignment
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
          marginBottom: 2, // Space below the title
          marginTop: 7, // Space above the
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
          marginTop: 7,
          boxShadow: 4, // Add shadow
        }}
      >
        <Typography component="h1" variant="h4">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </GoogleOAuthProvider>
      </Box>
      <Typography variant="body2" sx={{ mt: 3 }}>Don't have an account? <a href="/signup">Sign Up</a></Typography>
      <Typography variant="body2" sx={{ mt: 2 }}>Forgot Password? <a href="/forgotPassword">Recover</a></Typography>
    </Container>
  );
};

export default LoginPage;
