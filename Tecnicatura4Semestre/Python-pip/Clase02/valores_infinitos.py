import math
from decimal import Decimal 

#manejo de valores infinitos
infinito_positivo = float("inf")
print(f"infinito positivo: {infinito_positivo}")
print(f"Es infinito: {math.isinf(infinito_positivo)}")

infinito_negativo = float("-inf")
print(f"infinito negativo: {infinito_negativo}")
print(f"Es infinito?: {math.isinf(infinito_negativo)}")

#modulo math
infinito_positivo = math.inf
print(f"infinito positivo: {infinito_positivo}")
print(f"Es infinito: {math.isinf(infinito_positivo)}")

infinito_negativo = -math.inf
print(f"infinito negativo: {infinito_negativo}")
print(f"Es infinito?: {math.isinf(infinito_negativo)}")

#modulo decimal
infinito_positivo = Decimal("Infinity")
print(f"infinito positivo: {infinito_positivo}")
print(f"Es infinito?: {math.isinf(infinito_positivo)}")