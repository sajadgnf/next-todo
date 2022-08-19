import { Box, Typography } from '@mui/material';
import React from 'react';
import { getOneTodo } from '@/api/todos/[todoId]';
import dbConnect from '@/server/utils/dbConnect';
import Layout from '@/containers/layout';

const TodoDetails = ({ todo }) => {
    return (
        <Layout>
            <Box m={15}>
                <Typography variant='h5' fontWeight='700' mb>Todo Detail Page</Typography>
                <Box display='flex'>
                    <Typography variant='p' component="h3">title:&ensp;</Typography>
                    <Typography variant='p'>{todo.title} </Typography>
                </Box>
                <Box display='flex'>
                    <Typography variant='p' component="h3">description:&ensp;</Typography>
                    <Typography variant='p'>{todo.description} </Typography>
                </Box>
            </Box>
        </Layout>
    );
};

export default TodoDetails;

export async function getServerSideProps({ query }) {
    dbConnect()
    const todo = await getOneTodo(query)
    return {
        props: {
            todo: JSON.parse(JSON.stringify(todo))
        }
    }
}
