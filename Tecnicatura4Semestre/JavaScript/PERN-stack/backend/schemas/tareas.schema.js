import { z } from "zod";

export const createTareaSchema = z.object({
  titulo: z.string().min(3, { message: "El título debe tener al menos 3 caracteres" }),
  descripcion: z.string().min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
});

export const updateTareaSchema = z.object({
  titulo: z.string().min(3, { message: "El título debe tener al menos 3 caracteres" }).optional(),
  descripcion: z.string().min(5, { message: "La descripción debe tener al menos 5 caracteres" }).optional(),
});
