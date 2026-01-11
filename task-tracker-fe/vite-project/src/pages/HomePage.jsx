import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("lists") || "[]");
    setLists(saved);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <h1>My Task Lists</h1>

      <button
        onClick={() => navigate("/new-task-list")}
        style={{
          padding: "14px 28px",
          borderRadius: "10px",
          background: "#1677ff",
          border: "none",
          color: "white",
          fontSize: "16px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        + Create New Task List
      </button>

      {lists.map((list) => (
        <div
          key={list.id}
          onClick={() => navigate(`/task-lists/${list.id}`)}
          style={{
            background: "#222",
            padding: "20px",
            borderRadius: "10px",
            width: "300px",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          <h3>{list.title}</h3>
          <p>{list.tasks.length} tasks</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
