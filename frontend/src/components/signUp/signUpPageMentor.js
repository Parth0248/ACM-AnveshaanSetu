import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const SignUpPageMentor = () => {
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

  const validatePasswordStrength = (password, setPasswordStrength) => {
    let strength = "Weak";
    const regexStrong =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regexModerate =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (regexStrong.test(password)) {
      strength = "Strong";
    } else if (regexModerate.test(password)) {
      strength = "Moderate";
    }

    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    setError('');
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
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
  
  const handleLoginSuccess = async (response) => {
    const token = response.credential;
    const decodedUser = jwtDecode(token);
    try{
      const res = await axios.post('/auth/mentors/google_signup', decodedUser,
      {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      if(res.status === 200){
        const type = res.data.type
        
        localStorage.setItem('User', res.data.token);
        localStorage.setItem('type', res.data.type);
        
        if(type === 'mentor'){
            navigate('/mentorProfile');
        }
      }
    }
    catch (error) {
      if (error.response && error.response.status === 400) {
          setError("Email Already Exists, Pls Login");
      } else {
          setError('An error occurred');
      }
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Google login failed:', error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('/auth/mentors/signup', user, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      if(res.status === 200){
          navigate('/mentorProfile');
      }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setError("Email Already Exists, Pls Login");
        } else {
            setError('An error occurred');
        }
    }
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
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="First Name"
            name="firstName"
            type="text"
            value={user.firstName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Last Name"
            name="lastName"
            type="text"
            value={user.lastName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={user.confirmPassword}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </GoogleOAuthProvider>
      </Box>
    </Container>
  );
};

export default SignUpPageMentor;