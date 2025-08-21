from entidades.Usuario import Usuario
from utils.connection import Conexion

class UsuarioDAO:
    _usuario_actual = None
    _SELECCIONAR_USUARIO = "SELECT * FROM usuario ORDER BY id_usuario"

    _INSERTAR_USUARIO = """
    INSERT INTO usuario(nombre, email, password)
    VALUES (%s, %s, %s)
    """

    _ACTUALIZAR_USUARIO = """
    UPDATE usuario
    SET nombre=%s, email=%s, password=%s
    WHERE id_usuario=%s
    """

    _ELIMINAR_USUARIO = "DELETE FROM usuario WHERE id_usuario=%s"

    @classmethod
    def listar_usuarios(cls):
        registros = []
        try:
            with Conexion.obtener_cursor() as cursor:
                cursor.execute(cls._SELECCIONAR_USUARIO)
                usuarios = cursor.fetchall()
                for usuario in usuarios:
                    id_usuario, nombre, password, email = usuario
                    registros.append(Usuario(
                        username=nombre,
                        email=email,
                        password=password,
                        id_usuario=id_usuario
                    ))
        except Exception as e:
            print(f"Error al leer usuarios: {e}")
        return registros

    @classmethod
    def insertar_usuario(cls, usuario):
        conn = Conexion.obtener_conexion()
        try:
            with conn.cursor() as cursor:
                cursor.execute(
                    cls._INSERTAR_USUARIO,
                    (usuario.username, usuario.email, usuario.password)
                )
                conn.commit()
                print(f"Usuario creado exitosamente: {usuario}")
        except Exception as e:
            conn.rollback()
            print(f"Error al crear usuario: {e}")

    @classmethod
    def actualizar_usuario(cls):
        conn = Conexion.obtener_conexion()
        try:
            id_usuario = int(input("Ingrese el ID del usuario a actualizar: "))

            usuarios = cls.listar_usuarios()
            usuario = next((u for u in usuarios if u.id_usuario == id_usuario), None)

            if not usuario:
                print(f"No se encontró usuario con ID {id_usuario}")
                return

            nuevo_username = input(f"Ingrese nuevo nombre [{usuario.username}]: ") or usuario.username
            nuevo_email = input(f"Ingrese nuevo email [{usuario.email}]: ") or usuario.email
            nuevo_password = input(f"Ingrese nueva contraseña [********]: ") or usuario.password

            usuario.username = nuevo_username
            usuario.email = nuevo_email
            usuario.password = nuevo_password

            with conn.cursor() as cursor:
                cursor.execute(
                    cls._ACTUALIZAR_USUARIO,
                    (usuario.username, usuario.email, usuario.password, usuario.id_usuario)
                )
                conn.commit()
                print(f"Usuario actualizado exitosamente: {usuario}")

        except Exception as e:
            conn.rollback()
            print(f"Error al actualizar usuario: {e}")

    @classmethod
    def eliminar_usuario(cls):
        conn = Conexion.obtener_conexion()
        try:
            id_usuario = int(input("Ingrese el ID del usuario a eliminar: "))

            usuarios = cls.listar_usuarios()
            usuario = next((u for u in usuarios if u.id_usuario == id_usuario), None)

            if not usuario:
                print(f"No se encontró usuario con ID {id_usuario}")
                return

            confirm = input(f"¿Está seguro que desea eliminar al usuario {usuario.username}? (s/n): ").lower()
            if confirm != 's':
                print("Operación cancelada.")
                return

            with conn.cursor() as cursor:
                cursor.execute(cls._ELIMINAR_USUARIO, (id_usuario,))
                conn.commit()
                print(f"Usuario eliminado exitosamente: {usuario.username}")

        except Exception as e:
            conn.rollback()
            print(f"Error al eliminar usuario: {e}")

