#bool contiene los valores de True y false
#los tipos numericos, es false para el 0, true para los demas valores

valor = 0
resultado = bool(valor)
print(f"valor {valor}, Resultado: {resultado}")

valor = 0.1
resultado = bool(valor)
print(f"valor {valor}, Resultado: {resultado}")

#tipo string -> false "", true lo demas valores
valor = ""
resultado = bool(valor)
print(f"valor {valor}, Resultado: {resultado}")

valor = "hola"
resultado = bool(valor)
print(f"valor {valor}, Resultado: {resultado}")

#tipo colecciones -> false para colecciones vacias
#tipo colecciones -> true para todas las demas

#lista
valor = []
resultado = bool(valor)
print(f"valor de una lista vacia: {valor}, Resultado: {resultado}")

valor = [2, 3, 4]
resultado = bool(valor)
print(f"valor de una lista con elementos: {valor}, Resultado: {resultado}")

#tupla
valor = ()
resultado = bool(valor)
print(f"valor de una tupla vacia: {valor}, Resultado: {resultado}")

valor = (5,)
resultado = bool(valor)
print(f"valor de una tupla con elementos: {valor}, Resultado: {resultado}")

#Diccionario
valor = {}
resultado = bool(valor)
print(f"valor de un diccionario vacio: {valor}, Resultado: {resultado}")

valor = {"nombre":"juan","apellido":"perez"}
resultado = bool(valor)
print(f"valor de un diccionario con elementos: {valor}, Resultado: {resultado}")

#Sentencias de control con bool
if (1,):
    print("Regresa verdadero")
else:
    print("Regresa falso")
    
#ciclos
variable = 17
while variable:
    print("Regresa verdadero")
    break
else:
    print("Regresa falso")