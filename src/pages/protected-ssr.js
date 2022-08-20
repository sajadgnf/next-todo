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
                {session.user.name}, wellcom to protectedSSR
            </Typography>
        </Layout>
    );
};

export default ProtectedSSR;

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx)

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin?callbackUrl=http://localhost:3000/protected-ssr",
                permanent: false

            }
        }
    }

    return {
        props: {
            session,
        },
    };
};