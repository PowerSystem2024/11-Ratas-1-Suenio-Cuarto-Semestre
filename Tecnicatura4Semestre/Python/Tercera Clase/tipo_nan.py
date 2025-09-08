import math
from decimal import Decimal

# NaN (Not a Number) es un valor especial en Python que representa un valor numérico indefinido o no representable.
# Se utiliza comúnmente en operaciones matemáticas y en el manejo de datos para indicar la ausencia de un valor válido.

a = float('NaN')  # Crear un valor NaN
print(a)  # Imprime: nan
# Esto es posible porque float reconoce 'nan' o 'NaN' como un valor especial. No es que sea una cadena de texto, sino un valor numérico especial.
# También se puede obtener NaN a través de operaciones matemáticas inválidas, como dividir 0.0 por 0.0:

# Módulo Math
b = float('nan')
print(f"'b' Es de tipo NaN: {math.isnan(b)}")  # Imprime: True
# math.isnan() es una función que verifica si un valor es NaN.

# Módulo Decimal
c = Decimal('NaN')
print(f"'c' Es de tipo NaN: {math.isnan(c)}")  
