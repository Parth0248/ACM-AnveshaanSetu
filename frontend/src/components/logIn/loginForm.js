import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';


const LoginForm = ({ credentials, handleChange, handleSubmit, error }) => {
  return (
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
  );
};

export default LoginForm;