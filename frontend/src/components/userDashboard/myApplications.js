import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ResponsiveAppBar from "../navbar/navbar";
import { useNavigate } from 'react-router';

const UserDashboard = () => {
  const [allApplications, setAllApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (application) => {
    setSelectedApplication(application);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('User')){
      navigate('/login')
    }
    const loadData = async () => {
      const token = localStorage.getItem('User'); // assuming token is stored this way
      try {
          const response = await axios.get('/mentee/applications', { headers: { Authorization: `Bearer ${token}` } });
          setAllApplications(response.data)
      } catch (error) {
          console.error('Error fetching profile data:', error);
      }
    };
    loadData()
  },[])
  return (
    <Container>
      <ResponsiveAppBar />
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        My Applications
      </Typography>
      <List>
        {allApplications.map((application) => (
          <ListItem
            key={application.id}
            button
            onClick={() => handleOpen(application)}
            sx={{ boxShadow: 2, mb: 2, borderRadius: 2 }}
          >
            <ListItemText
              primary={`${application.firstName} ${application.lastName} - ${application.yearOfPhD} Year`}
              secondary={`1st Preference: ${application.firstPreference}, 2nd Preference: ${application.secondPreference}`}
            />
          </ListItem>
        ))}
      </List>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Application Details
            </Typography>
          </Toolbar>
        </AppBar>
        {selectedApplication && (
          <Box sx={{ p: 2 }}>
            <Typography gutterBottom variant="h5">
              Application Details
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>
                Research Problem that you are working on or interested in
                working?
              </strong>{" "}
              <br /> {selectedApplication.researchProblem}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography>
                1st Preference: {selectedApplication.firstPreference}
              </Typography>
              {selectedApplication.firstPreferenceStatus === "Accepted" ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CancelIcon color="error" />
              )}
              <Typography>
                2nd Preference: {selectedApplication.secondPreference}
              </Typography>
              {selectedApplication.secondPreferenceStatus === "Accepted" ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CancelIcon color="error" />
              )}
            </Box>
          </Box>
        )}
      </Dialog>
    </Container>
  );
};

export default UserDashboard;
