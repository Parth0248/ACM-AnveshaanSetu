// export default HomePage;
import React, { useState } from 'react';
import { Box, Typography, Container, Button, Card, CardContent, Grid, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ResponsiveAppBar from '../navbar/navbar'; // Assuming this is your Navbar component
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router'
import axios from "axios";

// About Section
const AboutSection = () => (
    <Container>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            About the Fellowship
        </Typography>
        <Typography variant="body1">
            The ACM India Anveshan Setu Fellowship aims to provide CS/IT PhD students in India an opportunity to get up close and personal with best research practices outside their parent institutes and offers a longer and more intense mentoring experience.
        </Typography>
    </Container>
);

// Objectives Section
const ObjectivesSection = () => (
    <Container>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Objectives of the Fellowship
        </Typography>
        <List>
            <ListItem>
                <ListItemText primary="Provide an opportunity to get up close with best research practices outside their parent institutes." />
            </ListItem>
            <ListItem>
                <ListItemText primary="A longer and more intense mentoring experience beyond ACM India PhD Clinic." />
            </ListItem>
            <ListItem>
                <ListItemText primary="Develop Anveshan Setu into a premium-value program over the next three years." />
            </ListItem>
        </List>
    </Container>
);

// Eligibility Section
const EligibilitySection = () => (
    <Container>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Eligibility for Students and Mentors
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6">Eligibility for Students</Typography>
                        <Typography variant="body1">
                            Any full-time/part-time enrolled/registered CS/IT PhD student in India.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6">Eligibility for Mentors</Typography>
                        <Typography variant="body1">
                            Faculty member with established research credentials in India, willing to host and mentor a student for four weeks.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Container>
);

// Salient Features Section
const SalientFeaturesSection = () => (
    <Container>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Salient Features of the Fellowship
        </Typography>
        <List>
            <ListItem>
                <ListItemText primary="Minimum of four weeks per visit, with the possibility of visiting up to three times during the PhD career." />
            </ListItem>
            <ListItem>
                <ListItemText primary="Matchmaking process between mentor and mentee facilitated by ACM India." />
            </ListItem>
            <ListItem>
                <ListItemText primary="Mentor and mentee are expected to meet a minimum set of expectations for optimal learning." />
            </ListItem>
        </List>
    </Container>
);

// Expectations Section (Accordion for Mentors and Mentees)
const ExpectationsSection = () => (
  <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
          Expectations from Mentors and Mentees
      </Typography>
      <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Expectations from Mentors</Typography>
          </AccordionSummary>
          <AccordionDetails>
              <List sx={{ listStyle: "none", padding: 0, marginLeft: 1 }}>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Facilitate logistics of mentee's visit:" secondary={
                          <>
                              <Typography component="span" variant="body1">Office space/desk, access to building/lab, internet access, access to library (for reading, not necessarily for issuing books).</Typography><br />
                              <Typography component="span" variant="body1">Access to student hostel/guest house accommodation and mess/canteen facilities. Financial support from ACM India is available for this.</Typography>
                          </>
                      } />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Have the mentee participate in group meetings, presentations, etc. as a visitor." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Spend at least 1-2 hours per week with the mentee on his/her work, giving feedback on research, helping progress with work." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Have other students in the mentor's research group spend some structured time with the mentee explaining what they are working on, pitfalls to avoid, best practices to pick up, etc." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Have a joint video/teleconference with mentee and her/his/their advisor in her/his/their parent institution at least once (preferably in the first week) during the visit to ensure that all are on the same page." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Provide a Completion Letter (see template) to the mentee on institute letterhead, on completion of the visit." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Give feedback to ACM India about what worked and what didn't work; a separate form will be shared with mentors for this purpose." />
                  </ListItem>
              </List>
          </AccordionDetails>
      </Accordion>
      <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Expectations from Mentees</Typography>
          </AccordionSummary>
          <AccordionDetails>
              <List sx={{ listStyle: "none", padding: 0, marginLeft: 1 }}>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Mentee must have discussed the visit with her/his/their advisor and comply with all requirements of advisor and parent institution." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Mentee must submit a no-objection-certificate (see template) from the advisor." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Given that this is a full-time visit, mentee must spend a minimum of 40 hours per week interacting with the mentor and her/his/their research group, trying to understand research methodologies and best practices." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Participate as a visitor in group meetings, presentations etc. of the mentor's group." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Stay in close touch (preferably weekly) with an advisor in the parent institution about work/activities being done in the visiting institute." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Prepare a report (format to be provided by ACM India) of outcome of the visit at the end of the duration of visit." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Give feedback to ACM India about what worked and what didn't work; a separate form will be shared with mentees for this purpose." />
                  </ListItem>
                  <ListItem sx={{ display: 'list-item', mb: 1 }}>
                      <ListItemText primary="Possibly participate in ACM India events and present her/his/their work and experience from the visitor program." />
                  </ListItem>
              </List>
          </AccordionDetails>
      </Accordion>
  </Container>
);


// Timeline Section
const TimelineSection = () => (
    <Container>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Tentative Timeline
        </Typography>
        <List>
            <ListItem>
                <ListItemText primary="By 10 Nov. 2023: Applications open" />
            </ListItem>
            <ListItem>
                <ListItemText primary="By 15 Jan. 2024: Last date for submitting applications" />
            </ListItem>
            <ListItem>
                <ListItemText primary="By 28 Feb. 2024: Announcement of Fellows" />
            </ListItem>
            <ListItem>
                <ListItemText primary="Apr. 2024–Mar. 2025: Student visits Mentors" />
            </ListItem>
        </List>
    </Container>
);

// Financial Details Section
const FinancialDetailsSection = () => (
    <Container>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
            Financial Details
        </Typography>
        <Typography variant="body1">
            ACM India will provide INR 10,000 to the student at the start of their visit. After submitting a report and photos, an additional INR 10,000 will be given.
        </Typography>
    </Container>
);

// Footer Section
const FooterSection = () => (
    <Box sx={{ bgcolor: 'primary.dark', color: 'white', p: 2, mt: 6 }}>
        <Typography variant="body2" align="center">
            © 2024 ACM India. All rights reserved.
        </Typography>
    </Box>
);

const Team = () => (
    <Box sx={{ mt: 4, mb: 4, ml: 3 }}>
        <Typography variant="h4">Team</Typography>
        <Box sx={{ mt: 2 }}>
            <Typography>Prof. Ponnurangam Kumaraguru “PK” - IIIT Hyderabad</Typography>
            <Typography>Prof. Rishabh Kaushal - IGDTUW</Typography>
            <Typography>Prof. Sougata Sen - BITS Pilani Goa campus</Typography>
        </Box>
    </Box>
);

const FAQ = () => (
    <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">FAQs</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: I have not yet attended the PhD Clinic, can I apply for this fellowship?</Typography>
                <Typography variant="body2">A: Absolutely, you can. We strongly recommend applying to Anveshan Setu Fellowship after attending the Clinic, but it is not mandatory.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: Will there be any written test, interviews, for the selection process?</Typography>
                <Typography variant="body2">A: No, there may be an interaction session (which could be a PhD Clinic slot too) with the mentor to ensure that you are prepared to make the best use of the visit.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: Is there a necessary condition that I can visit only the faculty that I interacted with in PhD Clinic?</Typography>
                <Typography variant="body2">A: No, not necessary. You can apply to visit any host faculty mentioned in the application form. Please be aware that this is a matchmaking activity, where host faculty should also be interested in hosting you.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: Will I get a lab space/desk to sit and work in the host institute?</Typography>
                <Typography variant="body2">A: Depending on the infrastructure facilities of the host institute, you will get some space.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: Will I get a hostel in the institute that I will be visiting?</Typography>
                <Typography variant="body2">A: Same goes for hostel rooms; be prepared to stay in some hostel type accommodation outside if you don't get a hostel room in the campus.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: I just finished my PhD, submitted my thesis, waiting for evaluation/defense, am I eligible for this fellowship?</Typography>
                <Typography variant="body2">A: Congrats on submitting the thesis, must be very satisfying. Unfortunately, this program is for PhD students who have not yet reached the final stages of thesis defense.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: How much fellowship money will I get?</Typography>
                <Typography variant="body2">A: INR 20,000 per student per visit. ACM India will credit INR 10,000 when you start the visit and additional INR 10,000 when you complete the visit and satisfy the requirements (report, pics, etc.).</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: When can I visit? Should the visit be planned in summer?</Typography>
                <Typography variant="body2">A: Visit timing can be planned with the host faculty; both you and the faculty member can decide on the timing for the visit. Visit should happen in the period of April 2024 – March 2025.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: Do I need to have ACM membership to apply for this fellowship?</Typography>
                <Typography variant="body2">A: No, any PhD student (not restricted to ACM members) can apply for this fellowship.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: I received the 2021 Fellowship, but did not visit the mentor because of the pandemic and other reasons. Can I apply again this year?</Typography>
                <Typography variant="body2">A: If you are still a registered PhD student, you are eligible to apply. We look forward to seeing your application.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: I received the 2021 Fellowship and I visited the mentor. Can I apply again this year?</Typography>
                <Typography variant="body2">A: If you are still a registered PhD student, you are eligible to apply. We look forward to seeing your application.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: Does the fellowship elapse?</Typography>
                <Typography variant="body2">A: Yes, the visit must be completed during April 2024 – March 2025.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: Can I visit the mentor for more than 4 weeks?</Typography>
                <Typography variant="body2">A: ACM India expects a mentee visit for a duration of 4 weeks, the mentor and mentee can mutually agree (with consent of the mentee's advisor and parent institution) to extend the duration of the visit. If you need any financial support for extending the visit, please reach out to us at (pk.guru[at]iiit[dot]ac[dot]in) with the request.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: I just started my Anveshan Setu visit, how do I get the 10K stipend? What do I need to do?</Typography>
                <Typography variant="body2">A: Please write an email to abhijatv@india.acm.org and cc the mentor you are visiting & pk.guru@iiit.ac.in. In the email mention the date you started the visit, request the mentor to confirm the start. We will share a link to you where we will take your bank details.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: I submitted my bank details after starting my visit through the link that was shared, by when will I get the 10K?</Typography>
                <Typography variant="body2">A: Thank you for sharing your bank details; you should receive 10K within 2 weeks of submitting the form, if you don’t receive it after 2 weeks, feel free to send a reminder email.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: I just completed my visit, how I get the 10K stipend? What do I need to do?</Typography>
                <Typography variant="body2">A: Please write an email to abhijatv@india.acm.org and cc the mentor you are visiting & pk.guru@iiit.ac.in. In the email mention the date you completed the visit, request the mentor to confirm the completion. We will share a link to you where we will take your bank details.</Typography>
                
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Q: I submitted my bank details after completing my visit through the link that was shared, by when will I get the 10K?</Typography>
                <Typography variant="body2">A: Thank you for sharing your bank details; you should receive 10K within 2 weeks of submitting the form, if you don’t receive it after 2 weeks, feel free to send a reminder email.</Typography>
            </>
        </AccordionDetails>
    </Accordion>
);


var pages = ['APPLICATIONS'];

const HomePage = () => {
    const navigate = useNavigate();
    const [alreadyApplied, setalreadyApplied] = useState(false)
    React.useEffect(()=>{
        if(!localStorage.getItem('User')){
            navigate('/login')
        }
        if(localStorage.getItem('type')==='mentee'){
            const loadData = async () => {
                const token = localStorage.getItem("User"); // assuming token is stored this way
                try {
                  const response = await axios.get("/mentee/check_applied", {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  setalreadyApplied(response.data)
                } catch (error) {
                  console.error("Error fetching profile data:", error);
                  if(error.response.status === 500){
                    navigate("/serverError");
                }
                else if(error.response.status === 401){
                    navigate("/unauthorized");
                }
                }
            }
            loadData();
        }
    })
    return (
        <Container>
            {/* NavBar */}
            <ResponsiveAppBar pages={localStorage.getItem('type')==='admin'? ['APPLICATIONS', 'ADD MENTOR', 'ALL USERS'] : ['APPLICATIONS']}/>

            {/* Hero Section */}
            {/* <HeroSection handleApplyClick={handleApplyClick()} /> */}
            <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 4, borderRadius: 3, mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    ACM India Anveshan Setu Fellowship
                </Typography>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Bridging the gap between aspiring researchers and established mentors.
                </Typography>
                {localStorage.getItem('type') ==='mentee' && !alreadyApplied &&(
                <Button component={Link} to="/apply" variant="contained" size="large" sx={{ bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' } }}>
                    Apply Now
                </Button>
                )}
                {localStorage.getItem('type') ==='mentee' && alreadyApplied &&(
                <Button component={Link} variant="contained" size="large" sx={{ bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' } }}>
                    Alread Applied
                </Button>
                )}
            </Box>

            {/* Content Sections */}
            <AboutSection />
            <ObjectivesSection />
            <EligibilitySection />
            <SalientFeaturesSection />
            <ExpectationsSection />
            <TimelineSection />
            <FinancialDetailsSection />
            <Team />
            <FAQ />
            {/* Footer */}
            <FooterSection />
        </Container>
    );
};

export default HomePage;
