import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import ResponsiveAppBar from "../navbar/navbar";
import axios from 'axios';
import { useNavigate } from 'react-router';

const MentorDashboard = () => {
  const [allApplications, setAllApplications] = useState([])
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [open, setOpen] = useState(false);
  const [openFileViewer, setOpenFileViewer] = useState(false);
  const [fileToView, setFileToView] = useState("");

  const handleOpen = (app) => {
    setSelectedApplication(app);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenFileViewer = (fileUrl) => {
    fileUrl = `${process.env.REACT_APP_API_URL}/${fileUrl}`
    window.open(fileUrl, "_blank");
  };

  const handleCloseFileViewer = () => {
    setOpenFileViewer(false);
  };

  const handleAccept = async (selectedApplication) => {
    const token = localStorage.getItem('User'); // assuming token is stored this way
    if (
      window.confirm(
        "Are you sure you wish to Accept this candidate? The decision can be edited later."
      )
    ) {
      try{
        await axios.post('/mentor/acceptApplication', {id:selectedApplication.id}, { headers: { Authorization: `Bearer ${token}` } });
        allApplications.find((app) => app.id === selectedApplication.id).status = "Accepted";
      }
      catch (error) {
        if (error.response && error.response.status === 400) {
        }
        else if (error.response && error.response.status === 401){
        }
      }
    }
  };

  const handleReject = async (selectedApplication) => {
    const token = localStorage.getItem('User'); // assuming token is stored this way
    if (
      window.confirm(
        "Are you sure you wish to Reject this candidate? The decision can be edited later."
      )
    ) {
      try{
        await axios.post('/mentor/rejectApplication', {id:selectedApplication.id}, { headers: { Authorization: `Bearer ${token}` } });
        allApplications.find((app) => app.id === selectedApplication.id).status = "Rejected";
      }
      catch (error) {
        if (error.response && error.response.status === 400) {
        }
        else if (error.response && error.response.status === 401){
        }
      }
    }
  };
  // maintain a list of 10 mui colour from their palette and assign them to the AppBar and Card components
  const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem('User')){
      navigate('/login')
    }
    const loadData = async () => {
      const token = localStorage.getItem('User'); // assuming token is stored this way
      try {
          const response = await axios.get('/mentor/applications', { headers: { Authorization: `Bearer ${token}` } });
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
        Anveshan Setu Applications
      </Typography>
      <Typography variant="h6">
        Hi Prof. Parth Maradia, you have {allApplications.length} applications
      </Typography>

      <List>
        {allApplications.map((app, index) => (
          <ListItem
            key={index}
            button
            onClick={() => handleOpen(app)}
            sx={{
              borderRadius: 2,
              boxShadow: 2,
              transition: "0.3s",
              "&:hover": {
                boxShadow: 4,
                transform: "scale(1.02)",
                cursor: "pointer",
              },
            }}
          >
            <ListItemText
              primary={`${app.firstName} ${app.lastName}`}
              secondary={`Affiliation: ${app.affiliation}, Year of PhD: ${app.yearOfPhd}`}
            />
            {app.status === "Accepted" && (
              <CheckCircleIcon sx={{ color: "green", ml: 2 }} />
            )}
            {app.status === "Rejected" && (
              <CancelIcon sx={{ color: "red", ml: 2 }} />
            )}
          </ListItem>
        ))}
      </List>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="application-details"
        aria-describedby="application-details-description"
        fullWidth
        maxWidth="md"
      >
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
          <Box
            sx={{
              p: 2,
              maxHeight: "80vh",
              overflowY: "auto",
              fontFamily: "Arial, sans-serif",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ mb: 1, lineHeight: 1.5 }}>
              {" "}
              {selectedApplication.firstName} {selectedApplication.lastName}
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 1, lineHeight: 1.5, color: "grey" }}
            >
              <strong>{selectedApplication.yearOfPhD}</strong>{" "}
              {selectedApplication.phdRegistration} Ph.D. student at{" "}
              {selectedApplication.affiliation}
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>
                Research Problem that you are working on or interested in
                working?
              </strong>{" "}
              <br /> {selectedApplication.researchProblem}
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>Relevant coursework with grades/marks: </strong> <br />{" "}
              {selectedApplication.coursework}
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>Any previous research experience? </strong> <br />{" "}
              {selectedApplication.researchExperience}
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>Online Courses/ self-study material:</strong> <br />{" "}
              {selectedApplication.onlineCourses}
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>
                Give 2 references of faculty / industry contacts who can vouch
                for your application.
              </strong>{" "}
              <br></br> {selectedApplication.references}
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>
                Justify your area of work / interest with the faculty you have
                chosen.{" "}
              </strong>{" "}
              <br /> {selectedApplication.justification}
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>
                What do you hope to achieve by the end of the visit?{" "}
              </strong>{" "}
              <br />
              {selectedApplication.goals}
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>
                What specific activites are you interested and looking forward
                to during the visit?
              </strong>{" "}
              <br />
              {selectedApplication.specificActivities}
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>Advisor Name:</strong> {selectedApplication.advisorName}
            </Typography>
            <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
              <strong>Advisor Email:</strong> {selectedApplication.advisorEmail}
            </Typography>

            {selectedApplication.coAdvisorName &&
              selectedApplication.coAdvisorEmail && (
                <>
                  <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
                    <strong>Co-Advisor Name:</strong>{" "}
                    {selectedApplication.coAdvisorName}
                  </Typography>
                  <Typography sx={{ mb: 1, lineHeight: 1.5 }}>
                    <strong>Co-Advisor Email:</strong>{" "}
                    {selectedApplication.coAdvisorEmail}
                  </Typography>
                </>
              )}
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <Button
                variant="contained"
                onClick={() => handleOpenFileViewer(selectedApplication.cv)}
                sx={{ minWidth: 150 }}
              >
                View Resume
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  handleOpenFileViewer(selectedApplication.statementOfPurpose)
                }
                sx={{ minWidth: 150 }}
              >
                View SoP
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  handleOpenFileViewer(selectedApplication.consentLetter)
                }
                sx={{ minWidth: 150 }}
              >
                View Consent Letter
              </Button>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Button
                  variant="contained"
                  onClick={() => handleAccept(selectedApplication)}
                  sx={{
                    backgroundColor: "green",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CheckCircleIcon sx={{ mr: 1 }} /> Accept
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleReject(selectedApplication)}
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CancelIcon sx={{ mr: 1 }} /> Reject
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Dialog>
    </Container>
  );
};

export default MentorDashboard;
