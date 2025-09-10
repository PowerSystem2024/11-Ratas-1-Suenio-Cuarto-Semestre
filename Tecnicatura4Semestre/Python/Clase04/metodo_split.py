cursos = "Java JavaScript node Python Diseno"
listar_cursos = cursos.split()
print(f"lista de cursos: {listar_cursos}")
print(type(listar_cursos))

cursos_separados_coma = "Java,Python,Node,JavaScript,Spring"
listar_cursos = cursos_separados_coma.split(",", 2)
print(f"lista de cursos: {listar_cursos}")
print(len(listar_cursos))
