import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';

const AddNewMentorPage = () => {
    const [mentor, setMentor] = useState({
        firstName: '',
        lastName: '',
        affiliation: '',
        email: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMentor({ ...mentor, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Placeholder for POST request
        console.log('Submitting new mentor:', mentor);
        // Example: axios.post('/api/mentors', mentor);
    };

    return (
        <Container>
            <ResponsiveAppBar />
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Add New Mentor</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={mentor.firstName}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={mentor.lastName}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Affiliation"
                    name="affiliation"
                    value={mentor.affiliation}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Email Id"
                    name="email"
                    type="email"
                    value={mentor.email}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
        </Container>
    );
};

export default AddNewMentorPage;
