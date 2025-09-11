package utn.estudiantes;

import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import utn.estudiantes.modelo.Estudiantes2024;
import utn.estudiantes.servicio.EstudianteServicio;

import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class EstudiantesApplication implements CommandLineRunner {
    @Autowired
    private EstudianteServicio estudianteServicio;
    private static final Logger logger =
            LoggerFactory.getLogger(EstudiantesApplication.class);

    String nl = System.lineSeparator();
    public static void main(String[] args) {
        logger.info("iniciando la aplicacion...");
        //levantar la fabrica de spring
        SpringApplication.run(EstudiantesApplication.class, args);
        logger.info("Aplicacion Finalizada!");
	}

    @Override
    public void run(String... args) throws Exception {
        logger.info(nl+"Ejecutando el metodo rin de Spring..."+nl);
        var salir = false;
        var consola = new Scanner(System.in);
        while(!salir){
            mostrarMenu();
            salir = ejecutarOpciones(consola);
            logger.info(nl);
        }
    }

    private void mostrarMenu(){
        //logger.info(nl);
        logger.info(nl+"""
                ***** Sistema de estudiantes *****
                1. Listar estudiantes
                2. Buscar estudiantes
                3. Agregar estudiantes
                4. Modificar estudiantes
                5. Eliminar estudiantes
                6. Salir
                
                Eliga una opción""");
    }

    private boolean ejecutarOpciones(Scanner consola){
        var opcion = Integer.parseInt(consola.nextLine());
        var salir = false;
        switch (opcion){
            case 1 -> {//listar estudiantes
                logger.info(nl+"listado de estudiantes: "+nl);
                List<Estudiantes2024> estudiantes = estudianteServicio.listarEstudiantes();
                estudiantes.forEach((estudiante -> logger.info(estudiantes.toString() + nl)));
            }
            case 2 -> {
                logger.info("Digite el id estudiante a buscar: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                Estudiantes2024 estudiante =
                        estudianteServicio.buscarEstudiantePorId(idEstudiante);
                if(estudiante != null)
                    logger.info("Estudiante encontrado: "+ idEstudiante +nl);
                else
                    logger.info("Estudiante No encontrado: "+ idEstudiante +nl);
            }
            case 3 -> { //Agregar estudiante
                logger.info("Agregar estudiante: "+nl);
                logger.info("Nombre: ");
                var nombre = consola.nextLine();
                logger.info("Apellido: ");
                var apellido = consola.nextLine();
                logger.info("Telefono: ");
                var telefono = consola.nextLine();
                logger.info("Email: ");
                var email = consola.nextLine();
                //crear el objeto estudiante sin el id
                var estudiante = new Estudiantes2024();
                estudiante.setNombre(nombre);
                estudiante.setApellido(apellido);
                estudiante.setTelefono(telefono);
                estudiante.setEmail(email);
                estudianteServicio.guardarEstudiante(estudiante);
                logger.info("Estudiante agregado: "+estudiante+nl);
            }
            case 4 -> {//modificar estudiante
                logger.info("modificar estudiante: "+nl);
                logger.info("Ingrese el id estudiante: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                //buscamos el estudiante a modificar
                Estudiantes2024 estudiante =
                        estudianteServicio.buscarEstudiantePorId(idEstudiante);
                if(estudiante != null){
                    logger.info("Nombre: ");
                    var nombre = consola.nextLine();
                    logger.info("apellido: ");
                    var apellido = consola.nextLine();
                    logger.info("telefono: ");
                    var telefono = consola.nextLine();
                    logger.info("email: ");
                    var email = consola.nextLine();
                    estudiante.setNombre(nombre);
                    estudiante.setApellido(apellido);
                    estudiante.setTelefono(telefono);
                    estudiante.setEmail(email);
                    estudianteServicio.guardarEstudiante(estudiante);
                    logger.info("Estudiante agregado: "+estudiante+nl);
                } else
                    logger.info("Estudiante no encontrado con el id: "+idEstudiante+nl);

            }
            case 5 ->{
                logger.info("Eliminar estudiante: "+nl);
                logger.info("Digite el id estudiante: ");
                var idEstudiante = Integer.parseInt(consola.nextLine());
                // buscamos el id estudiante a eliminar
                var estudiante = estudianteServicio.buscarEstudiantePorId(idEstudiante);
                if (estudiante != null){
                    estudianteServicio.eliminarEstudiante(estudiante);
                    logger.info("estudiante eliminado: "+estudiante);
                }else
                    logger.info("Estudiante no encontrado con id: "+estudiante+nl);
            }
            case 6 -> {
                logger.info("hasta pronto!"+nl+nl);
                salir = true;
            }
            default -> logger.info("Opcion no reconocida: "+opcion+nl);
        }
        return salir;
    }
}
