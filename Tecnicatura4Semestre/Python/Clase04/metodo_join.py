tupla_str = ("hola", "alumnos", "Tecnicatura", "universitaria")
mensaje = " ".join(tupla_str)
print(f"mensaje: {mensaje}")

lista_cursos = ["java", "python", "angular", "Spring"]
mensaje = ", ".join(lista_cursos)
print(f"mensaje: {mensaje}")

cadena = "holamundo"
mensaje = ".".join(cadena)
print(f"mensaje: {mensaje}")

diccionario = {"nombre": "juan", "apellido": "perez", "edad": "18"}
llaves = "-".join(diccionario.keys())
valores = "-".join(diccionario.values())
print(f"llaves: {llaves}, type: {type(llaves)}")
print(f"valores: {valores}, type: {type(valores)}")
