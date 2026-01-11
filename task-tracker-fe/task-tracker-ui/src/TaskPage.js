import React, { useEffect, useState } from "react";
import "./TaskPage.css";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = () => {
    fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title })
    })
      .then(() => window.location.reload());
  };

  return (
    <div className="container">
      <h1>Task Tracker</h1>

      <div className="add-task">
        <input
          placeholder="Enter task..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPage;
