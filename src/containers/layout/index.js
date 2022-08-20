import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Container maxWidth="lg">
            <Header />
            {children}
            <Footer />
        </Container>
    );
};

export default Layout;