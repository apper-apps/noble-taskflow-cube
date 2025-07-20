import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskManager from "@/components/pages/TaskManager";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<TaskManager />} />
        <Route path="/tasks" element={<TaskManager />} />
        <Route path="*" element={<TaskManager />} />
      </Routes>
    </div>
  );
}

export default App;