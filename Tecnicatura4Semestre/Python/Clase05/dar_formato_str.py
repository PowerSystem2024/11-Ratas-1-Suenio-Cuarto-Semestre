#dar formato a un string

nombre = "Augusto"
edad = 24
mensaje_con_formato = "mi nombre es %s y tengo %d años" % (nombre, edad)

#creamos una tupla
persona = ("Carla","Gomez",5000.00)
mensaje_con_formato = "hola %s %s . tu sueldo es %.2f" #% (persona)
#print(mensaje_con_formato % persona)

nombre = "juan"
edad = 19
sueldo = 3000
#mensaje_con_formato = "nombre {} edad {} sueldo {:.2f}".format(nombre, edad, sueldo)
#mensaje = "nombre {0} edad {1} sueldo {2:.2f}".format(nombre, edad, sueldo)
#print(mensaje)

mensaje = "Nombre {n} Edad {e} suledo {s:.2f}".format (n=nombre, e=edad, s=sueldo)
#print(mensaje)

diccionario = {"Nombre": "ivan", "Edad": 35, "Sueldo": 8000.00}
mensaje = "Nombre {dic[Nombre]} Edad {dic[Edad]} Sueldo {dic[Sueldo]:.2f}".format(dic=diccionario)
print(mensaje)