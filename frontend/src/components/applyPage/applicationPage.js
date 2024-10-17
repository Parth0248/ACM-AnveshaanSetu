import React, { useState } from "react";
import { useNavigate } from 'react-router';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  FormControlLabel,
  Input,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import ResponsiveAppBar from "../navbar/navbar";
import LanguageIcon from '@mui/icons-material/Language';
import GoogleScholar from '../../logos/GoogleScholar.png';

const ApplicationPage = () => {
  const [formData, setFormData] = useState({
    justification: "",
    researchProblem: "",
    coursework: "",
    researchExperience: "",
    onlineCourses: "",
    firstPreference: "",
    secondPreference: "",
    references: "",
    goals: "",
    cv: null,
    statementOfPurpose: null,
    consentLetter: null,
    specificActivities: "",
    advisorName: "",
    advisorEmail: "",
    coAdvisorName: "",
    coAdvisorEmail: "",
    agree: false,
  });

  const [facultyOptions, setFacultyOptions] = useState([]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const fetchFacultyOptions = async () => {
    const token = localStorage.getItem('User'); // assuming token is stored this way
    try {
      const response = await axios.get("/mentee/get-mentors", { headers: { Authorization: `Bearer ${token}` } })
      if(response.status === 201){
        navigate("/myApplications")
      }
      setFacultyOptions(response.data)
    } catch (error) {
        if(error.response.status === 500){
          navigate("/serverError")
      }
      else if(error.response.status === 401){
          navigate("/unauthorized")
      }
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('User');
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });
    try {
      const response = await axios.post(
        "/mentee/submit-application",
        formDataToSubmit,
        {
          headers: {"Authorization": `Bearer ${token}`},
        }
      );
      navigate("/myApplications")
    } catch (error) {
      console.error("Submission error", error);
      if(error.response.status === 500){
        navigate("/serverError")
    }
    else if(error.response.status === 401){
        navigate("/unauthorized")
    }
    }
  };

  React.useEffect(()=>{
      if(!localStorage.getItem('User') || localStorage.getItem('type')!=='mentee'){
          localStorage.clear();
          navigate('/login')
      }
      fetchFacultyOptions()
  },[])

  return (
    <Container>
      <ResponsiveAppBar pages={['APPLICATIONS']}/>
      <Box sx={{ mt: 4, paddingBottom: 2 }}>
        <Typography variant="h4" gutterBottom>
          Application Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7" gutterBottom>
                Research Problem that you are working on or interested in
                working?
              </Typography>
              <Box>
                <Tooltip
                  title={<h3 style={{color: "white", fontSize: "0.9rem", padding: "10px"}}>This can be indicative only. Be as specific as possible and provide all relevant information, such as, links to papers you have read, written, or courses you have taken online, etc. <br/> * * Please share this only after getting a consent from your advisor.</h3>}
                sx={{ pl: 1 }}
              >
                <InfoIcon />
                </Tooltip>
              </Box>
            </Box>

            <TextField
              name="researchProblem"
              fullWidth
              multiline
              rows={3}
              value={formData.researchProblem}
              onChange={handleChange}
              required
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7" gutterBottom>
                Any previous research experience (e.g. internships, publications, etc.)
              </Typography>
              <Box>
                <Tooltip
                  title={<h3 style={{color: "white", fontSize: "0.9rem", padding: "10px"}}>Optional, but if you have any, please share.</h3>}
                sx={{ pl: 1 }}
              >
                <InfoIcon />
                </Tooltip>
              </Box>
            </Box>
            <TextField
              name="researchExperience"
              fullWidth
              multiline
              rows={3}
              value={formData.researchExperience}
              onChange={handleChange}
            />

            <Typography variant="h7" gutterBottom>
              Relevant coursework with grades/marks (e.g. Security, 74% , NLP, 89%)
            </Typography>

            <TextField
              name="coursework"
              fullWidth
              value={formData.coursework}
              onChange={handleChange}
              required
            />

            <Typography variant="h7" gutterBottom>
              Any online courses / self-study material that is relevant
            </Typography>

            <TextField
              name="onlineCourses"
              fullWidth
              multiline
              rows={2}
              value={formData.onlineCourses}
              onChange={handleChange}
            />

            <Typography variant="h7" gutterBottom>
              Faculty whom you would like to visit (1st preference) *
            </Typography>
            <FormControl fullWidth required>
              <Select
                name="firstPreference"
                value={formData.firstPreference}
                onChange={handleChange}
              >
                {facultyOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value} style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ flexGrow: 1 }}>{option.label}</span>
                    {option.googleScholar && (
                      <a href={option.googleScholar} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', marginLeft: '8px' }}>
                        <img src={GoogleScholar} alt="Google Scholar" style={{ paddingLeft: '10px' , width: '20px', height: '20px', verticalAlign: 'middle' }} />
                      </a>
                    )}
                    {option.personalWebsite && (
                      <a href={option.personalWebsite} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', marginLeft: '8px' }}>
                        <LanguageIcon style={{ paddingLeft: '10px', verticalAlign: 'middle' }} />
                      </a>
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h7" gutterBottom>
              Faculty whom you would like to visit (2nd preference) *
            </Typography>
            <FormControl fullWidth required>
              <Select
                name="secondPreference"
                value={formData.secondPreference}
                onChange={handleChange}
              >
                {facultyOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value} style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ flexGrow: 1 }}>{option.label}</span>
                    {option.googleScholar && (
                      <a href={option.googleScholar} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', marginLeft: '8px' }}>
                        <img src={GoogleScholar} alt="Google Scholar" style={{ paddingLeft: '10px', width: '20px', height: '20px', verticalAlign: 'middle' }} />
                      </a>
                    )}
                    {option.personalWebsite && (
                      <a href={option.personalWebsite} target="_blank" rel="noopener noreferrer" style={{ cursor: 'pointer', marginLeft: '8px' }}>
                        <LanguageIcon style={{ paddingLeft: '10px', verticalAlign: 'middle' }} />
                      </a>
                    )}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7" gutterBottom>
                Justify your area of work / interest with the faculty you have chosen.
              </Typography>
              <Box>
                <Tooltip
                  title={<h3 style={{color: "white", fontSize: "0.9rem", padding: "10px"}}>Unless the justification is strong and elaborate, the application may be rejected.</h3>}
                sx={{ pl: 1 }}
              >
                <InfoIcon />
                </Tooltip>
              </Box>
            </Box>

            <TextField
              name="justification"
              fullWidth
              multiline
              rows={3}
              value={formData.justification}
              onChange={handleChange}
              required
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7" gutterBottom>
               Give 2 references of faculty / industry contacts who can vouch for your application.
              </Typography>
              <Box>
                <Tooltip
                  title={<h3 style={{color: "white", fontSize: "0.8rem", padding: "10px"}}> They could be from your UG / PG institute, somebody with whom you did an internship, etc. Please specify as below:<br /> (1) Reference 1: Name, Affiliation, and Email<br /> (2) Reference 2: Name, Affiliation, and Email</h3>}
                  sx={{ pl: 1 }}
                >
                  <InfoIcon />
                </Tooltip>
              </Box>
            </Box>

            <TextField
              name="references"
              fullWidth
              multiline
              rows={2}
              value={formData.references}
              onChange={handleChange}
              required
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7" gutterBottom>
                What do you hope to achieve by the end of the visit?
              </Typography>
              <Box>
                <Tooltip
                  title={<h3 style={{color: "white", fontSize: "0.9rem", padding: "10px"}}>What are the skills, experience you would gain at the end of the visit. Please make a strong case for your application.</h3>}
                  sx={{ pl: 1 }}
                >
                  <InfoIcon />
                </Tooltip>
              </Box>
            </Box>

            <TextField
              name="goals"
              fullWidth
              multiline
              rows={2}
              value={formData.goals}
              onChange={handleChange}
              required
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7" gutterBottom>
                What specific activites are you interested and looking forward to during the visit?
              </Typography>
              <Box>
                <Tooltip
                  title={<h3 style={{color: "white", fontSize: "0.9rem", padding: "10px"}}>e.g. would need help in formulating the research problem. Be as explicit as possible.</h3>}
                  sx={{ pl: 1 }}
                >
                  <InfoIcon />
                </Tooltip>
              </Box>
            </Box>

            <TextField
              name="specificActivities"
              fullWidth
              multiline
              rows={2}
              value={formData.specificActivities}
              onChange={handleChange}
              required
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7" gutterBottom>
                Ph.D. thesis Advisor Name? *
              </Typography>
            </Box>

            <TextField
              name="advisorName"
              fullWidth
              multiline
              rows={1}
              value={formData.advisorName}
              onChange={handleChange}
              required
            />
        
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7" gutterBottom>
                Ph.D. thesis Advisor Email? *
              </Typography>
            </Box>

            <TextField
              name="advisorEmail"
              fullWidth
              multiline
              rows={1}
              value={formData.advisorEmail}
              onChange={handleChange}
              required
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7" gutterBottom>
                Ph.D. thesis Co-Advisor Name?
              </Typography>
            </Box>

            <TextField
              name="coAdvisorName"
              fullWidth
              multiline
              rows={1}
              value={formData.coAdvisorName}
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h7" gutterBottom>
                Ph.D. thesis Co-Advisor Email?
              </Typography>
            </Box>

            <TextField
              name="coAdvisorEmail"
              fullWidth
              multiline
              rows={1}
              value={formData.coAdvisorEmail}
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h7" gutterBottom>
                    Upload your CV *
                </Typography>
                <Box>
                    <Tooltip
                        title={<h3 style={{color: "white", fontSize: "0.9rem", padding: "10px"}}>Without this, your application will not be reviewed.</h3>}
                        sx={{ pl: 1 }}
                    >
                        <InfoIcon />
                    </Tooltip>
                </Box>
            </Box>
            <Input
              id="cv-upload"
              name="cv"
              type="file"
              onChange={handleChange}
              required
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h7" gutterBottom>
                    Upload your Statement of Purpose *
                </Typography>
                <Box>
                    <Tooltip
                        title={<h3 style={{color: "white", fontSize: "0.9rem", padding: "10px"}}>Describe why you are the best candidate to receive this fellowship to visit the faculty. Mention your concrete research plans(if you have one). Without this, your application will not be reviewed.</h3>}
                        sx={{ pl: 1 }}
                    >
                        <InfoIcon />
                    </Tooltip>
                </Box>
            </Box>

            <Input
              id="sop-upload"
              name="statementOfPurpose"
              type="file"
              onChange={handleChange}
              required
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h7" gutterBottom>
                    Upload your No-Objection / Consent letter from your advisor*
                </Typography>
                <Box>
                    <Tooltip
                        title={<h3 style={{color: "white", fontSize: "0.9rem", padding: "10px"}}>Without this, your application will not be reviewed.</h3>}
                        sx={{ pl: 1 }}
                    >
                        <InfoIcon />
                    </Tooltip>
                </Box>
            <Typography variant="h7" gutterBottom>
                <a href="https://india.acm.org/binaries/content/assets/india/noc_mentee.pdf" target="_blank" rel="noopener noreferrer" style={{ paddingLeft: "10px", textDecoration: 'none', color: 'blue' }}> Sample</a>
            </Typography>
            </Box>
            <Input
              id="consent-upload"
              name="consentLetter"
              type="file"
              onChange={handleChange}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agree}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      agree: e.target.checked,
                    }))
                  }
                />
              }
              label="All information I have provided are correct."
            />
            <Button type="submit" variant="contained">
              Submit Application
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default ApplicationPage;
