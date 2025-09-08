# Concatenación de strings
nombre = "Juan"
apellido = "Pérez"
nombre_completo = nombre + " " + apellido
print("Nombre completo:", nombre_completo)

# Otra forma básica de concatenar strings
mensaje = "Hola" " Adiós"
print("Mensaje:", mensaje)
mensaje += ", Chau"
print("Mensaje 2:", mensaje)

# La forma correcta de concatenar strings es usando f-strings
nombre_completo_fstring = f"{nombre} {apellido}"
print("Nombre completo 2:", nombre_completo_fstring)