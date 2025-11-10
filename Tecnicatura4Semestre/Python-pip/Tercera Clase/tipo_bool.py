# Bool contiene dos valores posibles: True y False
# Se utilizan para representar valores de verdad en lógica y condiciones.
# Podemos representar los valores de True y False con los números 1 y 0 respectivamente.

a = 1
print(f"'a' Es de tipo Bool: {bool(a)}") # Imprime: True
b = 0
print(f"'b' Es de tipo Bool: {bool(b)}") # Imprime: False

# También se puede representar con cadenas de texto: donde cualquier cadena no vacía se considera True, y una cadena vacía se considera False.
c = "Hola"
print(f"'c' Es de tipo Bool: {bool(c)}") # Imprime: True
d = ""
print(f"'d' Es de tipo Bool: {bool(d)}")  # Imprime: False

# Lo mismo sucede con listas, tuplas y diccionarios: cualquier colección no vacía es True, y una colección vacía es False.
# Listas
e = [1, 2, 3]
print(f"'e' Es de tipo Bool: {bool(e)}") # Imprime: True
f = []
print(f"'f' Es de tipo Bool: {bool(f)}")  # Imprime: False

# Tuplas
g = (1, 2)
print(f"'g' Es de tipo Bool: {bool(g)}") # Imprime: True
h = ()
print(f"'h' Es de tipo Bool: {bool(h)}")  # Imprime: False

# Diccionarios
i = {'Nombre': 'Pepe'}
print(f"'i' Es de tipo Bool: {bool(i)}") # Imprime: True
j = {}
print(f"'j' Es de tipo Bool: {bool(j)}")  # Imprime: False

# Ahora, si pasamos cualquiera de estos valores a una estructura condicional, el resultado será el mismo.
if '':
    print("Es True")
else:
    print("Es False")

# Sucede igual con los diferentes ciclos. Aunque acá es importante aclarar que si la condición es False, el ciclo no se ejecutará. O en el caso de ser True, se ejecutará indefinidamente. Ahí debe intervenir algún 'break'.
while 0:
    print("Es True") # No imprime nada porque la condición es False