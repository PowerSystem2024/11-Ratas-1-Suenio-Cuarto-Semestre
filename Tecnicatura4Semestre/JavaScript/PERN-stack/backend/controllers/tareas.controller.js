import { pool } from '../db.js';

export const listarTareas = async (req, res) => {
  const resultado = await pool.query('SELECT * FROM tareas WHERE usuario_id = $1', [req.userId]);
  return res.json(resultado.rows);
};

export const listarTarea = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query('SELECT * FROM tareas WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ message: 'Tarea no encontrada' });
  }
  return res.json(result.rows[0]);
};

export const crearTarea = async (req, res, next) => {
  const { titulo, descripcion} = req.body;

  try {
    //throw new Error('Error de prueba');
    const result = await pool.query(
      'INSERT INTO tareas (titulo, descripcion, usuario_id) VALUES ($1, $2, $3) RETURNING *',
      [titulo, descripcion, req.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Ya existe una tarea con ese título' });
    }
    console.log(error);
    next(error);
  }
};

export const actualizarTarea = async (req, res, next) => {
  const { titulo, descripcion } = req.body;
  
  try {
    const result = await pool.query(
      "UPDATE tareas SET titulo = COALESCE($1, titulo), descripcion = COALESCE($2, descripcion) WHERE id = $3 AND usuario_id = $4 RETURNING *",
      [titulo, descripcion, req.params.id, req.userId]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ status: "error", message: "Tarea no encontrada" });

    res.json({
      status: "success",
      message: "Tarea actualizada correctamente",
      tarea: result.rows[0],
    });
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    next(error);
  }
};

export const eliminarTarea = async (req, res) => {
   const resultado = await pool.query('DELETE FROM tareas WHERE id = $1', [req.params.id]);
   if (resultado.rowCount === 0) {
     return res.status(404).json({ message: 'Tarea no encontrada' });
   }  
   return res.json({
    message: 'Tarea eliminada',
    //resultado: resultado
   });
};
