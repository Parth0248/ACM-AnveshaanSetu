import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Tooltip, IconButton, Select, MenuItem, InputLabel, FormControl, FormHelperText, FormGroup, Checkbox, FormControlLabel, Input } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import ResponsiveAppBar from '../navbar/navbar';

const ApplicationPage = () => {
    const [formData, setFormData] = useState({
        justification: '',
        coursework: '',
        researchExperience: '',
        onlineCourses: '',
        firstPreference: '',
        secondPreference: '',
        references: '',
        goals: '',
        cv: null,
        statementOfPurpose: null,
        consentLetter: null,
        researchProblem: '',
        specificActivities: '',
        advisorName: '',
        advisorEmail: '',
        coAdvisorName: '',
        coAdvisorEmail: '',
        agree: false
    });

    const facultyOptions = [
        { label: "Prof. Abhijan Chakraborty, IIT Delhi - Responsible AI, Social Computing, AI and Law", value: "AbhijanChakraborty" },
        // Add all other faculty options here
    ];

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (files) {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSubmit = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSubmit.append(key, formData[key]);
        });
        try {
            const response = await axios.post('/api/submit-application', formDataToSubmit, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Application Submitted', response.data);
        } catch (error) {
            console.error('Submission error', error);
        }
    };

    return (
        <Container>
            <ResponsiveAppBar />
            <Box sx={{ mt: 4, paddingBottom: 2 }}>
            <Typography variant="h4" gutterBottom>Application Form</Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Justify your area of work / interest *"
                        name="justification"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.justification}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Relevant coursework with grades/marks *"
                        name="coursework"
                        fullWidth
                        value={formData.coursework}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Any previous research experience"
                        name="researchExperience"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.researchExperience}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Any online courses / self-study material that is relevant"
                        name="onlineCourses"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.onlineCourses}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth required>
                        <InputLabel>Faculty whom you would like to visit (1st preference) *</InputLabel>
                        <Select
                            name="firstPreference"
                            value={formData.firstPreference}
                            onChange={handleChange}
                        >
                            {facultyOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth required>
                        <InputLabel>Faculty whom you would like to visit (2nd preference) *</InputLabel>
                        <Select
                            name="secondPreference"
                            value={formData.secondPreference}
                            onChange={handleChange}
                        >
                            {facultyOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="References from faculty / industry contacts *"
                        name="references"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.references}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="What do you hope to achieve by the end of the visit? *"
                        name="goals"
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.goals}
                        onChange={handleChange}
                        required
                    />
                    <InputLabel htmlFor="cv-upload">Upload your CV *</InputLabel>
                    <Input
                        id="cv-upload"
                        name="cv"
                        type="file"
                        onChange={handleChange}
                        required
                    />
                    <InputLabel htmlFor="sop-upload">Upload your Statement of Purpose *</InputLabel>
                    <Input
                        id="sop-upload"
                        name="statementOfPurpose"
                        type="file"
                        onChange={handleChange}
                        required
                    />
                    <InputLabel htmlFor="consent-upload">Upload your No-Objection / Consent letter *</InputLabel>
                    <Input
                        id="consent-upload"
                        name="consentLetter"
                        type="file"
                        onChange={handleChange}
                        required
                    />
                    <FormControlLabel
                        control={<Checkbox checked={formData.agree} onChange={(e) => setFormData(prev => ({ ...prev, agree: e.target.checked }))} />}
                        label="All information I have provided are correct."
                    />
                    <Button type="submit" variant="contained">Submit Application</Button>
                </Box>
            </form>
            </Box>
        </Container>
    );
};

export default ApplicationPage;
