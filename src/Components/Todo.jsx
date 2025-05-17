import React, { useState } from "react";

const Todo = ({ themeColor }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="todo" style={{ borderColor: themeColor }}>
      <h3>Todo List</h3>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask} style={{ backgroundColor: themeColor }}>Add</button>

      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
            onClick={() => toggleTask(index)}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;