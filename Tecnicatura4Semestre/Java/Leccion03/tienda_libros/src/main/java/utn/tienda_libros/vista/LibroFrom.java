package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.LibroServicio;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.JTableHeader;
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
    private JButton salirButton;
    private DefaultTableModel tablaModeloLibros;
    
    // Colores personalizados
    private static final Color COLOR_PRIMARIO = new Color(41, 128, 185);      // Azul
    private static final Color COLOR_EXITO = new Color(39, 174, 96);          // Verde
    private static final Color COLOR_ADVERTENCIA = new Color(243, 156, 18);   // Naranja
    private static final Color COLOR_PELIGRO = new Color(231, 76, 60);        // Rojo
    private static final Color COLOR_FONDO = new Color(236, 240, 241);        // Gris claro
    private static final Color COLOR_PANEL = new Color(255, 255, 255);        // Blanco
    private static final Color COLOR_TEXTO = new Color(44, 62, 80);           // Gris oscuro

    @Autowired
    public LibroFrom(LibroServicio libroServicio){
        this.libroServicio = libroServicio;
        iniciarForma();

        // Configurar listeners después de que los componentes estén creados
        agregarButton.addActionListener(event -> agregarLibro());
        modificarButton.addActionListener(event -> modificarLibro());
        eliminarButton.addActionListener(event -> eliminarLibro());
        salirButton.addActionListener(event -> {
            var respuesta = JOptionPane.showConfirmDialog(this,
                    "¿Está seguro de salir?", "Confirmar salida",
                    JOptionPane.YES_NO_OPTION);
            if(respuesta == JOptionPane.YES_OPTION){
                System.exit(0);
            }
        });

        tablaLibros.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                super.mouseClicked(e);
                cargarLibroSeleccionado();
                // Al seleccionar un libro, deshabilitar Agregar y habilitar Modificar/Eliminar
                configurarBotonesParaEdicion();
            }
        });
        
        // Al inicio, solo permitir agregar
        configurarBotonesParaAgregar();
    }

    private void iniciarForma(){
        setTitle("Tienda de Libros");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(950, 700);
        setMinimumSize(new Dimension(850, 600)); // Tamaño mínimo para evitar que se corte

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
        panel.setLayout(new BorderLayout(10, 10));
        panel.setBackground(COLOR_FONDO);
        panel.setBorder(BorderFactory.createEmptyBorder(15, 15, 15, 15));

        // Panel superior con título
        JPanel panelSuperior = new JPanel();
        panelSuperior.setBackground(COLOR_PRIMARIO);
        panelSuperior.setBorder(BorderFactory.createEmptyBorder(20, 10, 20, 10));
        JLabel titulo = new JLabel("Tienda de Libros");
        titulo.setFont(new Font("Segoe UI", Font.BOLD, 32));
        titulo.setForeground(Color.WHITE);
        panelSuperior.add(titulo);
        panel.add(panelSuperior, BorderLayout.NORTH);

        // Panel central con formulario
        JPanel panelFormulario = new JPanel();
        panelFormulario.setLayout(new GridBagLayout());
        panelFormulario.setBackground(COLOR_PANEL);
        panelFormulario.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(189, 195, 199), 1),
                BorderFactory.createEmptyBorder(20, 20, 20, 20)
        ));
        
        // Permitir limpiar haciendo clic en el panel del formulario
        panelFormulario.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if (tablaLibros.getSelectedRow() != -1) {
                    limpiarFormulario();
                }
            }
        });
        
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(10, 10, 10, 10);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.weightx = 1.0;

        // Libro
        gbc.gridx = 0;
        gbc.gridy = 0;
        gbc.weightx = 0.0;
        JLabel labelLibro = new JLabel("Libro:");
        labelLibro.setFont(new Font("Segoe UI", Font.BOLD, 14));
        labelLibro.setForeground(COLOR_TEXTO);
        panelFormulario.add(labelLibro, gbc);
        gbc.gridx = 1;
        gbc.weightx = 1.0;
        libroTexto = new JTextField(30);
        estilizarCampoTexto(libroTexto);
        panelFormulario.add(libroTexto, gbc);

        // Autor
        gbc.gridx = 0;
        gbc.gridy = 1;
        gbc.weightx = 0.0;
        JLabel labelAutor = new JLabel("Autor:");
        labelAutor.setFont(new Font("Segoe UI", Font.BOLD, 14));
        labelAutor.setForeground(COLOR_TEXTO);
        panelFormulario.add(labelAutor, gbc);
        gbc.gridx = 1;
        gbc.weightx = 1.0;
        autorTexto = new JTextField(30);
        estilizarCampoTexto(autorTexto);
        panelFormulario.add(autorTexto, gbc);

        // Precio
        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.weightx = 0.0;
        JLabel labelPrecio = new JLabel("Precio:");
        labelPrecio.setFont(new Font("Segoe UI", Font.BOLD, 14));
        labelPrecio.setForeground(COLOR_TEXTO);
        panelFormulario.add(labelPrecio, gbc);
        gbc.gridx = 1;
        gbc.weightx = 1.0;
        precioTexto = new JTextField(30);
        estilizarCampoTexto(precioTexto);
        panelFormulario.add(precioTexto, gbc);

        // Existencias
        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.weightx = 0.0;
        JLabel labelExistencias = new JLabel("Existencias:");
        labelExistencias.setFont(new Font("Segoe UI", Font.BOLD, 14));
        labelExistencias.setForeground(COLOR_TEXTO);
        panelFormulario.add(labelExistencias, gbc);
        gbc.gridx = 1;
        gbc.weightx = 1.0;
        existenciasTexto = new JTextField(30);
        estilizarCampoTexto(existenciasTexto);
        panelFormulario.add(existenciasTexto, gbc);

        // Botones
        JPanel panelBotones = new JPanel();
        panelBotones.setBackground(COLOR_PANEL);
        panelBotones.setBorder(BorderFactory.createEmptyBorder(10, 0, 10, 0));
        
        agregarButton = new JButton("Agregar");
        estilizarBoton(agregarButton, COLOR_EXITO);
        
        modificarButton = new JButton("Modificar");
        estilizarBoton(modificarButton, COLOR_ADVERTENCIA);
        
        eliminarButton = new JButton("Eliminar");
        estilizarBoton(eliminarButton, COLOR_PELIGRO);
        
        salirButton = new JButton("Salir");
        estilizarBoton(salirButton, new Color(52, 73, 94));
        
        panelBotones.add(agregarButton);
        panelBotones.add(Box.createHorizontalStrut(10));
        panelBotones.add(modificarButton);
        panelBotones.add(Box.createHorizontalStrut(10));
        panelBotones.add(eliminarButton);
        // Agregar un espacio adicional antes del botón Salir
        panelBotones.add(Box.createHorizontalStrut(40));
        panelBotones.add(salirButton);

        gbc.gridx = 0;
        gbc.gridy = 4;
        gbc.gridwidth = 2;
        gbc.weightx = 0.0;
        gbc.anchor = GridBagConstraints.CENTER;
        panelFormulario.add(panelBotones, gbc);

        panel.add(panelFormulario, BorderLayout.CENTER);

        // Crear la tabla
        createUIComponents();
        estilizarTabla();
        JScrollPane scrollPane = new JScrollPane(tablaLibros);
        scrollPane.setPreferredSize(new Dimension(850, 280));
        scrollPane.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createEmptyBorder(10, 0, 0, 0),
                BorderFactory.createLineBorder(new Color(189, 195, 199), 1)
        ));
        scrollPane.getViewport().setBackground(Color.WHITE);
        panel.add(scrollPane, BorderLayout.SOUTH);

        setContentPane(panel);
    }
    
    private void estilizarBoton(JButton boton, Color colorFondo) {
        boton.setFont(new Font("Segoe UI", Font.BOLD, 13));
        boton.setBackground(colorFondo);
        boton.setForeground(Color.WHITE);
        boton.setFocusPainted(false);
        boton.setBorderPainted(false);
        boton.setCursor(new Cursor(Cursor.HAND_CURSOR));
        boton.setPreferredSize(new Dimension(130, 35));
        
        // Efecto hover
        boton.addMouseListener(new MouseAdapter() {
            public void mouseEntered(MouseEvent evt) {
                boton.setBackground(colorFondo.darker());
            }
            public void mouseExited(MouseEvent evt) {
                boton.setBackground(colorFondo);
            }
        });
    }
    
    private void estilizarCampoTexto(JTextField campo) {
        campo.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        campo.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createLineBorder(new Color(189, 195, 199), 1),
                BorderFactory.createEmptyBorder(5, 10, 5, 10)
        ));
    }
    
    private void estilizarTabla() {
        // Estilo del encabezado
        JTableHeader header = tablaLibros.getTableHeader();
        header.setBackground(COLOR_PRIMARIO);
        header.setForeground(Color.WHITE);
        header.setFont(new Font("Segoe UI", Font.BOLD, 13));
        header.setPreferredSize(new Dimension(header.getWidth(), 35));
        
        // Estilo de la tabla
        tablaLibros.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        tablaLibros.setRowHeight(28);
        tablaLibros.setGridColor(new Color(189, 195, 199));
        tablaLibros.setSelectionBackground(new Color(52, 152, 219));
        tablaLibros.setSelectionForeground(Color.WHITE);
        tablaLibros.setShowGrid(true);
        tablaLibros.setIntercellSpacing(new Dimension(1, 1));
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
            String nombreLibro = tablaLibros.getValueAt(renglon, 1).toString();
            
            // Pedir confirmación antes de eliminar
            var respuesta = JOptionPane.showConfirmDialog(
                    this,
                    "¿Está seguro de eliminar el libro:\n\"" + nombreLibro + "\"?",
                    "Confirmar Eliminación",
                    JOptionPane.YES_NO_OPTION,
                    JOptionPane.WARNING_MESSAGE
            );
            
            if(respuesta == JOptionPane.YES_OPTION) {
                var libro = new Libro();
                libro.setIdLibro(idLibro);
                libroServicio.eliminarLibro(libro);
                mostrarMensaje("Libro eliminado exitosamente");
                limpiarFormulario();
                listarLibros();
            }
        } else {
            mostrarMensaje("Debe seleccionar un libro para eliminar");
        }
    }

    private void limpiarFormulario(){
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
        
        // Deseleccionar la tabla
        tablaLibros.clearSelection();
        
        // Volver al modo agregar
        configurarBotonesParaAgregar();
    }
    
    private void configurarBotonesParaAgregar() {
        // Solo permitir agregar nuevos libros
        agregarButton.setEnabled(true);
        modificarButton.setEnabled(false);
        eliminarButton.setEnabled(false);
    }
    
    private void configurarBotonesParaEdicion() {
        // Solo permitir modificar o eliminar el libro seleccionado
        agregarButton.setEnabled(false);
        modificarButton.setEnabled(true);
        eliminarButton.setEnabled(true);
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
