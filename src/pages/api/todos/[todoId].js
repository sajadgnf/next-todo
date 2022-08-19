import dbConnect from "@/server/utils/dbConnect"
import Todo from "@/server/models/todo"

dbConnect()

export default async function handler(req, res) {
    const { method, query, body } = req

    if (method === 'DELETE') {
        await Todo.findByIdAndDelete(query.todoId);
        const todos = await Todo.find({});
        return res.status(200).json({ message: "Todo Deleted Successfully", todos });
    } else if (method === 'GET') {
        const todo = await getOneTodo(query);
        return res.status(200).json({ message: "Todo Loaded", todo });
    } else if (method === 'PUT') {
        const { title, description, isCompleted } = body

        const todo = await Todo.findById(query.todoId);
        todo.title = title;
        todo.description = description;
        todo.isCompleted = isCompleted;
        await todo.save();
        const todos = await Todo.find({});
        return res.status(200).json({ message: "Todo Edited Successfully", todos });
    }
}

export async function getOneTodo(query) {
    const todo = await Todo.findById(query.todoId);
    return todo;
}
