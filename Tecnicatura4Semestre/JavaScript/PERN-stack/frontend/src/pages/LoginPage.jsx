import React from "react";
import Input from "../components/ui/input";
import Card from "../components/ui/Card";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, errors: serverErrors, setErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setErrors([]);
      await signin(data);
      navigate("/profile");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100">
      <Card>
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">
              Este campo es obligatorio
            </span>
          )}

          <Input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              Este campo es obligatorio
            </span>
          )}

          {serverErrors.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 rounded p-3 mt-3">
              {serverErrors.map((err, i) => (
                <p key={i} className="text-sm">
                  {err}
                </p>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 active:scale-95 cursor-pointer 
             transition-all duration-150 mt-2"
          >
            Ingresar
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Regístrate
          </a>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;
