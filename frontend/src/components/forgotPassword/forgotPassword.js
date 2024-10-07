import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const ForgotPasswordPage = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleRecover = async (event) => {
        event.preventDefault();
        // Placeholder for recovery logic
        console.log('Recover password for:', user);
        // Example: axios.post('/api/recover', user);
    };

    return (
        <Container>
            <Typography variant="h3" sx={{ mt: 4 }}>ACM India Anveshan Setu Fellowship</Typography>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Forgot Password</Typography>
            <Box component="form" onSubmit={handleRecover} sx={{ mt: 4 }}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Email Id"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">Recover</Button>
            </Box>
        </Container>
    );
};

export default ForgotPasswordPage;
