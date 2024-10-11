import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router';
import MenuItem from '@mui/material/MenuItem';
import { alignProperty } from '@mui/material/styles/cssUtils';

const AddNewMentorPage = () => {
    const [mentor, setMentor] = useState({
        firstName: '',
        lastName: '',
        affiliation: '',
        email: '',
        researchAreas: '',
        access: ''
    });
    const [csvFile, setCsvFile] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMentor({ ...mentor, [name]: value });
    };

    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('User');
        const formData = new FormData();
        formData.append('csv', csvFile);
        formData.append('data', JSON.stringify(mentor));
        try {
            const response = await axios.post('/admin/add_mentor', formData, { headers: { Authorization: `Bearer ${token}` } });
            if (response.status === 200) {
                alert('Mentor Added successfully!');
                setMentor({
                    firstName: '',
                    lastName: '',
                    affiliation: '',
                    email: '',
                    researchAreas: '',
                    access: ''
                });
                setCsvFile(null);
            }
        } catch (error) {
            console.error('Error adding mentor:', error);
            if (error.response.status === 500) {
                navigate("/serverError");
            } else if (error.response.status === 401) {
                navigate("/unauthorized");
            }
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/login');
        }
    }, []);

    return (
        <Container>
            <ResponsiveAppBar pages={['APPLICATIONS', 'ADD MENTOR', 'ALL USERS']} />
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Add New Mentor</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                {/* Existing fields */}
                <TextField fullWidth label="First Name" name="firstName" value={mentor.firstName} onChange={handleChange} required sx={{ mb: 2 }} />
                <TextField fullWidth label="Last Name" name="lastName" value={mentor.lastName} onChange={handleChange} required sx={{ mb: 2 }} />
                <TextField fullWidth label="Affiliation" name="affiliation" value={mentor.affiliation} onChange={handleChange} required sx={{ mb: 2 }} />
                <TextField fullWidth type="email" label="Email Id" name="email" value={mentor.email} onChange={handleChange} required sx={{ mb: 2 }} />
                <TextField fullWidth label="Research Areas" name="researchAreas" value={mentor.researchAreas} onChange={handleChange} required sx={{ mb: 2 }} />
                <TextField select fullWidth label="Access" name="access" value={mentor.access} onChange={handleChange} required sx={{ mb: 2 }}>
                    <MenuItem value="Mentor">Mentor</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
                
                {/* CSV upload section */}
                <Typography variant="body2" sx={{ textAlign: 'right' }}>(Format: firstName, lastName, affiliation, email, researchAreas, access)</Typography>
                <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    <Button variant="contained" component="label">
                        Upload CSV
                        <input type="file" hidden accept=".csv" onChange={handleFileChange} />
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AddNewMentorPage;
