import axios from 'axios'
import { Container } from '@mui/system'
import { useState } from 'react'
import TodosList from '@/components/todos/TodosList'
import TodoForm from '@/components/todos/TodoForm'
import Todo from '@/server/models/todo'
import dbConnect from '@/server/utils/dbConnect'
import Layout from '@/containers/layout'
import { Grid } from '@mui/material'

export default function Home({ data }) {

  const [todos, setTodos] = useState(data)

  const deleteHandler = id => {
    axios.delete(`/api/todos/${id}`)
      .then((data) => setTodos(data.data.todos))
      .catch(err => console.log(err))
  }

  const addTodoHandler = ( formData) => {
    axios.post('/api/todos/', { formData })
      .then(({ data }) => setTodos(data.todos))
      .catch(err => console.log(err))
  }

  const completeHandler = id => {
    axios.put(`/api/todos/complete/${id}`)
      .then(({ data }) => setTodos(data.todos))
      .catch(err => console.log(err))
  }

  return (
      <Layout>
        <Grid container mt={15} spacing={6}>
          <Grid item xs={12} md={4.5}>
            <TodoForm addTodoHandler={addTodoHandler} />
          </Grid>

          <Grid item xs={12} md={7.5}>
            <TodosList
              todos={todos}
              deleteHandler={deleteHandler}
              completeHandler={completeHandler}
            />
          </Grid>
        </Grid>
      </Layout>
  )
}

export async function getServerSideProps() {
  dbConnect()
  const todos = await Todo.find({});
  console.log(todos);
  return {
    props: {
      data: JSON.parse(JSON.stringify(todos)),
    },
  };
}