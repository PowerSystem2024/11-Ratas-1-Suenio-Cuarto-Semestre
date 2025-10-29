import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";
import axios from "axios";

function ProfilePage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({ tareas: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/tareas", {
          withCredentials: true,
        });
        setStats({ tareas: res.data.length });
      } catch (error) {
        console.error("Error al obtener estadísticas del usuario:", error);
      }
    };
    if (user) fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100">
        <p className="text-gray-600 text-lg">Cargando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100">
        <Card>
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            No has iniciado sesión
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Inicia sesión o crea una cuenta para continuar.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
            >
              Iniciar sesión
            </a>
            <a
              href="/register"
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition-all"
            >
              Registrarse
            </a>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-8">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-3xl p-8 border border-gray-200">
        {/* Encabezado del perfil */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar  - se puede hacer componente */ } 
          <div className="flex flex-col items-center w-full md:w-1/3">
            <img
              src={user.gravatar || "https://www.gravatar.com/avatar/?d=mp"}
              alt="Avatar"
              className="w-32 h-32 rounded-full mb-4 border-4 border-blue-100 shadow-md"
            />
          </div>

          {/* Datos principales */}
          <div className="flex-1 space-y-2">
            <h2 className="text-3xl font-semibold text-gray-700">
              {user.nombre}
            </h2>
            <p className="text-gray-600 text-lg">{user.email}</p>
            <p className="text-sm text-gray-400">ID: {user.id}</p>
          </div>
        </div>

        {/* Detalles del perfil */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-gray-600 text-sm">📅 Fecha de alta</p>
            <p className="text-gray-800 font-medium">
              {new Date(user.fecha_registro || Date.now()).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-gray-600 text-sm">✅ Tareas creadas</p>
            <p className="text-gray-800 font-medium">{stats.tareas}</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 col-span-2">
            <p className="text-gray-600 text-sm">🕓 Última actualización</p>
            <p className="text-gray-800 font-medium">
              {user.fecha_actualizacion
                ? new Date(user.fecha_actualizacion).toLocaleString()
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
