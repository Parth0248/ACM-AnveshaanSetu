import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, TextField } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';
import { useNavigate } from 'react-router';
import axios from "axios";

const AllUsersPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [allMentors, setAllMentors] = useState([]);
    const [allAdmins, setAllAdmins] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState({found: true, message: ''});

    const handleDelete = (id, type) => {
        console.log(`Delete ${type} with ID: ${id}`);
        // Placeholder for delete logic
        // Example: axios.delete(`/api/${type}/${id}`);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('User')) {
            navigate('/login')
        }

        const loadData = async () => {
            const token = localStorage.getItem("User");
            try {
                const response = await axios.get("/admin/get_all_users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllUsers(response.data.user);
                setAllMentors(response.data.mentor);
                setAllAdmins(response.data.admin);
            } catch (error) {
                console.error("Error fetching data:", error);
                if (error.response.status === 500) {
                    navigate("/serverError");
                } else if (error.response.status === 401) {
                    navigate("/unauthorized");
                }
            }
        }
        loadData();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const performSearch = () => {
        if (!searchQuery) {
            setSearchResult({ found: true, message: '' });
            return;
        }
        let found = false;
        // Simple case-insensitive search
        [allUsers, allMentors, allAdmins].forEach(group => {
            group.forEach(person => {
                if (
                    person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    person.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    person.affiliation.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                    found = true;
                }
            });
        });
        setSearchResult({ found: found, message: found ? '' : 'No matches found.' });
    };

    const filterUser=()=>{
        if(!searchQuery){
            return allUsers;
        }

        return allUsers.filter(person =>{
            if (
                person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                person.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                person.affiliation.toLowerCase().includes(searchQuery.toLowerCase())
            ){
                return true;
            }
            return false
        })
    }

    const filterMentor=()=>{
        if(!searchQuery){
            return allMentors;
        }

        return allMentors.filter(person =>{
            if (
                person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                person.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                person.affiliation.toLowerCase().includes(searchQuery.toLowerCase())
            ){
                return true;
            }
            return false
        })
    }

    const filterAdmin=()=>{
        if(!searchQuery){
            return allUsers;
        }

        return allAdmins.filter(person =>{
            if (
                person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                person.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                person.affiliation.toLowerCase().includes(searchQuery.toLowerCase())
            ){
                return true;
            }
            return false
        })
    }

    return (
        <Container>
            <ResponsiveAppBar pages={['APPLICATIONS', 'ADD MENTOR', 'ALL USERS']} />
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>All Users</Typography>
            <Box sx={{ mb: 4 }}>
                <TextField
                    fullWidth
                    label="Search Users"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" onClick={performSearch}>Search</Button>
                {!searchResult.found && <Typography color="error" sx={{ mt: 1 }}>{searchResult.message}</Typography>}
            </Box>
            <Box>
                <Typography variant="h5" sx={{ mt: 2 }}>Users</Typography>
                <List>
                    {filterUser().map((user) => (
                        <ListItem key={user.id} sx={{ boxShadow: 1, mb: 2, borderRadius: '4px', backgroundColor: 'background.paper' }} secondaryAction={
                            <Button onClick={() => handleDelete(user.id, 'users')} color="error">Delete</Button>
                        }>
                            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={`Affiliation: ${user.affiliation}, PhD Year: ${user.phdYear}, Email Id: ${user.email}`} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h5" sx={{ mt: 2 }}>Mentors</Typography>
                <List>
                    {filterMentor().map((mentor) => (
                        <ListItem key={mentor.id} sx={{ boxShadow: 1, mb: 2, borderRadius: '4px', backgroundColor: 'background.paper' }} secondaryAction={
                            <Button onClick={() => handleDelete(mentor.id, 'mentors')} color="error">Delete</Button>
                        }>
                            <ListItemText primary={`${mentor.firstName} ${mentor.lastName}`} secondary={`Affiliation: ${mentor.affiliation}, Accepted Applications: ${mentor.accepted}, Rejected Applications: ${mentor.rejected}`} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h5" sx={{ mt: 2 }}>Admins</Typography>
                <List>
                    {filterAdmin().map((admin) => (
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
