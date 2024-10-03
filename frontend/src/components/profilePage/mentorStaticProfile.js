import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ResponsiveAppBar from '../navbar/navbar';

const MentorStaticProfilePage = () => {


    const handleEditClick = () => {
        window.location.href = '/editMentorProfile';
    };

    // Dummy profile data for the mentor
    const profile = {
        firstName: 'Prayush',
        lastName: 'Rathore',
        affiliation: 'Massachusetts Institute of Technology',
        areasOfExpertise: 'Artificial Intelligence, Machine Learning, Blockchain',
        mobileNumber: '123-456-7890',
        email: 'prayush.r@research.iiit.ac.in'
    };

    return (
        <Container>
            <ResponsiveAppBar />
            <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>Mentor Profile</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {profile.firstName} {profile.lastName}
                </Typography>
                <Button
                    startIcon={<EditIcon />}
                    variant="contained"
                    sx={{ backgroundColor: 'grey', fontSize: '0.875rem', px: 2, py: 1 }}
                    onClick={handleEditClick}
                >
                    Edit
                </Button>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Affiliation:</Typography>
                    <Typography variant="body1">{profile.affiliation}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Areas of Expertise:</Typography>
                    <Typography variant="body1">{profile.areasOfExpertise}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Mobile Number:</Typography>
                    <Typography variant="body1">{profile.mobileNumber}</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MentorStaticProfilePage;
