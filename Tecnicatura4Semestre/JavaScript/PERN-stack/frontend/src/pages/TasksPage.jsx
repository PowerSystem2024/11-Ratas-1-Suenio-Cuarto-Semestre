import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskList from "../components/tasks/TaskList";
import { useNavigate } from "react-router-dom";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch para traer las tareeas del usuario
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tareas", {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 Eliminar tarea
  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return;
    try {
      await axios.delete(`/tareas/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Mis Tareas</h1>
          <button
            onClick={() => navigate("/tasks/create")}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 active:scale-95 cursor-pointer transition-all duration-150"
          >
            + Nueva tarea
          </button>
        </div>

        {/* Lista de tareas */}
        <TaskList tasks={tasks} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default TasksPage;
