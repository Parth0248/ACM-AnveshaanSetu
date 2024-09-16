// SignUpForm.js
import React from 'react';
import { Button, Box } from '@mui/material';
import FormInput from './formInput';

const SignUpForm = ({ user, handleChange, handleSubmit }) => {
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        name="email"
        type="email"
        value={user.email}
        onChange={handleChange}
      />
      <FormInput
        label="First Name"
        name="firstName"
        type="text"
        value={user.firstName}
        onChange={handleChange}
      />
      <FormInput
        label="Last Name"
        name="lastName"
        type="text"
        value={user.lastName}
        onChange={handleChange}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        value={user.password}
        onChange={handleChange}
      />
      <FormInput
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
  );
};

export default SignUpForm;