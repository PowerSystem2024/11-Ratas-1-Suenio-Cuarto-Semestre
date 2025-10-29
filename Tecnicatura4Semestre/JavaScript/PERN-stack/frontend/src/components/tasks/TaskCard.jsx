import React from "react";
import { useNavigate } from "react-router-dom";

function TaskCard({ task, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 hover:shadow-md transition-all duration-150">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {task.titulo}
      </h3>
      <p className="text-gray-600 mb-4">{task.descripcion}</p>

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">
          #{task.id} — {new Date(task.fecha_creacion).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/tasks/edit/${task.id}`)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg active:scale-95 transition-all"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg active:scale-95 transition-all"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
