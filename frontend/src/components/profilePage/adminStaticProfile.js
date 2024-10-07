import React, {useState, useEffect} from "react";
import { Container, Typography, Box } from "@mui/material";
import ResponsiveAppBar from "../navbar/navbar";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router';
import axios from 'axios';

const AdminStaticProfilePage = () => {
  const handleEditClick = () => {
    window.location.href = "/editAdminProfile";
  };
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    affiliation: '',
    email: ''
  });

  useEffect(()=>{
    if(!localStorage.getItem('User')){
      navigate('/login')
    }
    const loadData = async ()=>{
      const token = localStorage.getItem('User'); // assuming token is stored this way
      try {
          const response = await axios.get('/admin/profile', { headers: { Authorization: `Bearer ${token}` } });
          var user = response.data;
          setProfile({
              'firstName' : user['FirstName'],
              'lastName' : user['LastName'],
              'email' : user['Email'],
              'affiliation' : user['Affiliation'],
          });
      } catch (error) {
        if(error.response.status === 500){
          navigate("/serverError")
        }
        else if(error.response.status === 401){
            navigate("/unauthorized")
        }
      }
  }
  loadData()
  },[])

  return (
    <Container>
      <ResponsiveAppBar pages={['APPLICATIONS', 'ADD MENTOR']}/>
      <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
        Admin Profile
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">
          <strong>First Name:</strong> {profile.firstName}
        </Typography>
        <Typography variant="body1">
          <strong>Last Name:</strong> {profile.lastName}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {profile.email}
        </Typography>
        <Typography variant="body1">
          <strong>Affiliation:</strong> {profile.affiliation}
        </Typography>
      </Box>
      <Button
        startIcon={<EditIcon />}
        variant="contained"
        sx={{ backgroundColor: "grey", fontSize: "0.875rem", px: 2, py: 1 }}
        onClick={handleEditClick}
      >
        Edit
      </Button>
    </Container>
  );
};

export default AdminStaticProfilePage;
