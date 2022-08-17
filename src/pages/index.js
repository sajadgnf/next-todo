import axios from 'axios'
import { Container } from '@mui/system'
import { useState } from 'react'
import TodosList from '@/components/todos/TodosList'
import TodoForm from '@/components/todos/TodoForm'
import Todo from '@/server/models/todo'
import dbConnect from '@/server/utils/dbConnect'
import Layout from '@/containers/layout'

export default function Home({ data }) {

  const [todos, setTodos] = useState(data)

  const deleteHandler = id => {
    axios.delete(`/api/todos/${id}`)
      .then((data) => setTodos(data.data.todos))
      .catch(err => console.log(err))
  }

  const addTodoHandler = (evt, formData) => {
    evt.preventDefault()

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
    <Container maxWidth="lg">
      <Layout>
        <TodoForm addTodoHandler={addTodoHandler} />
        <TodosList
          todos={todos}
          deleteHandler={deleteHandler}
          completeHandler={completeHandler}
        />
      </Layout>
    </Container>
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