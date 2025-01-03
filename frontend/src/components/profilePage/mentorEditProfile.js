import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, TextField, Grid } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router';

const MentorEditProfilePage = () => {

    const [profile, setProfile] = useState({
        affiliation: '',
        areasOfExpertise: '',
        mobileNumber: '',
        googleScholar: '',
        personalWebsite: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('User');
        try {
            await axios.post('/mentor/edit_profile', profile, { headers: { Authorization: `Bearer ${token}` } });
            alert('Profile updated successfully!');
            navigate('/mentorProfile')
        } catch (error) {
            if(error.response.status === 500){
                navigate("/serverError")
            }
            else if(error.response.status === 401){
                navigate("/unauthorized")
            }
        }
    };

    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('User') || localStorage.getItem('type')!=='mentor'){
            localStorage.clear();
            navigate('/login')
        }
        const loadData = async () => {
            const token = localStorage.getItem('User'); // assuming token is stored this way
            try {
                const response = await axios.get('/mentor/edit_profile', { headers: { Authorization: `Bearer ${token}` } });
                var user = response.data;
                setProfile({
                    affiliation: user['Affiliation'] || '',
                        areasOfExpertise: user['ResearchAreas'] || '',
                        mobileNumber: user['MobileNumber'] || '',
                        googleScholar: user['GoogleScholar'] || '',
                        personalWebsite : user['PersonalPage'] || ''
                });
            } catch (error) {
                if(error.response.status === 500){
                    navigate("/serverError")
                }
                else if(error.response.status === 401){
                    navigate("/unauthorized")
                }
            }
        };
        loadData();
    },[])

    return (
        <Container>
            <ResponsiveAppBar pages={['APPLICATIONS']}/>
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
                        <TextField
                            fullWidth
                            label="Google Scholar"
                            name="googleScholar"
                            value={profile.googleScholar}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Personal Website"
                            name="personalWebsite"
                            value={profile.personalWebsite}
                            onChange={handleChange}
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
