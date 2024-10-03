// export default HomePage;
import React from 'react';
import { Box, Typography, Container, Button, Card, CardContent, Grid, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ResponsiveAppBar from '../navbar/navbar'; // Assuming this is your Navbar component
import {  Link } from 'react-router-dom';
import { useNavigate } from 'react-router'



// Hero Section Component
const HeroSection = () => (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 4, borderRadius: 3, mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
            ACM India Anveshan Setu Fellowship
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
            Bridging the gap between aspiring researchers and established mentors.
        </Typography>
        <Button component={Link} to="/apply" variant="contained" size="large" sx={{ bgcolor: 'secondary.main', color: 'white', '&:hover': { bgcolor: 'secondary.dark' } }}>
            Apply Now
        </Button>
    </Box>
);

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
                <Card>
                    <CardContent>
                        <Typography variant="h6">Eligibility for Students</Typography>
                        <Typography variant="body1">
                            Any full-time/part-time enrolled/registered CS/IT PhD student in India.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Card>
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
    <Box sx={{ bgcolor: 'primary.dark', color: 'white', p: 4, mt: 4 }}>
        <Typography variant="body2" align="center">
            © 2024 ACM India. All rights reserved.
        </Typography>
    </Box>
);

const HomePage = () => {
    const navigate = useNavigate();

    React.useEffect(()=>{
        // if(!localStorage.getItem('User')){
        //     navigate('/login')
        // }
    })
    return (
        <Container>
            {/* NavBar */}
            <ResponsiveAppBar />

            {/* Hero Section */}
            {/* <HeroSection handleApplyClick={handleApplyClick()} /> */}
            <HeroSection />

            {/* Content Sections */}
            <AboutSection />
            <ObjectivesSection />
            <EligibilitySection />
            <SalientFeaturesSection />
            <ExpectationsSection />
            <TimelineSection />
            <FinancialDetailsSection />

            {/* Footer */}
            <FooterSection />
        </Container>
    );
};

export default HomePage;
