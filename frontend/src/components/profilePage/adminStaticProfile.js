import React from "react";
import { Container, Typography, Box } from "@mui/material";
import ResponsiveAppBar from "../navbar/navbar";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

const AdminStaticProfilePage = () => {
  // Dummy data for the admin
  const handleEditClick = () => {
    window.location.href = "/editAdminProfile";
  };

  const profile = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    affiliation: "Admin University",
  };

  return (
    <Container>
      <ResponsiveAppBar />
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
