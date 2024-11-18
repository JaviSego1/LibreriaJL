// const { response } = require('express')

const db = require('../db')

exports.libros = (req, res) => {
    db.query(
        'SELECT * FROM `libro`',
        (err, response) => {
            if(err) res.send('Error de consulta')
            else res.render('list', { libros: response})
        }
    );
};

exports.libroAddForm = (req, res) => {
    res.render('libro/add')
    
}

exports.libroAdd = (req, res) => {
    const { titulo, fecha_publicacion, precio } = req.body
    db.query(
        'INSERT INTO libro (titulo, fecha_publicacion, precio) VALUES (?, ?, ?)',
        [titulo, fecha_publicacion, precio],
        (error, respuesta) => {
            if (error) res.send('ERROR INESPERADO AL AÑADIR LIBRO' + req.body)
            else res.redirect('/libro')
        }
    )
}

exports.libroDelForm = (req, res) => {
    const { id } = req.params
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
        db.query(
            'SELECT * FROM libro WHERE id_libro=?',
            id,
            (error, respuesta) => {
                if (error) res.send('ERROR AL INTENTAR BORRAR EL LIBRO')
                else {
                    if (respuesta.length>0){
                        res.render('libro/del', { libro: respuesta[0]})
                    }else{
                        res.send('ERROR AL INTENTAR BORRAR EL LIBRO *')
                    }
                }
            }
        )
}

exports.libroDel = (req, res) => {
    const paramId = parseInt(req.params['id'], 10); // Convierte el ID de la URL a número

    if (isNaN(paramId)) {
        return res.status(400).send('ID inválido.');
    }

    db.query(
        'DELETE FROM libro WHERE id_libro = ?',
        [paramId], // Usa el ID de los parámetros de la URL
        (error, respuesta) => {
            if (error) {
                console.error('Error eliminando libro:', error);
                return res.status(500).send('Error eliminando el libro.');
            }
            res.redirect('/libro'); // Redirige después de eliminar
        }
    );
};


exports.libroEditForm = (req, res) => {
    const { id } = req.params
    if (isNaN(id)) res.send('PARÁMETROS INCORRECTOS')
    else
        db.query(
        'SELECT * FROM libro WHERE id_libro=?',
        id,
        (error, respuesta) => {
            if(error) res.send('ERROR AL INTENTAR ACTUALIZAR EL LIBRO')
            else {
                if (respuesta.length > 0) {
                    res.render('libro/edit', {libro: respuesta[0]})
                } else {
                    res.send('ERROR AL ACTUALIZAR LIBRO, NO EXISTE')
                }
            }
        })
}


exports.libroEdit = (req, res) => {
    const { id_libro, titulo, fecha_publicacion, precio} = req.body
 
    const paramId = parseInt(req.params['id'], 10); // Convierte el ID de la URL a número

    if (isNaN(paramId)) {
        return res.status(400).send('ID inválido.');
    }

    db.query(
        'UPDATE libro SET titulo = ?, fecha_publicacion = ?, precio = ?' +
        'WHERE id_libro = ?',
        [titulo, fecha_publicacion, precio, id_libro],
        (error, respuesta) => {
            if(error) {
                res.send('ERROR ACTUALIZANDO LIBRO' + error)
                console.log(error)
            }
            else res.redirect('/libro')
        }
    )
}
