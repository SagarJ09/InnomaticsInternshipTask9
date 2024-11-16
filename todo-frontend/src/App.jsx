import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });

  // Fetch todos
  useEffect(() => {
    axios.get("http://localhost:3000/todos").then((response) => {
      setTodos(response.data);
    });
  }, []);

  // Add a new to-do
  const addTodo = () => {
    axios.post("http://localhost:3000/todos", newTodo).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo({ title: "", description: "" });
    });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#333", color: "#fff" }}>
      <h1>To-Do List</h1>
      <input
        placeholder="Title"
        value={newTodo.title}
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        style={{ marginRight: "10px" }}
      />
      <input
        placeholder="Description"
        value={newTodo.description}
        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
      />
      <button onClick={addTodo} style={{ marginLeft: "10px" }}>
        Add Todo
      </button>

      <ul style={{ marginTop: "20px" }}>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginBottom: "10px" }}>
            <strong>{todo.title}</strong>: {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
