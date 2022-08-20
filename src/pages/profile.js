import Layout from '@/containers/layout';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';

const Profile = () => {

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        }
    })

    if (status === 'loading') return <div>Loading...</div>

    return (
        <Layout>
            <Box mt={20}>
                <Typography>{session.user.name}, wellcome to the profile</Typography>
            </Box>
        </Layout>
    );
};

export default Profile;