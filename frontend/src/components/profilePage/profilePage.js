import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, TextField, MenuItem, FormControl, InputLabel, Select, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';
import axios from 'axios';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        affiliation: '',
        mobileNumber: '',
        gender: '',
        phdRegistration: '',
        yearOfPhd: '',
        acmMailingList: false
    });
    const [genderOther, setGenderOther] = useState('');
    const [phdOther, setPhdOther] = useState('');

    useEffect(() => {
        // Placeholder for loading existing user data if available
        const loadData = async () => {
            const token = localStorage.getItem('token'); // assuming token is stored this way
            try {
                const response = await axios.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        loadData();
        setProfile({
            firstName: 'Admin',
            lastName: 'Admin',
            email: 'admin@acm.org'
        });
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (event) => {
        setProfile(prevState => ({
            ...prevState,
            acmMailingList: event.target.checked
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/profile', profile, { headers: { Authorization: `Bearer ${token}` } });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Container>
            <ResponsiveAppBar />
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, paddingBottom: 2 }}>
                <Typography variant="h4">Profile</Typography>
                <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={profile.firstName}
                    required
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ backgroundColor: '#eeeeee' }} // lighter shade of grey
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    required
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ backgroundColor: '#eeeeee' }} // lighter shade of grey
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                    margin="normal"
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ backgroundColor: '#eeeeee' }} // lighter shade of grey
                />

                {/* <Typography variant="h6">Edit Profile</Typography> */}
                <TextField
                    fullWidth
                    label="Affiliation/Institute Name"
                    name="affiliation"
                    value={profile.affiliation}
                    onChange={handleChange}
                    required
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Mobile Number"
                    name="mobileNumber"
                    value={profile.mobileNumber}
                    onChange={handleChange}
                    required
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Gender *</InputLabel>
                    <Select
                        name="gender"
                        value={profile.gender}
                        label="Gender"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {profile.gender === 'Other' && (
                        <TextField
                            fullWidth
                            label="Please specify"
                            value={genderOther}
                            onChange={e => setGenderOther(e.target.value)}
                            margin="normal"
                        />
                    )}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>PhD Registration *</InputLabel>
                    <Select
                        name="phdRegistration"
                        value={profile.phdRegistration}
                        label="PhD Registration *"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Full-Time">Full-Time</MenuItem>
                        <MenuItem value="Part-Time">Part-Time</MenuItem>
                        <MenuItem value="Sponsored">Sponsored</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {profile.phdRegistration === 'Other' && (
                        <TextField
                            fullWidth
                            label="Please specify"
                            value={phdOther}
                            onChange={e => setPhdOther(e.target.value)}
                            margin="normal"
                        />
                    )}
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Which Year of Ph.D. are you in? *</InputLabel>
                    <Select
                        name="yearOfPhd"
                        value={profile.yearOfPhd}
                        label="Which Year of Ph.D. are you in? *"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="1st year">1st year</MenuItem>
                        <MenuItem value="2nd year">2nd year</MenuItem>
                        <MenuItem value="3rd year">3rd year</MenuItem>
                        <MenuItem value="4th year">4th year</MenuItem>
                        <MenuItem value="5th year">5th year</MenuItem>
                    </Select>
                </FormControl>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={profile.acmMailingList} onChange={handleCheckboxChange} />} label="Please Add me to ACM mailing list" />
                </FormGroup>
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Profile</Button>
            </Box>
        </Container>
    );
}

export default ProfilePage;
