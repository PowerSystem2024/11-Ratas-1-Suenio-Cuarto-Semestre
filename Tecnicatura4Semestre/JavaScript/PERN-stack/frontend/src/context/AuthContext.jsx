import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]); // errores del backend 

  // Verificar sesión activa al cargar la app
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/profile", {
          withCredentials: true,
        });
        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  
  const normalizeErrors = (payload) => {
    // 1) Si es array de strings => devolver tal cual
    if (Array.isArray(payload) && payload.every((x) => typeof x === "string")) {
      return payload;
    }

    // 2) Si es array de objetos (p.ej. Zod) => tomar .message
    if (Array.isArray(payload) && payload.every((x) => typeof x === "object" && x !== null)) {
      return payload.map((e) => e?.message || "Error de validación");
    }

    // 3) Si es string que parece JSON => intentar parsear
    if (typeof payload === "string") {
      const trimmed = payload.trim();
      if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
        try {
          const parsed = JSON.parse(trimmed);
          return normalizeErrors(parsed);
        } catch {
          // no parseó: devolver como string
          return [payload];
        }
      }
      // 4) Si es un string normal => devolver como array de 1
      return [payload];
    }

    // 5) Error desconocido
    return ["Error inesperado en el servidor"];
  };

  // Helper centralizado de manejo de errores
  const handleError = (error) => {
    if (error?.response?.data) {
      const data = error.response.data;
      const msg = data.message ?? data.errors ?? data; 
      const list = normalizeErrors(msg);
      setErrors(list);
    } else {
      setErrors(["No se pudo conectar con el servidor"]);
    }
  };

  // (Opcional) borrar errores automáticamente a los 5s
  useEffect(() => {
    if (!errors?.length) return;
    const t = setTimeout(() => setErrors([]), 5000);
    return () => clearTimeout(t);
  }, [errors]);

  // Registrar usuario
  const signup = async (data) => {
    try {
      setErrors([]);
      const res = await axios.post("/signup", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      handleError(error);
      throw error; 
    }
  };

  // Iniciar sesión
  const signin = async (data) => {
    try {
      setErrors([]);
      const res = await axios.post("/signin", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  // Cerrar sesión
  const signout = async () => {
    try {
      await axios.post("/signout", {}, { withCredentials: true });
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        signup,
        signin,
        signout,
        setUser,
        errors,     // errores normalizados disponibles en las páginas
        setErrors,  
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
