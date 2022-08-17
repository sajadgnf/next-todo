import { Box, Button, Checkbox, FormControlLabel, Radio, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { getOneTodo } from '@/api/todos/[todoId]';

const EditTodo = ({ todo }) => {

    const router = useRouter()
    const [formData, setFormData] = useState({
        title: todo.title,
        description: todo.description,
        isCompleted: todo.isCompleted
    })
    const formHandler = evt => {
        if (evt.target.name === 'isCompleted') {
            setFormData({ ...formData, [evt.target.name]: !formData.isCompleted })
        } else {
            setFormData({ ...formData, [evt.target.name]: evt.target.value })
        }
    }

    const editTodoHandler = (e) => {
        e.preventDefault()
        axios.put(`/api/todos/${router.query.todoId}`, formData)
            .then(data => router.push("/"))
            .catch(err => console.log(err))
    };
    return (
        <Container maxWidth="lg">
            <Box mt={10} >
                {
                    <form onSubmit={editTodoHandler}>
                        <Typography variant='h5' color='secondary' mb>Edit Todo</Typography>
                        <TextField
                            label="title"
                            name='title'
                            fullWidth
                            value={formData.title}
                            onChange={evt => formHandler(evt)}
                        />
                        <TextField
                            label="description"
                            name='description'
                            fullWidth
                            multiline
                            minRows={4}
                            sx={{ mt: 1 }}
                            value={formData.description}
                            onChange={evt => formHandler(evt)}
                        />
                        <FormControlLabel
                            label="Completed Todo"
                            sx={{
                                display: "flex",
                                alignItems: 'center',
                                flexDirection: 'row-reverse',
                                justifyContent: 'flex-end',
                                mb: 3,
                                ml: .2
                            }}
                            control={
                                <Checkbox
                                    name='isCompleted'
                                    checked={formData.isCompleted}
                                    onChange={evt => formHandler(evt)}
                                    value={formData.isCompleted}
                                    color="primary"
                                />
                            }
                        />
                        <Button
                            sx={{ width: 100, mt: 1, mr: 1 }}
                            variant='contained'
                            type='submit'
                            disabled={!formData.title || !formData.description}
                        >
                            Update
                        </Button>
                        <Button
                            sx={{ width: 100, mt: 1 }}
                            variant='contained'
                            onClick={() => router.push("/")}
                        >
                            Back
                        </Button>
                    </form>
                }
            </Box>
        </Container>
    );
};

export default EditTodo;

export async function getServerSideProps({ query }) {
    const todo = await getOneTodo(query)
    return {
        props: {
            todo: JSON.parse(JSON.stringify(todo))
        }
    }
}