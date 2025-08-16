package UTN.datos;

import UTN.domain.Estudiante;

import static UTN.conexion.Conexion.getConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class EstudianteDAO {
    public List<Estudiante> listar() {
        List<Estudiante> estudiantes = new ArrayList<>();
        PreparedStatement ps;
        ResultSet rs;
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2025 ORDER BY idestudiantes2025";
        try {
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()) {
                var estudiante = new Estudiante();
                estudiante.setIdEstudiante(rs.getInt("idestudiantes2025"));
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                estudiantes.add(estudiante);
            }
        } catch (Exception e) {
            System.out.println("Ocurrió un error al seleccionar datos: " + e.getMessage());
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.println("Ocurrió un error al cerrar la conexión: " + e.getMessage());
            }
        }
        return estudiantes;
    }

    public boolean buscarEstudiantePorId(Estudiante estudiante) {
        PreparedStatement ps;
        ResultSet rs;
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2025 WHERE idestudiantes2025 = ?";
        try {
            ps = con.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            rs = ps.executeQuery();
            if (rs.next()) {
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                return true; // Estudiante encontrado
            }
        } catch (Exception e) {
            System.out.println("Ocurrió un error al buscar el estudiante: " + e.getMessage());
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.println("Ocurrió un error al cerrar la conexión: " + e.getMessage());
            }
        }
        return false; // Estudiante no encontrado
    }

    public boolean agregarEstudiante(Estudiante estudiante) {
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "INSERT INTO estudiantes2025 (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)";
        try {
            ps = con.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.execute();
            return true;
        } catch (Exception e) {
            System.out.println("Ocurrió un error al agregar el estudiante: " + e.getMessage());
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.println("Ocurrió un error al cerrar la conexión: " + e.getMessage());
            }
        }
        return false; // Estudiante no encontrado
    }

    public boolean modificarEstudiante(Estudiante estudiante) {
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "UPDATE estudiantes2025 SET nombre = ?, apellido = ?, telefono = ?, email = ? WHERE idestudiantes2025 = ?";
        try {
            ps = con.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.setInt(5, estudiante.getIdEstudiante());
            ps.execute();
            return true;
        } catch (Exception e) {
            System.out.println("Ocurrió un error al modificar el estudiante: " + e.getMessage());
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.println("Ocurrió un error al cerrar la conexión: " + e.getMessage());
            }
        }
        return false; // Estudiante no encontrado
    }

    public boolean eliminarEstudiante(Estudiante estudiante) {
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "DELETE FROM estudiantes2025 WHERE idestudiantes2025=?";
        try {
            ps = con.prepareStatement(sql);
            ps.setInt(1, estudiante.getIdEstudiante());
            ps.execute();
            return true;
        } catch (Exception e) {
            System.out.println("Ocurrió un error al eliminar el estudiante: " + e.getMessage());
        } finally {
            try {
                con.close();
            } catch (Exception e) {
                System.out.println("Ocurrió un error al cerrar la conexión: " + e.getMessage());
            }
        }
        return false; // Estudiante no encontrado
    }

    public static void main(String[] args) {
        var estudianteDAO = new EstudianteDAO();
//        System.out.println("Listado de estudiantes: ");
//        List<Estudiante> estudiantes = estudianteDAO.listar();
//        estudiantes.forEach(System.out::println);

        //Eliminar los estudiantes
        var estudianteEliminar = new Estudiante(3);
        var eliminado = estudianteDAO.eliminarEstudiante(estudianteEliminar);
        if (eliminado) {
            System.out.println("Estudiante eliminado: "+ estudianteEliminar + " correctamente.");
        } else {
            System.out.println("No se pudo eliminar el estudiante: " + estudianteEliminar);
        }

        //Listar los estudiantes
        System.out.println("Listado de estudiantes: ");
        List<Estudiante> estudiantes = estudianteDAO.listar();
        estudiantes.forEach(System.out::println);
    }
}