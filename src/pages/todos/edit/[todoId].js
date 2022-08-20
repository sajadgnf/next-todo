import { Box, Button, Checkbox, FormControlLabel, Radio, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { getOneTodo } from '@/api/todos/[todoId]';
import Layout from '@/containers/layout';

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
            <Layout>
                <Box mt={20} display="flex" alignItems="center" flexDirection='column'>
                    <Typography variant='h5' color='primary' mb={2}>Edit Todo</Typography>
                    {
                        <form onSubmit={editTodoHandler} style={{ textAlign: 'center' }}>
                            <TextField
                                label="title"
                                name='title'
                                fullWidth
                                value={formData.title}
                                sx={{ "& div": { borderRadius: 3 } }}
                                onChange={evt => formHandler(evt)}
                            />
                            <TextField
                                label="description"
                                name='description'
                                fullWidth
                                multiline
                                minRows={2}
                                sx={{ mt: 3, "& div": { borderRadius: 3 } }}
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
                                    mb: 2,
                                    mt: 1,
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
                                sx={{
                                    width: "48%",
                                    mt: 1,
                                    mr: 1,
                                    borderRadius: 2,
                                    border: "1px solid"
                                }}
                                variant="outlined"
                                onClick={() => router.push("/")}
                            >
                                Back
                            </Button>
                            <Button
                                sx={{
                                    width: "48%",
                                    mt: 1,
                                    borderRadius: 2
                                }}
                                variant='contained'
                                type='submit'
                                disabled={!formData.title || !formData.description}
                            >
                                Update
                            </Button>
                        </form>
                    }
                </Box>
            </Layout>
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