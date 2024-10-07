import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddNewMentorPage = () => {
    const [mentor, setMentor] = useState({
        firstName: '',
        lastName: '',
        affiliation: '',
        email: '',
        researchAreas: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMentor({ ...mentor, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('User');
        try {
            const response = await axios.post('/admin/add_mentor', mentor, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status===200){
                alert('Mentor Added successfully!');
                setMentor({
                    firstName: '',
                    lastName: '',
                    affiliation: '',
                    email: '',
                    researchAreas: ''
                })
            }
            
        } catch (error) {
            console.error('Error adding mentor:', error);
        }
    };
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('User')){
            navigate('/login')
        }
    },[])

    return (
        <Container>
            <ResponsiveAppBar pages={['APPLICATIONS', 'ADD MENTOR']}/>
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
                <TextField
                    fullWidth
                    label="Research Areas"
                    name="researchAreas"
                    value={mentor.researchAreas}
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
