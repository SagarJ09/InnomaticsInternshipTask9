const TodoItem = ({ todo, onDelete, onUpdate }) => (
    <div className="todo-item">
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <button onClick={() => onUpdate(todo)}>Edit</button>
        <button onClick={() => onDelete(todo._id)}>Delete</button>
    </div>
);

export default TodoItem;
