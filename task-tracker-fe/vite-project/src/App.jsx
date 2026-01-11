import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateTaskListPage from "./pages/CreateTaskListPage";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new-task-list" element={<CreateTaskListPage />} />
        <Route path="/task-lists/:id" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
