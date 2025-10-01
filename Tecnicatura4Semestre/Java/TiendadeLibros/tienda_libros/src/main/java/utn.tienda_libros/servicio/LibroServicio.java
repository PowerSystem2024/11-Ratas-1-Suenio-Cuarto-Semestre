package utn.tienda_libros.servicio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.repositorio.LibroRepsitorio;

import java.util.List;

@Service
public class LibroServicio implements ILibroServicio {

    @Autowired
    private LibroRepsitorio libroRepositorio;

    @Override
    public List<Libro> listarLibros(){
        return libroRepositorio.findAll();
    }  
    @Override
    public Libro buscarLibroporId(Integer idLibro){
        Libro libro = libroRepositorio.findById(idLibro).orElse(null);
        return libro;
    }

    @Override
    public void guardarLibro(Libro libro) {

    }

    @Override
    public void guardarlibro(Libro libro){
        libroRepositorio.save(libro);
    }

    @Override
    public void eliminarLibro(Libro libro){
        libroRepositorio.delete(libro);
    }
}