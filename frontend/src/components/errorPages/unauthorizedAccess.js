import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const UnauthorizedAccessPage = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
            <Typography variant="h4" gutterBottom>
                Unauthorized Access
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                You do not have permission to access this page.
            </Typography>
            <Button variant="contained" onClick={() => window.location.href = "/"}>
                Go to Home
            </Button>
        </Box>
    );
};

export default UnauthorizedAccessPage;
