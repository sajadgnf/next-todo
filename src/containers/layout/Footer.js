import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <Box
            width="100%"
            textAlign="center"
            position='fixed'
            bottom="0"
            right="0"
            bgcolor='#f0f0f0'
        >
            <Typography m>All Rights Reserved</Typography>
        </Box>
    );
};

export default Footer;