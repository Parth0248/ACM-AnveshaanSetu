import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Dialog, AppBar, Toolbar, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ResponsiveAppBar from '../navbar/navbar';
import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/Error';

// Dummy data for applications
const dummyApplications = [
    {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        yearOfPhD: "2nd",
        affiliation: "University of Hyderabad",
        firstPreference: "Prof. Smith",
        secondPreference: "Prof. Johnson",
        pref1status: "Accepted",
        pref2status: "Pending",
        researchProblem: "Working on encryption algorithms and their vulnerabilities.",
        cv: "https://drive.google.com/file/d/1Oxo22D6pHM_2-WAEx0xhBajorfDwCwXn/view?usp=sharing",
        statementOfPurpose: "https://docs.google.com/document/d/1evnJ39CnWzj5-L7Y1sxwfGJtnbEBQTZz1DkaciGdShs/edit?usp=sharing",
        consentLetter: "https://india.acm.org/binaries/content/assets/india/noc_mentee.pdf"
    },
    {
        id: 2,
        firstName: "Alice",
        lastName: "Smith",
        yearOfPhD: "1st",
        affiliation: "Stanford University",
        firstPreference: "Prof. Brown",
        secondPreference: "Prof. White",
        pref1status: "Pending",
        pref2status: "Pending",
        researchProblem: "Exploring machine learning algorithms for data analysis.",
        cv: "https://drive.google.com/file/d/1A1B2C3D4E5F6G7H8I9J/view?usp=sharing",
        statementOfPurpose: "https://docs.google.com/document/d/1K2L3M4N5O6P7Q8R9S0T/edit?usp=sharing",
        consentLetter: "https://example.com/consent_letter_alice.pdf"
    },
    {
        id: 3,
        firstName: "Bob",
        lastName: "Johnson",
        yearOfPhD: "3rd",
        affiliation: "MIT",
        firstPreference: "Prof. Green",
        secondPreference: "Prof. Blue",
        pref1status: "Accepted",
        pref2status: "Rejected",
        researchProblem: "Investigating quantum computing applications.",
        cv: "https://drive.google.com/file/d/1Z2Y3X4W5V6U7T8S9R0Q/view?usp=sharing",
        statementOfPurpose: "https://docs.google.com/document/d/1T2U3V4W5X6Y7Z8A9B0C/edit?usp=sharing",
        consentLetter: "https://example.com/consent_letter_bob.pdf"
    },
    {
        id: 4,
        firstName: "Charlie",
        lastName: "Davis",
        yearOfPhD: "4th",
        affiliation: "Harvard University",
        firstPreference: "Prof. Black",
        secondPreference: "Prof. Grey",
        pref1status: "Rejected",
        pref2status: "Accepted",
        researchProblem: "Studying the impact of AI on healthcare.",
        cv: "https://drive.google.com/file/d/1E2F3G4H5I6J7K8L9M0N/view?usp=sharing",
        statementOfPurpose: "https://docs.google.com/document/d/1O2P3Q4R5S6T7U8V9W0X/edit?usp=sharing",
        consentLetter: "https://example.com/consent_letter_charlie.pdf"
    },
    {
        id: 5,
        firstName: "Diana",
        lastName: "Evans",
        yearOfPhD: "2nd",
        affiliation: "University of California, Berkeley",
        firstPreference: "Prof. Red",
        secondPreference: "Prof. Yellow",
        pref1status: "Accepted",
        pref2status: "Accepted",
        researchProblem: "Analyzing social media trends using big data.",
        cv: "https://drive.google.com/file/d/1P2Q3R4S5T6U7V8W9X0Y/view?usp=sharing",
        statementOfPurpose: "https://docs.google.com/document/d/1Z2A3B4C5D6E7F8G9H0I/edit?usp=sharing",
        consentLetter: "https://example.com/consent_letter_diana.pdf"
    },
    // Additional dummy applications can be added here
];

const AdminDashboard = () => {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (application) => {
        setSelectedApplication(application);
        setOpen(true);
    };
    
    const handleTieBreaker = (pref) => {
        if(pref === 1){
            // Handle tie breaker for preference 1
            console.log("Tie breaker for preference 1");
        } else {
            // Handle tie breaker for preference 2
            console.log("Tie breaker for preference 2");
        }
        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <ResponsiveAppBar />
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>All Applications</Typography>
            <List>
                {dummyApplications.map((application) => (
                    <ListItem key={application.id} button onClick={() => handleOpen(application)} sx={{ boxShadow: 3, borderRadius: 2, mb: 2 , cursor: 'pointer'}}>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                {application.firstName} {application.lastName} - Year {application.yearOfPhD}
                                {application.pref1status === "Accepted" && application.pref2status === "Accepted" && <ErrorIcon sx={{paddingLeft: "10px"}} color="error" />}
                            </React.Fragment>
                        }
                        secondary={`1st Preference: ${application.firstPreference}, 2nd Preference: ${application.secondPreference}`}
                    />
                </ListItem>
                ))}
            </List>
            {selectedApplication && (
                <Dialog 
                open={open}
                onClose={handleClose}
                aria-labelledby="application-details"
                aria-describedby="application-details-description"
                fullWidth
                maxWidth="md">
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Application Details
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{ p: 2 }}>
                        <Typography gutterBottom variant="h5">Name: {selectedApplication.firstName} {selectedApplication.lastName}</Typography>
                        <Typography gutterBottom>Year of PhD: {selectedApplication.yearOfPhD}</Typography>
                        <Typography gutterBottom>Affiliation: {selectedApplication.affiliation}</Typography>
                        <Typography gutterBottom>Research Problem: {selectedApplication.researchProblem}</Typography>
                        <Typography gutterBottom>1st Preference: {selectedApplication.firstPreference} - {selectedApplication.pref1status === "Accepted" ? <CheckCircleIcon color="success" /> : selectedApplication.pref1status === "Rejected" ? <CancelIcon color="error" /> : <PendingActionsIcon />}
                        </Typography>
                        <Typography gutterBottom>2nd Preference: {selectedApplication.secondPreference} - {selectedApplication.pref2status === "Accepted" ? <CheckCircleIcon color="success" /> : selectedApplication.pref2status === "Rejected" ? <CancelIcon color="error" /> : <PendingActionsIcon />}
                        </Typography>
                        {selectedApplication.pref1status === "Accepted" && selectedApplication.pref2status === "Accepted" && (
                            <div>
                            <Typography gutterBottom color="red">Note: Both preferences have been accepted, Please reassign one of the preferences.</Typography>
                            <Button variant="contained" color="secondary" sx={{ mt: 2, }} onClick={()=> handleTieBreaker(1)}>Preference 1</Button>
                            <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={() => handleTieBreaker(2) }>Preference 2</Button>
                            </div>
                        )}
                        <br></br>
                        <Box>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} href={selectedApplication.cv} target="_blank" rel="noreferrer">View CV</Button>  
                        <Button variant="contained" color="primary" sx={{ mt: 2, ml: 2 }} href={selectedApplication.statementOfPurpose} target="_blank" rel="noreferrer">View Statement of Purpose</Button>
                        <Button variant="contained" color="primary" sx={{ mt: 2, ml: 2 }} href={selectedApplication.consentLetter} target="_blank" rel="noreferrer">View Consent Letter</Button>
                        </Box>
                        
                        

                    </Box>
                </Dialog>
            )}
        </Container>
    );
};

export default AdminDashboard;
