import { Typography } from '@mui/material';
import React from 'react';
import { getOneTodo } from '@/api/todos/[todoId]';

const TodoDetails = ({ todo }) => {
    return (
        <div>
            <Typography>title: {todo.title}</Typography>
            <Typography>description: {todo.description}</Typography>
        </div>
    );
};

export default TodoDetails;

export async function getServerSideProps({ query }) {
    
    const todo = await getOneTodo(query)
    return {
        props: {
            todo: JSON.parse(JSON.stringify(todo))
        }
    }
}
