import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

function TaskFormPage() {
  const [task, setTask] = useState({ titulo: "", descripcion: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  // Si hay un ID, cargamos la tarea para editar
  useEffect(() => {
    const fetchTask = async () => {
      if (params.id) {
        try {
          const res = await axios.get(
            `/tareas/${params.id}`,
            {
              withCredentials: true,
            }
          );
          setTask(res.data);
        } catch (error) {
          console.error("Error al cargar tarea:", error);
        }
      }
    };
    fetchTask();
  }, [params.id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        // Editar tarea
        await axios.put(`/tareas/${params.id}`, task, {
          withCredentials: true,
        });
      } else {
        // Crear nueva tarea
        await axios.post("/tareas", task, {
          withCredentials: true,
        });
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Error al guardar tarea:", error);
      if (error.response && error.response.data?.message) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          {params.id ? "Editar Tarea" : "Nueva Tarea"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="titulo"
              value={task.titulo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Descripción</label>
            <textarea
              name="descripcion"
              rows="4"
              value={task.descripcion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 active:scale-95 cursor-pointer transition-all duration-150"
          >
            {params.id ? "Guardar cambios" : "Crear tarea"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
