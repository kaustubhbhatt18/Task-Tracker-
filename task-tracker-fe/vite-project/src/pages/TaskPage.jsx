import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./TaskPage.css";

export default function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [list, setList] = useState(null);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const lists = JSON.parse(localStorage.getItem("lists") || "[]");
    const found = lists.find(l => l.id === id);
    setList(found);
  }, [id]);

  function save(updatedList) {
    const lists = JSON.parse(localStorage.getItem("lists") || "[]");
    const updated = lists.map(l => l.id === id ? updatedList : l);
    localStorage.setItem("lists", JSON.stringify(updated));
    setList(updatedList);
  }

  function addTask() {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title,
      priority,
      dueDate,
      done: false
    };

    save({ ...list, tasks: [...list.tasks, newTask] });

    setTitle("");
    setPriority("LOW");
    setDueDate("");
  }

  function toggleDone(taskId) {
    const updated = {
      ...list,
      tasks: list.tasks.map(t =>
        t.id === taskId ? { ...t, done: !t.done } : t
      )
    };
    save(updated);
  }

  function deleteTask(taskId) {
    const updated = {
      ...list,
      tasks: list.tasks.filter(t => t.id !== taskId)
    };
    save(updated);
  }

  if (!list) return <div>Not found</div>;

  const completed = list.tasks.filter(t => t.done).length;
  const total = list.tasks.length;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="task-page">
      <div className="top-bar">
        <button onClick={() => navigate("/")}>← Back</button>
        <h1>{list.title}</h1>
      </div>

      {/* Progress */}
      <div className="progress">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p>{completed} / {total} completed</p>

      {/* Add Bar */}
      <div className="add-bar">
        <input
          placeholder="Task title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />

        <button onClick={addTask}>+ Add Task</button>
      </div>

      {/* Task Table */}
      <div className="card">
        {list.tasks.length === 0 && <p>No tasks yet...</p>}

        {list.tasks.map(task => (
          <div key={task.id} className="task-row">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleDone(task.id)}
            />

            <span style={{ textDecoration: task.done ? "line-through" : "none" }}>
              {task.title}
            </span>

            <span className={`priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>

            <span>{task.dueDate || "-"}</span>

            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
