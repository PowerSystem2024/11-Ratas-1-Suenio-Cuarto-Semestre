import e from "express";
import { z } from "zod";

export const signupSchema = z.object({
  nombre: z.string({
    required_error: "El nombre es obligatorio",
    invalid_type_error: "El nombre debe ser una cadena de texto",
  }).min(3, { message: "El nombre debe tener al menos 3 caracteres"
  }).max(50, { message: "El nombre no debe exceder los 250 caracteres" 
  }),
  email: z.
    string({
      required_error: "El email es obligatorio",
    }).regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email válido"),
  password: z.string({
    required_error: "La contraseña es obligatoria",
  }).min(5, { message: "La contraseña debe tener al menos 5 caracteres" 
  }),
}); 

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "El email es obligatorio",
    })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email válido"),

  password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(5, { message: "La contraseña debe tener al menos 5 caracteres" }),
});
