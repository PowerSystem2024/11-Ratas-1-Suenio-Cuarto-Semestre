from decimal import Decimal
import math

#NaN (not a number)
a = float("2.0")
print(f"a: {a}")

#modulo math
a = float("nan")
print(f"es de tipo nan(not a number)?: {math.isnan(a)}")

#modulo decimal
a = Decimal("nan")

print(f"es de tipo nan(not a number)?: {math.isnan(a)}")
