import Layout from '@/containers/layout';
import { Typography } from '@mui/material';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';

const ProtectedSSR = () => {

    const { data: session, status } = useSession()
    console.log(session);

    return (
        <Layout>
            <Typography mt={20}>
                protectedSSR
            </Typography>
        </Layout>
    );
};

export default ProtectedSSR;

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)
    return {
        props: {
            session,
        },
    };
};