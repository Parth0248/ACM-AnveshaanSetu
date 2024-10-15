import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box, TextField, Modal, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
    // const isTestData = true; // Set to true to use dummy data

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

    // ... existing state ...
    const [openModal, setOpenModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    // ... existing functions ...

    const handleEdit = (user, type) => {
        setEditingUser({ ...user, type });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setEditingUser(null);
    };

    const handleSaveEdit = () => {
        // Logic to save the edited user
        console.log('Saving edited user:', editingUser);
        // Here you would typically make an API call to update the user
        handleCloseModal();
    };

    const renderEditForm = () => {
        if (!editingUser) return null;

        let fields;
        switch (editingUser.type) {
            case 'users':
                fields = (
                    <>
                        <TextField fullWidth margin="normal" label="First Name" value={editingUser.firstName} onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})} />
                        <TextField fullWidth margin="normal" label="Last Name" value={editingUser.lastName} onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})} />
                        <TextField fullWidth margin="normal" label="Affiliation" value={editingUser.affiliation} onChange={(e) => setEditingUser({...editingUser, affiliation: e.target.value})} />
                        <TextField fullWidth margin="normal" label="PhD Year" value={editingUser.phdYear} onChange={(e) => setEditingUser({...editingUser, phdYear: e.target.value})} />
                        <TextField fullWidth margin="normal" label="Email" value={editingUser.email} onChange={(e) => setEditingUser({...editingUser, email: e.target.value})} />
                    </>
                );
                break;
            case 'mentors':
                fields = (
                    <>
                        <TextField fullWidth margin="normal" label="First Name" value={editingUser.firstName} onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})} />
                        <TextField fullWidth margin="normal" label="Last Name" value={editingUser.lastName} onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})} />
                        <TextField fullWidth margin="normal" label="Affiliation" value={editingUser.affiliation} onChange={(e) => setEditingUser({...editingUser, affiliation: e.target.value})} />
                    </>
                );
                break;
            case 'admins':
                fields = (
                    <>
                        <TextField fullWidth margin="normal" label="First Name" value={editingUser.firstName} onChange={(e) => setEditingUser({...editingUser, firstName: e.target.value})} />
                        <TextField fullWidth margin="normal" label="Last Name" value={editingUser.lastName} onChange={(e) => setEditingUser({...editingUser, lastName: e.target.value})} />
                        <TextField fullWidth margin="normal" label="Affiliation" value={editingUser.affiliation} onChange={(e) => setEditingUser({...editingUser, affiliation: e.target.value})} />
                    </>
                );
                break;
            default:
                fields = null;
        }

        return (
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Edit {editingUser.type.slice(0, -1)}</DialogTitle>
                <DialogContent>
                    {fields}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleSaveEdit} variant="contained" color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        );
    };

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
                            <>
                                <Button onClick={() => handleEdit(user, 'users')} color="primary" sx={{ mr: 1 }}>EDIT</Button>
                                <Button onClick={() => handleDelete(user.id, 'users')} color="error">Delete</Button>
                            </>
                        }>
                            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={`Affiliation: ${user.affiliation}, PhD Year: ${user.phdYear}, Email Id: ${user.email}`} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h5" sx={{ mt: 2 }}>Mentors</Typography>
                <List>
                    {filterMentor().map((mentor) => (
                        <ListItem key={mentor.id} sx={{ boxShadow: 1, mb: 2, borderRadius: '4px', backgroundColor: 'background.paper' }} secondaryAction={
                            <>
                                <Button onClick={() => handleEdit(mentor, 'mentors')} color="primary" sx={{ mr: 1 }}>EDIT</Button>
                                <Button onClick={() => handleDelete(mentor.id, 'mentors')} color="error">Delete</Button>
                            </>
                        }>
                            <ListItemText primary={`${mentor.firstName} ${mentor.lastName}`} secondary={`Affiliation: ${mentor.affiliation}, Accepted Applications: ${mentor.acceptedApplications}, Rejected Applications: ${mentor.rejectedApplications}`} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h5" sx={{ mt: 2 }}>Admins</Typography>
                <List>
                    {filterAdmin().map((admin) => (
                        <ListItem key={admin.id} sx={{ boxShadow: 1, mb: 2, borderRadius: '4px', backgroundColor: 'background.paper' }} secondaryAction={
                            <>
                                <Button onClick={() => handleEdit(admin, 'admins')} color="primary" sx={{ mr: 1 }}>EDIT</Button>
                                <Button onClick={() => handleDelete(admin.id, 'admins')} color="error">Delete</Button>
                            </>
                        }>
                            <ListItemText primary={`${admin.firstName} ${admin.lastName}`} secondary={`Affiliation: ${admin.affiliation}`} />
                        </ListItem>
                    ))}
                </List>
            </Box>
            {renderEditForm()}
        </Container>
    );
};

export default AllUsersPage;
