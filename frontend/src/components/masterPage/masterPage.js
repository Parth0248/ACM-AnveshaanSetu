import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Box } from '@mui/material';
import ResponsiveAppBar from '../navbar/navbar';

const dummyUsers = [
    { id: 1, firstName: 'John', lastName: 'Doe', affiliation: 'University A', phdYear: '2nd' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', affiliation: 'University B', phdYear: '1st' }
];

const dummyMentors = [
    { id: 1, firstName: 'Alice', lastName: 'Johnson', affiliation: 'University C' },
    { id: 2, firstName: 'Bob', lastName: 'Brown', affiliation: 'University D' }
];

const dummyAdmins = [
    { id: 1, firstName: 'Admin', lastName: 'One', affiliation: 'University Admin' }
];

const AllUsersPage = () => {

    const handleDelete = (id, type) => {
        console.log(`Delete ${type} with ID: ${id}`);
        // Placeholder for delete logic
        // Example: axios.delete(`/api/${type}/${id}`);
    };

    return (
        <Container>
            <ResponsiveAppBar pages={['APPLICATIONS']} />
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>All Users</Typography>
            <Box>
                <Typography variant="h5" sx={{ mt: 2 }}>Users</Typography>
                <List>
                    {dummyUsers.map((user) => (
                        <ListItem key={user.id} sx={{ boxShadow: 1, mb: 2, borderRadius: '4px', backgroundColor: 'background.paper' }} secondaryAction={
                            <Button onClick={() => handleDelete(user.id, 'users')} color="error">Delete</Button>
                        }>
                            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={`Affiliation: ${user.affiliation}, PhD Year: ${user.phdYear}`} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h5" sx={{ mt: 2 }}>Mentors</Typography>
                <List>
                    {dummyMentors.map((mentor) => (
                        <ListItem key={mentor.id} sx={{ boxShadow: 1, mb: 2, borderRadius: '4px', backgroundColor: 'background.paper' }} secondaryAction={
                            <Button onClick={() => handleDelete(mentor.id, 'mentors')} color="error">Delete</Button>
                        }>
                            <ListItemText primary={`${mentor.firstName} ${mentor.lastName}`} secondary={`Affiliation: ${mentor.affiliation}`} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h5" sx={{ mt: 2 }}>Admins</Typography>
                <List>
                    {dummyAdmins.map((admin) => (
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
