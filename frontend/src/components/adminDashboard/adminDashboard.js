import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Dialog, AppBar, Toolbar, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ResponsiveAppBar from '../navbar/navbar';
import Button from '@mui/material/Button';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from "react-router";
import axios from "axios";

const AdminDashboard = () => {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [allApplications, setAllApplications] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = (application) => {
        setSelectedApplication(application);
        setOpen(true);
    };

    const handleOpenFileViewer = (fileUrl) => {
        fileUrl = `${process.env.REACT_APP_API_URL}/${fileUrl}`;
        console.log(fileUrl)
        window.open(fileUrl, "_blank");
      };
    
    const handleTieBreaker = async (pref) => {
        const token = localStorage.getItem("User"); // assuming token is stored this way
        try {
            const response = await axios.post("/admin/tie_breaker", {"preference" : pref, "Id":selectedApplication.id}, {
            headers: { Authorization: `Bearer ${token}` },
            });
            const currentApplication = allApplications.find(
                (app) => app.id === selectedApplication.id
              );
              if (currentApplication) {
                if(pref===1){
                    currentApplication.pref1status='Accepted';
                    currentApplication.pref2status='Rejected';
                }
                else if(pref==2){
                    currentApplication.pref1status='Rejected';
                    currentApplication.pref2status='Accepted';
                }
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    };
    const navigate = useNavigate();
    useEffect(()=>{
        if (!localStorage.getItem("User")) {
            navigate('/login')
        }
        const loadData = async () => {
            const token = localStorage.getItem("User"); // assuming token is stored this way
            try {
              const response = await axios.get("/admin/applications", {
                headers: { Authorization: `Bearer ${token}` },
              });
              setAllApplications(response.data);
            } catch (error) {
              console.error("Error fetching profile data:", error);
            }
        }
        loadData();
    }, [])
    return (
        <Container>
            <ResponsiveAppBar pages={['APPLICATIONS', 'ADD MENTOR']} />
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>All Applications</Typography>
            <List>
                {allApplications.map((application) => (
                    <ListItem key={application.id} button onClick={() => handleOpen(application)} sx={{ boxShadow: 3, borderRadius: 2, mb: 2 , cursor: 'pointer'}}>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                {application.firstName} {application.lastName} - {application.yearOfPhD}
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
                        <Typography gutterBottom>1st Preference: {selectedApplication.firstPreference} - {selectedApplication.pref1status === "Accepted" ? <CheckCircleIcon color="success" /> : selectedApplication.pref1status === "Rejected" ? <CancelIcon color="error" /> : <PendingActionsIcon sx={{ color: "#ffc400" }} />}
                        </Typography>
                        <Typography gutterBottom>2nd Preference: {selectedApplication.secondPreference} - {selectedApplication.pref2status === "Accepted" ? <CheckCircleIcon color="success" /> : selectedApplication.pref2status === "Rejected" ? <CancelIcon color="error" /> : <PendingActionsIcon sx={{ color: "#ffc400"}}/>}
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
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={()=> handleOpenFileViewer(selectedApplication.cv)}>View CV</Button>  
                        <Button variant="contained" color="primary" sx={{ mt: 2, ml: 2 }} onClick={()=> handleOpenFileViewer(selectedApplication.statementOfPurpose)}>View Statement of Purpose</Button>
                        <Button variant="contained" color="primary" sx={{ mt: 2, ml: 2 }} onClick={()=> handleOpenFileViewer(selectedApplication.consentLetter)}>View Consent Letter</Button>
                        </Box>
                    </Box>
                </Dialog>
            )}
        </Container>
    );
};

export default AdminDashboard;
