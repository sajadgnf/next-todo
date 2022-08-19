import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
    formContainer: {
        transform: 'translateY(-18px)',
        background: "#fff",
        padding: 22,
        borderRadius: 20,
        boxShadow: '0 0 15px 4x rgba(0,0,0, 0.1)'

    }
})

const TodoForm = ({ addTodoHandler }) => {

    const classes = useStyle()
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })
    const [isShow, setIsShow] = useState(false)

    const formHandler = evt => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const submitHandler = evt => {
        evt.preventDefault()

        addTodoHandler(formData)
        setIsShow(false)
        
        setFormData({
            title: '',
            description: ''
        })
    }

    return (
        <Box>
            {
                !isShow ?
                    <Button
                        variant='contained'
                        onClick={() => setIsShow(true)}
                        sx={{
                            px: 5,
                            py: 1,
                            fontWeight: 700,
                            textTransform: 'none',
                            transform: "translateX(100%)",
                            borderRadius: 2
                        }}
                    >
                        Add New Todo?
                    </Button> :
                    <form
                        onSubmit={evt => submitHandler(evt)}
                        className={classes.formContainer}
                    >
                        <TextField
                            label="title"
                            name='title'
                            fullWidth
                            value={formData.title}
                            onChange={evt => formHandler(evt)}
                            sx={{ "& div": { borderRadius: 3 } }}
                        />
                        <TextField
                            label="description"
                            name='description'
                            fullWidth
                            multiline
                            minRows={2}
                            sx={{ my: 2, "& div": { borderRadius: 3 } }}
                            value={formData.description}
                            onChange={evt => formHandler(evt)}
                        />
                        <Button
                            sx={{ width: "48%", mr: 1, borderRadius: 2, border: "1px solid" }}
                            variant='outlined'
                            onClick={() => setIsShow(false)}
                        >
                            cancel
                        </Button>
                        <Button
                            sx={{ width: "48%", borderRadius: 2 }}
                            variant='contained'
                            type='submit'
                            disabled={!formData.title || !formData.description}
                        >
                            Add
                        </Button>
                    </form>
            }
        </Box>
    );
};

export default TodoForm;