import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ListadoPersonaApp {
    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        //definimos la lista fuera del ciclo while
        List<Persona> personas = new ArrayList<>();
        //Empezamos con el menu
        var salir = false;
        while(!salir){
            mostrarMenu();
            try{
                salir = ejecutarOperaciones(entrada, personas);
            }catch (Exception e){
                System.out.println("Ocurrio un error: "+e.getMessage());
            }
            System.out.println();
        }//fin del ciclo while
    }//fin del metodo


    private static void mostrarMenu(){
        // mostrar opciones
        System.out.println("""
                **********ListarPersonas**********
                1. agregar
                2.listar
                3.salir
                """);
        System.out.println("Digite una de las opciones: ");
    }//fin metodo mostrarMenu

    private static boolean ejecutarOperaciones(Scanner entrada, List<Persona> personas){
        var opcion = Integer.parseInt(entrada.nextLine());
        var salir = false;
        //Revisamos la opcion digita a travez de un switch
        switch (opcion){
            case 1 -> {//agregar una persona a la lista
                System.out.println("Digite el nombre");
                var nombre = entrada.nextLine();
                System.out.println("Digite el telefono: ");
                var tel = entrada.nextLine();
                System.out.println("Digite el correo: ");
                var email = entrada.nextLine();
                //creamos el objeto persona
                var persona = new Persona(nombre, tel, email);
                //agregamos la persona a la lista
                personas.add(persona);
                System.out.println("La lista tiene: "+personas.size()+" elementos");
            }// fin caso 1
            case 2 ->{//Listar a las personas
                System.out.println("Listado personas: ");
                //Mejoras con lambda y el metodo de referencia
                //personas.fotEach((persona) -> System.out.println(persona));
                personas.forEach(System.out::println);
            }//Fincaso 2
            case 3 ->{//Salir del ciclo
                System.out.println("Hasta Pronto ...");
                salir = true;
            }//Fin del caso 3
            default -> System.out.printf("Opcion incorrecta: "+opcion);
        }
        return salir;
    } //fin del metodo ejecutarOperaciones
}//fin de la clase ListarPersonasApp
