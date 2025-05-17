import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Todo = ({ themeColor, user }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    if (user) loadTasks();
  }, [user]);

  const loadTasks = async () => {
    if (user) {
      const docRef = doc(db, "users", user.uid, "tasks");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTasks(docSnap.data().tasks || []);
      }
    }
  };

  const addTask = async () => {
    if (taskInput.trim() && user) {
      const updatedTasks = [...tasks, { text: taskInput, completed: false }];
      setTasks(updatedTasks);
      setTaskInput("");
      await setDoc(doc(db, "users", user.uid, "tasks"), { tasks: updatedTasks });
    }
  };

  const toggleTask = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);

    if (user) {
      await setDoc(doc(db, "users", user.uid, "tasks"), { tasks: updatedTasks });
    }
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
