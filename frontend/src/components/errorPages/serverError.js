import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const ServerErrorPage = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" flexDirection="column">
            <Typography variant="h4" gutterBottom>
                Server Error
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                An unexpected error occurred. Please try again later.
            </Typography>
            <Button variant="contained" onClick={() => window.location.href = "/"}>
                Go to Home
            </Button>
        </Box>
    );
};

export default ServerErrorPage;
