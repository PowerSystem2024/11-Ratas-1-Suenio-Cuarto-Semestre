import React from "react";
import Input from "../components/ui/input";
import Card from "../components/ui/Card";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const { signup, errors: serverErrors, setErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setErrors([]);
      await signup(data);
      navigate("/profile");
    } catch {
      // Los errores ya se manejan en el contexto
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100">
      <Card>
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Crear cuenta
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Usuario"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {formErrors?.nombre && (
            <span className="text-red-500 text-sm">
              {formErrors.nombre.message}
            </span>
          )}

          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: "El email es obligatorio" })}
          />
          {formErrors?.email && (
            <span className="text-red-500 text-sm">
              {formErrors.email.message}
            </span>
          )}

          <Input
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          {formErrors?.password && (
            <span className="text-red-500 text-sm">
              {formErrors.password.message}
            </span>
          )}

          {serverErrors?.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded p-3 mt-3">
              {serverErrors.map((msg, i) => (
                <p key={i} className="text-red-600 text-sm">
                  {msg}
                </p>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 active:scale-95 cursor-pointer transition-all duration-150 mt-4"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-4">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default RegisterPage;
