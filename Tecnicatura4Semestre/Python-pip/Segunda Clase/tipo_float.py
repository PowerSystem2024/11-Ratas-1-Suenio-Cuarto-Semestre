# Una variable de tipo float es un número decimal
numero_decimal = 3.14
print(f"Número decimal: {numero_decimal}")
print(f"Tipo de dato: {type(numero_decimal)}")

# Los números float pueden tener diferentes cantidades de decimales
numero_con_mas_decimales = 2.718281828459045
print(f"Número con más decimales: {numero_con_mas_decimales}")

# Si queremos limitar la cantidad de decimales al mostrar el número... 
print(f"Número con dos decimales: {numero_con_mas_decimales:.2f}")

# Podemos convertir un string a float
numero_str = "9.81"
numero_convertido = float(numero_str)
print(f"Número convertido de string a float: {numero_convertido}")

# También podemos convertir un entero a float
entero = 7
entero_convertido = float(entero)
print(f"Número convertido de entero a float: {entero_convertido}")

# También pueden representarse en notación exponencial
# Es decir, usamos la letra 'e' para indicar la potencia de 10
# Aplica para números muy grandes o muy pequeños, positivos o negativos
# Y cualquier operación con float resultará en un float

numero_exponencial = 1.2e4  # Equivalente a 1.2 * 10^4 = 12000.0
print(f"Número en notación exponencial: {numero_exponencial}")
print(f"Tipo de dato: {type(numero_exponencial)}")

