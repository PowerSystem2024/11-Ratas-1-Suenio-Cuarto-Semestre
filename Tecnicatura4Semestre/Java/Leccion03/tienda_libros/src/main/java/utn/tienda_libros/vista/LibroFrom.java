package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.LibroServicio;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

@Component
public class LibroFrom extends JFrame {
    LibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private JTextField idTexto;
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;
    private JButton agregarButton;
    private JButton modificarButton;
    private JButton eliminarButton;
    private DefaultTableModel tablaModeloLibros;

    @Autowired
    public LibroFrom(LibroServicio libroServicio){
        this.libroServicio = libroServicio;
        iniciarForma();

        // Configurar listeners después de que los componentes estén creados
        agregarButton.addActionListener(event -> agregarLibro());
        modificarButton.addActionListener(event -> modificarLibro());
        eliminarButton.addActionListener(event -> eliminarLibro());

        tablaLibros.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                super.mouseClicked(e);
                cargarLibroSeleccionado();
            }
        });
    }

    private void iniciarForma(){
        setTitle("Tienda de Libros");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(900, 700);

        // Crear el panel principal
        crearComponentes();

        // Centrar la ventana en la pantalla
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension tamanioPantalla = toolkit.getScreenSize();
        int x = (tamanioPantalla.width - getWidth()) / 2;
        int y = (tamanioPantalla.height - getHeight()) / 2;
        setLocation(x, y);

        setVisible(true);
    }

    private void crearComponentes(){
        panel = new JPanel();
        panel.setLayout(new BorderLayout());

        // Panel superior con título
        JPanel panelSuperior = new JPanel();
        JLabel titulo = new JLabel("Tienda de Libros");
        titulo.setFont(new Font("Arial", Font.BOLD, 28));
        panelSuperior.add(titulo);
        panel.add(panelSuperior, BorderLayout.NORTH);

        // Panel central con formulario
        JPanel panelFormulario = new JPanel();
        panelFormulario.setLayout(new GridBagLayout());
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;

        // Libro
        gbc.gridx = 0;
        gbc.gridy = 0;
        panelFormulario.add(new JLabel("Libro:"), gbc);
        gbc.gridx = 1;
        libroTexto = new JTextField(20);
        panelFormulario.add(libroTexto, gbc);

        // Autor
        gbc.gridx = 0;
        gbc.gridy = 1;
        panelFormulario.add(new JLabel("Autor:"), gbc);
        gbc.gridx = 1;
        autorTexto = new JTextField(20);
        panelFormulario.add(autorTexto, gbc);

        // Precio
        gbc.gridx = 0;
        gbc.gridy = 2;
        panelFormulario.add(new JLabel("Precio:"), gbc);
        gbc.gridx = 1;
        precioTexto = new JTextField(20);
        panelFormulario.add(precioTexto, gbc);

        // Existencias
        gbc.gridx = 0;
        gbc.gridy = 3;
        panelFormulario.add(new JLabel("Existencias:"), gbc);
        gbc.gridx = 1;
        existenciasTexto = new JTextField(20);
        panelFormulario.add(existenciasTexto, gbc);

        // Botones
        JPanel panelBotones = new JPanel();
        agregarButton = new JButton("Agregar");
        modificarButton = new JButton("Modificar");
        eliminarButton = new JButton("Eliminar");
        panelBotones.add(agregarButton);
        panelBotones.add(modificarButton);
        panelBotones.add(eliminarButton);

        gbc.gridx = 0;
        gbc.gridy = 4;
        gbc.gridwidth = 2;
        panelFormulario.add(panelBotones, gbc);

        panel.add(panelFormulario, BorderLayout.CENTER);

        // Crear la tabla
        createUIComponents();
        JScrollPane scrollPane = new JScrollPane(tablaLibros);
        scrollPane.setPreferredSize(new Dimension(850, 300));
        panel.add(scrollPane, BorderLayout.SOUTH);

        setContentPane(panel);
    }

    private void agregarLibro(){
        //LLeer los valores del formulario
        if(libroTexto.getText().equals("")){
            mostrarMensaje("Ingrese el nombre del libro");
            libroTexto.requestFocusInWindow();
            return;
        }
        var nombreLibro = libroTexto.getText();
        var autor = autorTexto.getText();
        var precio = Double.parseDouble(precioTexto.getText());
        var existencias = Integer.parseInt(existenciasTexto.getText());
        //Creamos el objeto libro
        var libro = new Libro(null, nombreLibro, autor, precio, existencias);
        //libro.setNombreLibro(nombreLibro);
        //libro.setAutor(autor);
        //libro.setPrecio(precio);
        //libro.setExistencias(existencias);
        this.libroServicio.guardarLibro(libro);
        mostrarMensaje("Se agrego el libro...");
        limpiarFormulario();
        listarLibros();
    }

    private void cargarLibroSeleccionado(){
        // Los indices de las columnas inician en 0
        var renglon = tablaLibros.getSelectedRow();
        if(renglon != -1){
            libroTexto.setText(tablaLibros.getValueAt(renglon, 1).toString());
            autorTexto.setText(tablaLibros.getValueAt(renglon, 2).toString());
            precioTexto.setText(tablaLibros.getValueAt(renglon, 3).toString());
            existenciasTexto.setText(tablaLibros.getValueAt(renglon, 4).toString());
        }
    }

    private void modificarLibro(){
        if(this.tablaLibros.getSelectedRow() == -1){
            mostrarMensaje("Debe seleccionar un libro de la tabla");
            return;
        }
        if(libroTexto.getText().equals("")){
            mostrarMensaje("Ingrese el nombre del libro");
            libroTexto.requestFocusInWindow();
            return;
        }
        // Obtener el ID del libro seleccionado
        int renglon = tablaLibros.getSelectedRow();
        int idLibro = Integer.parseInt(tablaLibros.getValueAt(renglon, 0).toString());

        // Crear el objeto libro con los nuevos valores
        var nombreLibro = libroTexto.getText();
        var autor = autorTexto.getText();
        var precio = Double.parseDouble(precioTexto.getText());
        var existencias = Integer.parseInt(existenciasTexto.getText());

        var libro = new Libro(idLibro, nombreLibro, autor, precio, existencias);
        libroServicio.guardarLibro(libro);
        mostrarMensaje("Libro modificado exitosamente");
        limpiarFormulario();
        listarLibros();
    }

    private void eliminarLibro(){
        var renglon = tablaLibros.getSelectedRow();
        if(renglon != -1){
            int idLibro = Integer.parseInt(tablaLibros.getValueAt(renglon, 0).toString());
            var libro = new Libro();
            libro.setIdLibro(idLibro);
            libroServicio.eliminarLibro(libro);
            mostrarMensaje("Libro "+ idLibro + " eliminado exitosamente");
            limpiarFormulario();
            listarLibros();
        } else {
            mostrarMensaje("Debe seleccionar un libro para eliminar");
        }
    }

//    private void cargarLibro

    private void limpiarFormulario(){
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
    }

    private void mostrarMensaje(String mensaje){
        JOptionPane.showMessageDialog(this, mensaje);
    }

    private void createUIComponents() {
        idTexto = new JTextField("");
        idTexto.setVisible(false);
        this.tablaModeloLibros = new DefaultTableModel(0, 5){
            @Override
            public boolean isCellEditable(int row, int column){
                return false;
            }
        };
        String[] cabecera = {"Id", "Libro", "Autor", "Precio", "Existencias"};
        this.tablaModeloLibros.setColumnIdentifiers(cabecera);
        //Instanciar el objeto de JTable
        this.tablaLibros = new JTable(tablaModeloLibros);
        // Evitamos que se seleccionen varios registros
        tablaLibros.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        listarLibros();
    }

    private void listarLibros(){
        //Limpiar la tabla
        tablaModeloLibros.setRowCount(0);
        //Obtener los libros de la BD
        var libros = libroServicio.listarLibros();
        //Iteramos cada libro
        libros.forEach((libro) -> { //funcion lambda
            //creamos cada registro para agregarlos a la tabla
            Object [] renglonLibro = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistencias()
            };
            this.tablaModeloLibros.addRow(renglonLibro);
        });
    }

}
