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
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ResponsiveAppBar from "../navbar/navbar";
import axios from "axios";
import { useNavigate } from "react-router";
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

const dummyApplications = [
  {
    id: 1,
    firstName: "Parth",
    lastName: "Maradia",
    affiliation: "IIIT Hyderabad",
    yearOfPhd: "2nd year",
    email: "parth.m@research.iiit.ac.in",
    gender: "Male",
    phdRegistration: "Part-time",
    justification:
      "I am interested in AI and ML because they are transforming the way we understand data.",
    coursework: "Advanced Machine Learning, 85%",
    researchExperience:
      "Published 2 papers on AI ethics and participated in AI workshops.",
    onlineCourses: "Completed Coursera AI Specialization",
    firstPreference: "Prof. Abhijan Chakraborty, IIT Delhi",
    secondPreference: "Prof. Arindam Khan, IISc Bangalore",
    references: "Prof. Kavita Vemuri, IIIT Hyderabad, kavita@iiit.ac.in",
    goals:
      "Gain hands-on experience with AI models and get guidance for my dissertation.",
    cv: "https://drive.google.com/file/d/1Oxo22D6pHM_2-WAEx0xhBajorfDwCwXn/view?usp=sharing",
    statementOfPurpose:
      "https://docs.google.com/document/d/1evnJ39CnWzj5-L7Y1sxwfGJtnbEBQTZz1DkaciGdShs/edit?usp=sharing",
    consentLetter:
      "https://india.acm.org/binaries/content/assets/india/noc_mentee.pdf",
    researchProblem: "Working on AI fairness and biases in models.",
    specificActivities:
      "Learn about real-world applications of AI in societal contexts.",
    advisorName: "Dr. Jane Smith",
    advisorEmail: "jane.smith@iitb.ac.in",
    coAdvisorName: "Dr. Alan Turing",
    coAdvisorEmail: "alan.turing@iitb.ac.in",
    status: "Accepted",
  },
  {
    id: 2,
    firstName: "Nipun",
    lastName: "Tulsian",
    affiliation: "IIIT Hyderabad",
    yearOfPhd: "1st year",
    email: "nipun.tulsian@students.iiit.ac.in",
    gender: "Male",
    phdRegistration: "Full-time",
    justification:
      "I have always been passionate about cybersecurity and protecting data integrity.",
    coursework: "Cryptography, 90%",
    researchExperience: "Research assistant in the Cybersecurity Lab at IISc.",
    onlineCourses: "Completed Udemy course on Ethical Hacking",
    firstPreference: "Prof. Ankit Gangwal, IIIT Hyderabad",
    secondPreference: "Prof. Arindam Khan, IISc Bangalore",
    references: "Prof. Kavita Vemuri, IIIT Hyderabad, kavita@iiit.ac.in",
    goals: "Understand deeper aspects of cryptography to apply in my research.",
    cv: "https://drive.google.com/file/d/1Oxo22D6pHM_2-WAEx0xhBajorfDwCwXn/view?usp=sharing",
    statementOfPurpose:
      "https://docs.google.com/document/d/1evnJ39CnWzj5-L7Y1sxwfGJtnbEBQTZz1DkaciGdShs/edit?usp=sharing",
    consentLetter:
      "https://india.acm.org/binaries/content/assets/india/noc_mentee.pdf",
    researchProblem:
      "Working on encryption algorithms and their vulnerabilities.",
    specificActivities:
      "Collaborate on improving algorithm efficiency and security.",
    advisorName: "Dr. Sam Wilson",
    advisorEmail: "sam.wilson@iisc.ac.in",
    status: "Accepted",
  },
  {
    id: 3,
    firstName: "Shakira",
    lastName: "LastName",
    affiliation: "Waka Waka",
    yearOfPhd: "5th year",
    email: "nipun.tulsian@students.iiit.ac.in",
    gender: "Female",
    phdRegistration: "Full-time",
    justification:
      "I have always been passionate about cybersecurity and protecting data integrity.",
    coursework: "Cryptography, 90%",
    researchExperience: "Research assistant in the Cybersecurity Lab at IISc.",
    onlineCourses: "Completed Udemy course on Ethical Hacking",
    firstPreference: "Prof. Ankit Gangwal, IIIT Hyderabad",
    secondPreference: "Prof. Arindam Khan, IISc Bangalore",
    references: "Prof. Kavita Vemuri, IIIT Hyderabad, kavita@iiit.ac.in",
    goals: "Understand deeper aspects of cryptography to apply in my research.",
    cv: "https://drive.google.com/file/d/1Oxo22D6pHM_2-WAEx0xhBajorfDwCwXn/view?usp=sharing",
    statementOfPurpose:
      "https://docs.google.com/document/d/1evnJ39CnWzj5-L7Y1sxwfGJtnbEBQTZz1DkaciGdShs/edit?usp=sharing",
    consentLetter:
      "https://india.acm.org/binaries/content/assets/india/noc_mentee.pdf",
    researchProblem:
      "Working on encryption algorithms and their vulnerabilities.",
    specificActivities:
      "Collaborate on improving algorithm efficiency and security.",
    advisorName: "Dr. Sam Wilson",
    advisorEmail: "sam.wilson@iisc.ac.in",
    status: "Rejected",
  },
  {
    id: 4,
    firstName: "Yash",
    lastName: "Sharma",
    affiliation: "IIT Hyderabad",
    yearOfPhd: "4th year",
    email: "nipun.tulsian@students.iiit.ac.in",
    gender: "Male",
    phdRegistration: "Full-time",
    justification:
      "I have always been passionate about cybersecurity and protecting data integrity.",
    coursework: "Cryptography, 90%",
    researchExperience: "Research assistant in the Cybersecurity Lab at IISc.",
    onlineCourses: "Completed Udemy course on Ethical Hacking",
    firstPreference: "Prof. Ankit Gangwal, IIIT Hyderabad",
    secondPreference: "Prof. Arindam Khan, IISc Bangalore",
    references: "Prof. Kavita Vemuri, IIIT Hyderabad, kavita@iiit.ac.in",
    goals: "Understand deeper aspects of cryptography to apply in my research.",
    cv: "https://drive.google.com/file/d/1Oxo22D6pHM_2-WAEx0xhBajorfDwCwXn/view?usp=sharing",
    statementOfPurpose:
      "https://docs.google.com/document/d/1evnJ39CnWzj5-L7Y1sxwfGJtnbEBQTZz1DkaciGdShs/edit?usp=sharing",
    consentLetter:
      "https://india.acm.org/binaries/content/assets/india/noc_mentee.pdf",
    researchProblem:
      "Working on encryption algorithms and their vulnerabilities.",
    specificActivities:
      "Collaborate on improving algorithm efficiency and security.",
    advisorName: "Dr. Sam Wilson",
    advisorEmail: "sam.wilson@iisc.ac.in",
    status: "Pending",
  },
];

const MentorDashboard = () => {
  const [allApplications, setAllApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [open, setOpen] = useState(false);
  const [openFileViewer, setOpenFileViewer] = useState(false);
  const [fileToView, setFileToView] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const Modalstyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = (app) => {
    setSelectedApplication(app);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenFileViewer = (fileUrl) => {
    fileUrl = `${process.env.REACT_APP_API_URL}/${fileUrl}`;
    window.open(fileUrl, "_blank");
  };

  const handleCloseFileViewer = () => {
    setOpenFileViewer(false);
  };

  const handleFinalAccept = async (selectedApplication) => {
    const token = localStorage.getItem("User"); // assuming token is stored this way
    // console.log("Selected Application: ", selectedApplication.firstName);
    try {
        await axios.post(
          "/mentor/acceptApplication",
          { id: selectedApplication.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const acceptedApplication = allApplications.find(
          (app) => app.id === selectedApplication.id
        );
        if (acceptedApplication) {
          acceptedApplication.status = "Accepted";
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Handle 400 error
        } else if (error.response && error.response.status === 401) {
            // Handle 401 error
        }
    }
    await handleCloseModal();
    await handleClose();

  };

  const handleFinalReject = async (selectedApplication) => {
    const token = localStorage.getItem("User"); // assuming token is stored this way
    // console.log("Rejected Application :", selectedApplication.firstName);
    try {
        await axios.post(
          "/mentor/rejectApplication",
          { id: selectedApplication.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const rejectedApplication = allApplications.find(
          (app) => app.id === selectedApplication.id
        );
        if (rejectedApplication) {
          rejectedApplication.status = "Rejected";
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Handle 400 error
        } else if (error.response && error.response.status === 401) {
            // Handle 401 error
        }
    }
    await handleCloseModal();
    await handleClose();
  };
  // maintain a list of 10 mui colour from their palette and assign them to the AppBar and Card components
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("User")) {
      navigate('/login')
      // console.log("uncomment navigate to login");
    }
    const loadData = async () => {
      const token = localStorage.getItem("User"); // assuming token is stored this way
      try {
        const response = await axios.get("/mentor/applications", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllApplications(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    loadData();
  }, []);

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
        {dummyApplications.map((app, index) => (
          // {allApplications.map((app, index) => (
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
            {app.status === "Pending" && (
              <PendingActionsIcon sx={{ color: "#ffc400", ml: 2 }} />
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
              <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Box>
                  <Button variant="contained" onClick={() => setOpenModal('accept')} sx={{
                    backgroundColor: "green",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}>
                    <CheckCircleIcon sx={{ mr: 1 }} /> Accept
                  </Button>
                  <Modal
                    open={openModal === 'accept'}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={Modalstyle}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Confirm Selection
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you wish to <strong>accept</strong> {selectedApplication.firstName}? The decision can be edited later.
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button onClick={() => handleFinalAccept(selectedApplication)} variant="contained">
                          Confirm
                        </Button>
                        <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Box>

                <Box>
                  <Button variant="contained" onClick={() => setOpenModal('reject')} sx={{
                    backgroundColor: "red",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}>
                    <CancelIcon sx={{ mr: 1 }} /> Reject
                  </Button>
                  <Modal
                    open={openModal === 'reject'}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={Modalstyle}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Confirm Rejection
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Are you sure you wish to <strong>reject</strong> {selectedApplication.firstName}? The decision can be edited later.
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button onClick={() => handleFinalReject(selectedApplication)} variant="contained">
                          Confirm
                        </Button>
                        <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </Box>
              </Box>
            </Box>
                {/* <Button
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
                </Button> */}
                {/* <Button
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
                </Button> */}

              </Box>
            </Box>
          </Box>
        )}
      </Dialog>
    </Container>
  );
};

export default MentorDashboard;
