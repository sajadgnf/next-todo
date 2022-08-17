import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const TodoForm = ({ addTodoHandler }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })
    const [isShow, setIsShow] = useState(false)

    const formHandler = evt => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    return (
        <Box mt={15} >
            {
                !isShow ?
                    <Button variant='contained' sx={{ textTransform: 'none' }} onClick={() => setIsShow(true)}>Add New Todo?</Button> :
                    <form onSubmit={e => addTodoHandler(e, formData)}>
                        <Typography variant='h5' color='secondary' mb>Add New Todo</Typography>
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
                        <Button
                            sx={{ width: 100, mt: 1, mr: 1 }}
                            variant='contained'
                            type='submit'
                            disabled={!formData.title || !formData.description}
                        >
                            Add
                        </Button>
                        <Button
                            sx={{ width: 100, mt: 1 }}
                            variant='contained'
                            onClick={() => setIsShow(false)}
                        >
                            cancel
                        </Button>
                    </form>
            }
        </Box>
    );
};

export default TodoForm;