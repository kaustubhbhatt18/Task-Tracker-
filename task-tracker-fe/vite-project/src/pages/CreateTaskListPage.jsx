import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTaskListPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleCreate() {
    if (!title.trim()) return;

    const id = Date.now().toString();

    const lists = JSON.parse(localStorage.getItem("lists") || "[]");

    lists.push({
      id,
      title,
      description,
      tasks: []
    });

    localStorage.setItem("lists", JSON.stringify(lists));

    // ✅ Go BACK to home (like video)
    navigate("/");
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#222",
        padding: "30px",
        borderRadius: "12px",
        width: "300px"
      }}>
        <h2 style={{ color: "white" }}>Create Task List</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <button
          onClick={handleCreate}
          style={{
            width: "100%",
            padding: "12px",
            background: "#1677ff",
            border: "none",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Create Task List
        </button>
      </div>
    </div>
  );
}
