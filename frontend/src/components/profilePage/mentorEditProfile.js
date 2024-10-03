import React, { useState } from 'react';
import { Container, Typography, Button, Box, TextField, Grid } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';


const MentorEditProfilePage = () => {

    const [profile, setProfile] = useState({
        affiliation: 'Massachusetts Institute of Technology',
        areasOfExpertise: 'Artificial Intelligence, Machine Learning, Blockchain',
        mobileNumber: '123-456-7890'
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // POST request to backend to update profile
        console.log('Profile updated:', profile);
        window.location.href = '/mentorProfile';
    };

    return (
        <Container>
            <ResponsiveAppBar />
            <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>Edit Mentor Profile</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Affiliation"
                            name="affiliation"
                            value={profile.affiliation}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Areas of Expertise"
                            name="areasOfExpertise"
                            value={profile.areasOfExpertise}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mobile Number"
                            name="mobileNumber"
                            value={profile.mobileNumber}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save Profile</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default MentorEditProfilePage;
