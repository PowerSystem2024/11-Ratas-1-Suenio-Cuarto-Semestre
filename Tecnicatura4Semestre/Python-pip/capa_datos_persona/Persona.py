from logger_base import log

class Persona:
    def __init__(self, id_persona=None, nombre=None, apellido=None, email=None):
        self._id_persona = id_persona
        self._nombre = nombre
        self._apellido = apellido
        self._email = email
        
    def __str__(self):
        return f"""
            Id Persona: {self._id_persona},
            nombre: {self._nombre},
            apellido: {self._apellido},
            email: {self._email}
        """
    #metodos getters and setters
    @property
    def id_persona(self, id_persona):
        self._id_persona = id_persona
    @id_persona.setter
    def id_persona(self, id_persona):
        self._id_persona = id_persona
        
    @property
    def nombre(self):
        return self._nombre
    @nombre.setter
    def nombre(self, nombre):
        self._nombre = nombre
    
    @property
    def apellido(self):
        return self._apellido
    @apellido.setter
    def apellido(self, apellido):
        self._apellido = apellido
        
    @property
    def email(self):
        return self._email
    @email.setter
    def email(self, email):
        self._email = email
        
if __name__ == "__main__":
    persona1 = Persona(1, "juan", "Perez", "Jperez@email.com")
    log.debug(persona1)
    persona2 = Persona("jose", "lepez", "Ljose@email.com")
    log.debug(persona2)