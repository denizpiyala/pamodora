import React, {useState} from "react";

const Todo = () => {
    const [task , setTask] = useState("");
    const [todoList , setTodoList] = useState([]);

    const addTask = () => {
        if (!task.trim()) return;
        setTodoList([...todoList, task]);
        setTask("");
    };
    const removeTask = (index) => {
        const newList = [...todoList];
        newList.splice(index, 1);
        setTodoList(newList);
};

return (
    <div className="todo-container">
        <h2>To Do List</h2>
        <div className="input-group">
            <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Yeni görev ekle..."
            />
            <button onClick={addTask}>Ekle</button>
        </div>
        <ul>
            {todoList.map((t, index) => (
                <li key={index}>
                    {t}
                    <button onClick={() => removeTask(index)}>Sil</button>
                </li>
            ))}
        </ul>

    </div>
);
};
export default Todo;