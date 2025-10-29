import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link
        to="/"
        className="text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors"
      >
        11 Ratas un Sueño
      </Link>

      {/* MENÚ */}
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
        >
          Inicio
        </Link>
        <Link
          to="/about"
          className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
        >
          Acerca de
        </Link>

        {!isAuthenticated ? (
          <>
            {/* Mostrar cuando NO está logueado */}
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 cursor-pointer transition-all duration-150"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 active:scale-95 cursor-pointer transition-all duration-150"
            >
              Registrarse
            </Link>
          </>
        ) : (
          <>
            {/* Mostrar cuando SÍ está logueado */}
            <Link
              to="/profile"
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Perfil
            </Link>
            <Link
              to="/tasks"
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Tareas
            </Link>

            {/* Avatar*/}
            <div className="flex items-center gap-3 ml-4">
              <img
                src={user?.gravatar || "https://www.gravatar.com/avatar/?d=mp"}
                alt="avatar"
                className="w-9 h-9 rounded-full border border-gray-300"
              />
              <span className="text-gray-700 font-medium">{user?.nombre}</span>
            </div>

            {/* Botón de cerrar sesión */}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 cursor-pointer transition-all duration-150"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
