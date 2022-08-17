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
            bgcolor='#cfcfcf'
        >
            <Typography m>site footer</Typography>
        </Box>
    );
};

export default Footer;