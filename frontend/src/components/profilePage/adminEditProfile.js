import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AdminEditProfilePage = () => {
    const [profile, setProfile] = useState({
        email: '',
        affiliation: '',
        mobileNumber: ''
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('User');
        try {
            const response = await axios.post('/admin/edit_profile', profile, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status===200){
                localStorage.setItem('User', response.data)
                alert('Profile updated successfully!');
                navigate('/adminProfile');
            }
            
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(()=>{
        if(!localStorage.getItem('User')){
            navigate('/login')
        }
        const loadData = async () => {
            const token = localStorage.getItem('User'); // assuming token is stored this way
            try {
                const response = await axios.get('/admin/edit_profile', { headers: { Authorization: `Bearer ${token}` } });
                var user = response.data;
                setProfile({
                    affiliation: user['Affiliation'] || '',
                    email: user['Email'] || '',
                    mobileNumber: user['MobileNumber'] || ''
                });
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        loadData();
    },[])

    return (
        <Container>
            <ResponsiveAppBar pages={['APPLICATIONS', 'ADD MENTOR']}/>
            <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>Edit Admin Profile</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <TextField fullWidth label="Email" name="email" value={profile.email} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Affiliation" name="affiliation" value={profile.affiliation} onChange={handleChange} sx={{ mb: 2 }} />
                <TextField fullWidth label="Mobile Number" name="mobileNumber" value={profile.mobileNumber} onChange={handleChange} sx={{ mb: 2 }} />
                <Button type="submit" variant="contained" color="primary">Save Profile</Button>
            </Box>
        </Container>
    );
};

export default AdminEditProfilePage;
