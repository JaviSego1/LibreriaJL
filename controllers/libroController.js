const db = require('../db');

// Función para formatear fechas al formato MySQL (yyyy-MM-dd)
const formatFechaMySQL = (fecha) => {
    return new Date(fecha).toISOString().split('T')[0];
};

// Lista todos los libros
exports.libros = (req, res) => {
    db.query('SELECT * FROM libro', (err, response) => {
        if (err) {
            res.send('Error de consulta');
        } else {
            // Las fechas ya deberían estar en formato yyyy-MM-dd desde la base de datos.
            res.render('list', { libros: response });
        }
    });
};

// Muestra el formulario para añadir un libro
exports.libroAddForm = (req, res) => {
    res.render('libro/add');
};

// Añade un libro
exports.libroAdd = (req, res) => {
    const { titulo, fecha_publicacion, precio } = req.body;

    // Formatear fecha al formato compatible con MySQL
    const fechaFormateada = formatFechaMySQL(fecha_publicacion);

    db.query(
        'INSERT INTO libro (titulo, fecha_publicacion, precio) VALUES (?, ?, ?)',
        [titulo, fechaFormateada, precio],
        (error) => {
            if (error) {
                console.error('Error añadiendo libro:', error);
                res.send('ERROR INESPERADO AL AÑADIR LIBRO');
            } else {
                res.redirect('/libro');
            }
        }
    );
};

// Muestra el formulario para borrar un libro
exports.libroDelForm = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.send('PARÁMETROS INCORRECTOS');
    }

    db.query('SELECT * FROM libro WHERE id_libro = ?', [id], (error, respuesta) => {
        if (error) res.send('ERROR AL INTENTAR BORRAR EL LIBRO');
        else {
            if (respuesta.length > 0) {
                let libro = respuesta[0];

                // Convertimos la fecha a un formato adecuado solo si es necesario
                const fecha = new Date(libro.fecha_publicacion);
                
                // Aquí formateamos solo la parte de la fecha en formato 'YYYY-MM-DD'
                const fechaFormateada = fecha.getFullYear() + '-' 
                    + String(fecha.getMonth() + 1).padStart(2, '0') + '-' 
                    + String(fecha.getDate()).padStart(2, '0');

                // Asignamos la fecha formateada
                libro.fecha_publicacion = fechaFormateada;

                res.render('libro/del', { libro });
            } else {
                res.send('ERROR: EL LIBRO NO EXISTE');
            }
        }
    });
};




// Elimina un libro
exports.libroDel = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).send('ID inválido.');
    }

    db.query('DELETE FROM libro WHERE id_libro = ?', [id], (error) => {
        if (error) {
            console.error('Error eliminando libro:', error);
            return res.status(500).send('Error eliminando el libro.');
        }
        res.redirect('/libro');
    });
};

// Muestra el formulario para editar un libro
exports.libroEditForm = (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.send('PARÁMETROS INCORRECTOS');
    }

    db.query('SELECT * FROM libro WHERE id_libro = ?', [id], (error, respuesta) => {
        if (error) res.send('ERROR AL INTENTAR ACTUALIZAR EL LIBRO');
        else {
            if (respuesta.length > 0) {
                res.render('libro/edit', { libro: respuesta[0] });
            } else {
                res.send('ERROR: EL LIBRO NO EXISTE');
            }
        }
    });
};

// Edita un libro
exports.libroEdit = (req, res) => {
    const { titulo, fecha_publicacion, precio } = req.body;
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).send('ID inválido.');
    }

    // Si la fecha no se proporciona, mantener la fecha original del libro
    let fechaFormateada = null;
    if (fecha_publicacion) {
        fechaFormateada = formatFechaMySQL(fecha_publicacion);
    } else {
        // Consultamos la fecha actual del libro
        db.query('SELECT fecha_publicacion FROM libro WHERE id_libro = ?', [id], (error, respuesta) => {
            if (error) {
                console.error('Error al obtener la fecha del libro:', error);
                return res.send('ERROR AL OBTENER LA FECHA');
            }
            if (respuesta.length > 0) {
                // Si existe, mantenemos la fecha original
                fechaFormateada = respuesta[0].fecha_publicacion;
            } else {
                return res.send('ERROR: EL LIBRO NO EXISTE');
            }

            // Realizamos la actualización del libro con la fecha obtenida o la proporcionada
            db.query(
                'UPDATE libro SET titulo = ?, fecha_publicacion = ?, precio = ? WHERE id_libro = ?',
                [titulo, fechaFormateada, precio, id],
                (error) => {
                    if (error) {
                        console.error('Error actualizando libro:', error);
                        res.send('ERROR ACTUALIZANDO LIBRO');
                    } else {
                        res.redirect('/libro');
                    }
                }
            );
        });
        return; // Importante para evitar el siguiente código si se está esperando la fecha
    }

    // Si la fecha fue modificada por el usuario
    db.query(
        'UPDATE libro SET titulo = ?, fecha_publicacion = ?, precio = ? WHERE id_libro = ?',
        [titulo, fechaFormateada, precio, id],
        (error) => {
            if (error) {
                console.error('Error actualizando libro:', error);
                res.send('ERROR ACTUALIZANDO LIBRO');
            } else {
                res.redirect('/libro');
            }
        }
    );
};
