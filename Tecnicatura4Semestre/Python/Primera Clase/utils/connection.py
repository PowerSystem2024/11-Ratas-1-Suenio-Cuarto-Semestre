import psycopg2

class Conexion:
    _DATABASE = 'laboratorioUsuarios'
    _USERNAME = 'postgres'
    _PASSWORD = 'root'
    _DB_PORT = '5432'
    _HOST = '127.0.0.1'
    _conexion = None

    @classmethod
    def obtener_conexion(cls):
        if cls._conexion is None or cls._conexion.closed:
            cls._conexion = psycopg2.connect(
                user=cls._USERNAME,
                password=cls._PASSWORD,
                host=cls._HOST,
                port=cls._DB_PORT,
                database=cls._DATABASE
            )
        return cls._conexion

    @classmethod
    def obtener_cursor(cls):
        conn = cls.obtener_conexion()
        return conn.cursor()
