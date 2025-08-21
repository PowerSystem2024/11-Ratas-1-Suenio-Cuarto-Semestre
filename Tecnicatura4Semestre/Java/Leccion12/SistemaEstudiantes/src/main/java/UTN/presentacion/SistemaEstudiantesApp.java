package UTN.presentacion;

import UTN.datos.EstudianteDAO;
import UTN.domain.Estudiante;

import java.util.Scanner;

public class SistemaEstudiantesApp {
    public static void main(String[] args) {
        var salir = false;
        var consola = new Scanner(System.in);
        var estudianteDao = new EstudianteDAO();
        while (!salir) {
            try {
                mostrarMenu();
                salir = ejecutarOpciones(consola, estudianteDao);
            } catch (Exception e) {
                System.out.println("Ocurrió un error al ejecutar la operación: " + e.getMessage());
            }
        }
    }

    private static void mostrarMenu() {
        System.out.println("""
                    ******* Sistema de Estudiantes *******"
                    1. Listar estudiantes
                    2. Buscar Estudiantes
                    3. Agregar Estudiante
                    4. Modificar Estudiante
                    5. Eliminar Estudiante
                    6. Salir
                    """);
    }

    private static boolean ejecutarOpciones(Scanner consola, EstudianteDAO estudianteDAO) {
        var opcion = Integer.parseInt(consola.nextLine());
        var salir = false;
        switch (opcion) {
            case 1 -> {
                System.out.println("Listado de estudiantes: ");
                var estudiantes = estudianteDAO.listar();
                estudiantes.forEach(System.out::println);
            }
            case 2 -> {
                System.out.print("Introduce el ID del estudiante a buscar: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudiante = new Estudiante(idEstudiante);
                var encontrado = estudianteDAO.buscarEstudiantePorId(estudiante);
                if (encontrado) {
                    System.out.println("Estudiante encontrado: " + estudiante);
                } else {
                    System.out.println("No se encontró el estudiante: " + estudiante);
                }
            }
            case 3 -> {
                System.out.println("Agregar un nuevo estudiante");
                System.out.print("Nombre: ");
                var nombre = consola.nextLine();
                System.out.print("Apellido: ");
                var apellido = consola.nextLine();
                System.out.print("Teléfono: ");
                var telefono = consola.nextLine();
                System.out.print("Email: ");
                var email = consola.nextLine();

                var nuevoEstudiante = new Estudiante(nombre, apellido, telefono, email);
                var agregado = estudianteDAO.agregarEstudiante(nuevoEstudiante);
                if (agregado) {
                    System.out.println("Estudiante agregado correctamente: " + nuevoEstudiante);
                } else {
                    System.out.println("No se pudo agregar el estudiante: " + nuevoEstudiante);
                }
            }
            case 4 -> {
                System.out.println("Modificar un estudiante");
                System.out.print("ID del estudiante a modificar: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                System.out.print("Nuevo Nombre: ");
                var nombre = consola.nextLine();
                System.out.print("Nuevo Apellido: ");
                var apellido = consola.nextLine();
                System.out.print("Nuevo Teléfono: ");
                var telefono = consola.nextLine();
                System.out.print("Nuevo Email: ");
                var email = consola.nextLine();

                var estudianteModificado = new Estudiante(idEstudiante, nombre, apellido, telefono, email);
                var modificado = estudianteDAO.modificarEstudiante(estudianteModificado);
                if (modificado) {
                    System.out.println("Estudiante modificado correctamente: " + estudianteModificado);
                } else {
                    System.out.println("No se pudo modificar el estudiante: " + estudianteModificado);
                }
            }
            case 5 -> {
                System.out.println("Eliminar un estudiante");
                System.out.print("ID del estudiante a eliminar: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                var estudianteEliminar = new Estudiante(idEstudiante);
                var eliminado = estudianteDAO.eliminarEstudiante(estudianteEliminar);
                if (eliminado) {
                    System.out.println("Estudiante eliminado correctamente: " + estudianteEliminar);
                } else {
                    System.out.println("No se pudo eliminar el estudiante: " + estudianteEliminar);
                }
            }
            case 6 -> {
                System.out.println("Saliendo del sistema...");
                salir = true;
            }
            default -> System.out.println("Opción no válida, por favor intente de nuevo.");
        }
        return salir;
    }
}