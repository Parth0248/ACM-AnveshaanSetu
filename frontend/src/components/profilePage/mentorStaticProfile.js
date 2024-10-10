import React, {useEffect, useState} from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ResponsiveAppBar from '../navbar/navbar';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router';
import axios from 'axios';


const MentorStaticProfilePage = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        affiliation: '',
        areasOfExpertise: '',
        mobileNumber: '',
        email: ''
    });

    const handleEditClick = () => {
        window.location.href = '/editMentorProfile';
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
                if(error.response.status === 500){
                    navigate("/serverError")
                }
                else if(error.response.status === 401){
                    navigate("/unauthorized")
                }
            }
        }
        loadData()
    },[])
    return (
        <Container>
            <ResponsiveAppBar pages={['APPLICATIONS']}/>
            <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>Mentor Profile</Typography>
            <Paper elevation={4} sx={{ p: 3, mt: 2, backgroundColor: '#f7f7f7', borderRadius: 2 }}>
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
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Email:</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>{profile.email}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Affiliation:</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>{profile.affiliation}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Mobile Number:</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>{profile.mobileNumber}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Areas of Expertise:</Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>{profile.areasOfExpertise}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default MentorStaticProfilePage;
