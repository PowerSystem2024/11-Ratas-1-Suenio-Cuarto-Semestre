export const validateSchema = (schema) => async (req, res, next) => {
  try {
    // Intenta validar el body con el schema
    await schema.parseAsync(req.body);
    next(); // Si pasa la validación, continúa al siguiente middleware
  } catch (error) {
    // Si el error viene de Zod, lo formateamos
    if (error.errors) {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({
        status: "error",
        message: messages,
      });
    }

    // Por si se trata de otro tipo de error
    return res.status(400).json({
      status: "error",
      message: error.message || "Error de validación",
    });
  }
};
