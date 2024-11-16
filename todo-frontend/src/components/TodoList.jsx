import { useState, useEffect } from 'react';

import { getTodos, createTodo, deleteTodo} from '../api.js'
import TodoItem from './TodoItem';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '' });

    const fetchTodos = async () => {
        const { data } = await getTodos();
        setTodos(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createTodo(formData);
        setFormData({ title: '', description: '' });
        fetchTodos();
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        fetchTodos();
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
                <button type="submit">Add Todo</button>
            </form>
            <div>
                {todos.map(todo => (
                    <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
