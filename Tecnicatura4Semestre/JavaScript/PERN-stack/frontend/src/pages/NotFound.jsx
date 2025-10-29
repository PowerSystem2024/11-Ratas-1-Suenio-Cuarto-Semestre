import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 text-center px-6">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Página no encontrada
      </h2>
      <p className="text-gray-500 mb-8">
        Lo sentimos, la página que estás buscando no existe.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:scale-95 cursor-pointer transition-all duration-150"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFoundPage;
