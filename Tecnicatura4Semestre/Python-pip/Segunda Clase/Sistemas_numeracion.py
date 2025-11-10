# Existen diferentes sistemas de numeración, los más comunes son:
# - Decimal (base 10): Utiliza los dígitos del 0 al 9.
# - Binario (base 2): Utiliza los dígitos 0 y 1.
# - Octal (base 8): Utiliza los dígitos del 0 al 7.
# - Hexadecimal (base 16): Utiliza los dígitos del 0 al 9 y las letras A a F (o a-f) para representar los valores del 10 al 15. 

# Decimal
decimal = 24
print(f"Decimal: {decimal}")
# Binario
binario = 0b11000
print(f"Binario: {binario}")
# Octal
octal = 0o30
print(f"Octal: {octal}")
# Hexadecimal
hexadecimal = 0x18
print(f"Hexadecimal: {hexadecimal}")

# Conversión de Decimal a Binario
num_decimal = 42
num_binario = bin(num_decimal)
print(f"Decimal {num_decimal} en Binario es {num_binario}")   

# Conversión de Decimal a Octal
num_octal = oct(num_decimal)
print(f"Decimal {num_decimal} en Octal es {num_octal}")   

# Conversión de Decimal a Hexadecimal
hexanum_decimal = hex(num_decimal)
print(f"Decimal {num_decimal} en Hexadecimal es {hexanum_decimal}") 

# Otra forma de conversión es pasando el número y la base al int()
# Para que funcione, el número debe estar en formato string, y la base puede ser 2, 8, 10 o 16.
# Además, el número debe ser válido para la base especificada.
num_str = "101010"
base = 2
converted_num = int(num_str, base)
print(f"El número {num_str} en base {base} es {converted_num} en Decimal")

