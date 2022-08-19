import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import ModeIcon from '@mui/icons-material/Mode';
import Link from 'next/link';

const TodosList = ({ todos, deleteHandler, completeHandler }) => {

    return (
        todos.length < 1 ?
            <Typography mt={6} variant="h4">Todos have not been added yet!!</Typography> :
            <Grid
                container
                p={2}
                borderRadius={3}
                bgcolor="#fff"
            >
                {
                    todos.map((todo) =>
                        <Fragment key={todo._id}>
                            <Grid
                                item
                                xs={12}
                                display="flex"
                                justifyContent='space-between'
                                alignItems="center"
                                border="1px solid #fddfff"
                                borderRadius={3}
                                py={1}
                                px={2}
                                my
                            >
                                <Link href={`/todos/${todo._id}`}>
                                    <a>
                                        <Typography
                                            variant='p'
                                            component="h3"
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
                                                <DoneIcon
                                                    color='success'
                                                    cursor="pointer"
                                                /> :
                                                <Typography
                                                    border='2px solid gray'
                                                    borderRadius='50%'
                                                    width={20}
                                                    height={20}
                                                ></Typography>
                                        }
                                    </Button>
                                    <Link href={`/todos/edit/${todo._id}`}>
                                        <a>
                                            <Button sx={{ minWidth: "unset" }}>
                                                <ModeIcon
                                                    color='customBlue'
                                                    cursor="pointer"
                                                />
                                            </Button>
                                        </a>
                                    </Link>
                                    <Button
                                        sx={{ minWidth: "unset" }}
                                        onClick={() => deleteHandler(todo._id)}
                                    >
                                        <DeleteIcon color='customRed' cursor="pointer" />
                                    </Button>
                                </Box>
                            </Grid>
                        </Fragment>
                    )
                }
            </Grid >
    );
};

export default TodosList;