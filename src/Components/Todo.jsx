import React, { useState } from "react";

const Todo = ({ themeColor,darkMode }) => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: input, completed: false}]);
      setInput("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo)=>
    todo.id === id ? { ...todo, completed: !todo.completed }: todo));

  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };
  return (
    <div className="todo-container">
      <div className="input-group">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="yeni görev eklebilirsin"
        />
        <button onClick={addTodo} style={{backgroundColor: themeColor}}>ekle

        </button>
      </div>
            {todos.length === 0 ? (
        <p style={{ textAlign: "center", opacity: 0.6 }}>Henüz görev yok 🎯</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
              </div>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{ backgroundColor: "#ff6b6b" }}
              >
                Sil
              </button>
               </li>
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "center", opacity: 0.7 }}>
          <p>
            ✅ {todos.filter((t) => t.completed).length} / {todos.length} tamamlandı
          </p>
        </div>
      )}
    </div>
  );
};



export default Todo;
