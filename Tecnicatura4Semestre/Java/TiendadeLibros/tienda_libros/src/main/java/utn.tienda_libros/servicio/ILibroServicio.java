package utn.tienda_libros.servicio;

import utn.tienda_libros.modelo.Libro;

import java.util.List;

public interface ILibroServicio {
    public List <Libro> listarLibros();
    public Libro buscarLibroporId (Integer IdLibro);
    public void guardarLibro(Libro libro);

    void guardarlibro(Libro libro);

    public void eliminarLibro(Libro libro);
}
