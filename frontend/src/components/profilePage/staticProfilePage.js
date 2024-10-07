import React, {useEffect, useState} from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ResponsiveAppBar from '../navbar/navbar';
import { useNavigate } from 'react-router';
import axios from 'axios';

const StaticProfilePage = () => {

    // Dummy profile data
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        affiliation: '',
        mobileNumber: '',
        gender: '',
        phdRegistration: '',
        yearOfPhd: ''
    });

    const handleEditClick = () => {
        window.location.href = '/editProfile';
    };
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('User')){
            navigate('/login')
        }
        const loadData = async ()=>{
            const token = localStorage.getItem('User'); // assuming token is stored this way
            try {
                const response = await axios.get('/mentee/profile', { headers: { Authorization: `Bearer ${token}` } });
                var user = response.data;
                setProfile({
                    'firstName' : user['FirstName'],
                    'lastName' : user['LastName'],
                    'email' : user['Email'],
                    'affiliation' : user['Affiliation'],
                    'mobileNumber' : user['MobileNumber'],
                    'gender' : user['Gender'],
                    'phdRegistration' : user['PHDRegistration'],
                    'yearOfPhd' : user['PHDYear'],
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        loadData()
    },[])

    return (
        <Container>
            <ResponsiveAppBar />
            <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: '#333' }}>My Profile</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4}}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
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
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Email:</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{profile.email}</Typography>

                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Affiliation/Institute Name:</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{profile.affiliation}</Typography>

                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Mobile Number:</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{profile.mobileNumber}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Gender:</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{profile.gender}</Typography>

                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>PhD Registration:</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{profile.phdRegistration}</Typography>

                    <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Year of PhD:</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>{profile.yearOfPhd}</Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default StaticProfilePage;