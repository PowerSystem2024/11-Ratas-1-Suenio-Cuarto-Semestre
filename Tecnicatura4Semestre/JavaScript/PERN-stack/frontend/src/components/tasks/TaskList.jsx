import React from "react";
import TaskCard from "./TaskCard";

function TaskList({ tasks, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        No tienes tareas todavía. ¡Crea una nueva!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default TaskList;
