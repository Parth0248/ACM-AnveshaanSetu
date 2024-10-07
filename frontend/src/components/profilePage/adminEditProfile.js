import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';
import axios from 'axios';

const AdminEditProfilePage = () => {
    const [profile, setProfile] = useState({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        affiliation: 'Admin University'
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // POST request to backend to update profile
        axios.post('/admin/profile', profile)
            .then((response) => {
                // console.log('Profile updated:', response.data);
                window.location.href = '/adminProfile';
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
        console.log('Profile updated:', profile);
        window.location.href = '/adminProfile';
    };

    return (
        <Container>
            <ResponsiveAppBar />
            <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>Edit Admin Profile</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <TextField fullWidth label="First Name" name="firstName" value={profile.firstName} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Email" name="email" value={profile.email} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Affiliation" name="affiliation" value={profile.affiliation} onChange={handleChange} sx={{ mb: 2 }} />
                <Button type="submit" variant="contained" color="primary">Save Profile</Button>
            </Box>
        </Container>
    );
};

export default AdminEditProfilePage;
