from colorama import Fore, Style, init
from entidades.Usuario import Usuario
from controllers.usuario import UsuarioDAO

init(autoreset=True)

def mostrar_menu():
    opciones = [
        "1) Listar usuarios",
        "2) Agregar usuario",
        "3) Actualizar usuario",
        "4) Eliminar usuario",
        "5) Salir"
    ]

    max_length = max(len(op) for op in opciones)

    top_border = "┌" + "─" * (max_length + 2) + "┐"
    bottom_border = "└" + "─" * (max_length + 2) + "┘"

    contenido = "\n".join(f"│ {op.ljust(max_length)} │" for op in opciones)

    return (
        f"{Fore.GREEN}{Style.BRIGHT}"
        f"{top_border}\n"
        f"{contenido}\n"
        f"{bottom_border}"
    )

def menu_handler():
    while True:
        print(mostrar_menu())
        option = input(f"{Fore.CYAN}Seleccione una opción: {Style.RESET_ALL}")

        if option == "1":
            print("📋 Listando usuarios...")
            usuarios = UsuarioDAO.listar_usuarios()
            if not usuarios:
                print(
                    f"{Fore.YELLOW}No hay usuarios registrados.{Style.RESET_ALL}"
                )
            else:
                for usuario in usuarios:
                    print(
                        f"\n{Fore.WHITE}{Style.BRIGHT}{usuario}{Style.RESET_ALL}"
                    )
        elif option == "2":
            print("➕ Agregando usuario...")
            username = input("Ingrese el nombre: ").strip()
            email = input("Ingrese el email: ").strip()
            password = input("Ingrese la contraseña: ").strip()
            usuario = Usuario(username, email, password)
            UsuarioDAO.insertar_usuario(usuario)
        elif option == "3":
            print("✏️ Actualizando usuario...")
            UsuarioDAO.actualizar_usuario()
        elif option == "4":
            print("🗑 Eliminando usuario...")
            UsuarioDAO.eliminar_usuario()
        elif option == "5":
            print("👋 Saliendo de la aplicación...")
            break
        else:
            print(f"{Fore.RED}❌ Opción inválida, intente de nuevo.{Style.RESET_ALL}")