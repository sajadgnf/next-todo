import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Link from 'next/link';
import axios from 'axios';

const TodosList = ({ todos, deleteHandler, completeHandler }) => {

    return (
        todos.length < 1 ?
            <Typography mt={6} variant="h4">Todos have not been added yet!!</Typography> :
            <Grid container boxShadow="rgba(0,0,0,.1) 0 4px 12px" mt={5} p={3} spacing={2}>
                {
                    todos.map((todo, index) =>
                        <Fragment key={todo.id}>
                            <Grid item xs={12} display="flex" justifyContent='space-between' alignItems="center">
                                <Link href={`/todos/${todo._id}`}>
                                    <a>
                                        <Typography
                                            variant='h5'
                                            color='#333'
                                            sx={todo.isCompleted ? { textDecoration: "line-through" } : {}}
                                        >
                                            {todo.title}
                                        </Typography>
                                    </a>
                                </Link>
                                <Box>
                                    <Button sx={{ minWidth: "unset" }} onClick={() => completeHandler(todo._id)}>
                                        {
                                            todo.isCompleted ?
                                                <DoneIcon color='success' cursor="pointer" /> :
                                                <Typography
                                                    border='2px solid gray'
                                                    borderRadius='50%'
                                                    width={25}
                                                    height={25}
                                                ></Typography>
                                        }
                                    </Button>
                                    <Link href={`/todos/edit/${todo._id}`}>
                                        <a>
                                            <Button sx={{ minWidth: "unset" }}>
                                                <BorderColorIcon color='primary' cursor="pointer" />
                                            </Button>
                                        </a>
                                    </Link>
                                    <Button
                                        sx={{ minWidth: "unset" }}
                                        onClick={() => deleteHandler(todo._id)}
                                    >
                                        <DeleteIcon color='error' cursor="pointer" />
                                    </Button>
                                </Box>
                            </Grid>
                            {
                                index !== todos.length - 1 &&
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            }
                        </Fragment>
                    )
                }
            </Grid >
    );
};

export default TodosList;