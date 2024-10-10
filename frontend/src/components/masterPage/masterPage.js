import React, {useEffect, useState} from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';
import { useNavigate } from 'react-router';
import axios from "axios";

const AllUsersPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [allMentors, setAllMentors] = useState([]);
    const [allAdmins, setAllAdmins] = useState([]);
    const handleDelete = (id, type) => {
        console.log(`Delete ${type} with ID: ${id}`);
        // Placeholder for delete logic
        // Example: axios.delete(`/api/${type}/${id}`);
    };
    const navigate = useNavigate();

    useEffect(()=>{
        if(!localStorage.getItem('User')){
        navigate('/login')
        }

        const loadData = async () => {
            const token = localStorage.getItem("User"); // assuming token is stored this way
            try {
              const response = await axios.get("/admin/get_all_users", {
                headers: { Authorization: `Bearer ${token}` },
              });
              setAllUsers(response.data.user);
              setAllMentors(response.data.mentor);
              setAllAdmins(response.data.admin);
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
    },[])

    return (
        <Container>
            <ResponsiveAppBar pages={['APPLICATIONS', 'ADD MENTOR', 'ALL USERS']} />
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>All Users</Typography>
            <Box>
                <Typography variant="h5" sx={{ mt: 2 }}>Users</Typography>
                <List>
                    {allUsers.map((user) => (
                        <ListItem key={user.id} sx={{ boxShadow: 1, mb: 2, borderRadius: '4px', backgroundColor: 'background.paper' }} secondaryAction={
                            <Button onClick={() => handleDelete(user.id, 'users')} color="error">Delete</Button>
                        }>
                            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={`Affiliation: ${user.affiliation}, PhD Year: ${user.phdYear}`} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h5" sx={{ mt: 2 }}>Mentors</Typography>
                <List>
                    {allMentors.map((mentor) => (
                        <ListItem key={mentor.id} sx={{ boxShadow: 1, mb: 2, borderRadius: '4px', backgroundColor: 'background.paper' }} secondaryAction={
                            <Button onClick={() => handleDelete(mentor.id, 'mentors')} color="error">Delete</Button>
                        }>
                            <ListItemText primary={`${mentor.firstName} ${mentor.lastName}`} secondary={`Affiliation: ${mentor.affiliation}`} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h5" sx={{ mt: 2 }}>Admins</Typography>
                <List>
                    {allAdmins.map((admin) => (
                        <ListItem key={admin.id} sx={{ boxShadow: 1, mb: 2, borderRadius: '4px', backgroundColor: 'background.paper' }} secondaryAction={
                            <Button onClick={() => handleDelete(admin.id, 'admins')} color="error">Delete</Button>
                        }>
                            <ListItemText primary={`${admin.firstName} ${admin.lastName}`} secondary={`Affiliation: ${admin.affiliation}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default AllUsersPage;
