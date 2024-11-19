const db = require('../db')

// Incluye el maestro detalle
exports.autores = (req, res) => {
    const { pais } = req.query;

    let query = 'SELECT * FROM autor';
    const params = [];

   
    if (pais) {
        query += ' WHERE pais = ?';
        params.push(pais);
    }


    db.query(query, params, (err, response) => {
        if (err) {
            res.status(500).send('Error en la consulta');
        } else {
            // Renderiza la vista con los autores filtrados
            res.render('autor/list', { autores: response, filtro: pais || '' });
        }
    });
};



exports.autorAddForm = (req, res) => {
    res.render('autor/add')
    
}

exports.autorAdd = (req, res) => {
    const { nombre, pais } = req.body
    db.query(
        'INSERT INTO autor (nombre, pais) VALUES (?, ?)',
        [nombre, pais],
        (error, respuesta) => {
            if (error) res.send('ERROR INESPERADO AL AÑADIR AUTOR' + req.body)
            else res.redirect('/autor')
        }
    )
}

exports.autorDelForm = (req, res) => {
    const { id } = req.params
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
        db.query(
            'SELECT * FROM autor WHERE id_autor=?',
            id,
            (error, respuesta) => {
                if (error) res.send('ERROR AL INTENTAR BORRAR EL AUTOR')
                else {
                    if (respuesta.length>0){
                        res.render('autor/del', { autor: respuesta[0]})
                    }else{
                        res.send('ERROR AL INTENTAR BORRAR EL AUTOR *')
                    }
                }
            }
        )
}

exports.autorDel = (req, res) => {
    const paramId = parseInt(req.params['id'], 10); // Convierte el ID de la URL a número

    if (isNaN(paramId)) {
        return res.status(400).send('ID inválido.');
    }

    db.query(
        'DELETE FROM autor WHERE id_autor = ?',
        [paramId], // Usa el ID de los parámetros de la URL
        (error, respuesta) => {
            if (error) {
                console.error('Error eliminando autor:', error);
                return res.status(500).send('Error eliminando el autor.');
            }
            res.redirect('/autor'); // Redirige después de eliminar
        }
    );
};

exports.autorEditForm = (req, res) => {
    const { id } = req.params
    if (isNaN(id)) res.send('PARÁMETROS INCORRECTOS')
    else
        db.query(
        'SELECT * FROM autor WHERE id_autor=?',
        id,
        (error, respuesta) => {
            if(error) res.send('ERROR AL INTENTAR ACTUALIZAR EL AUTOR')
            else {
                if (respuesta.length > 0) {
                    res.render('autor/edit', {autor: respuesta[0]})
                } else {
                    res.send('ERROR AL ACTUALIZAR AUTOR, NO EXISTE')
                }
            }
        })
}


exports.autorEdit = (req, res) => {
    const { id_autor, nombre, pais} = req.body
 
    const paramId = parseInt(req.params['id'], 10); // Convierte el ID de la URL a número

    if (isNaN(paramId)) {
        return res.status(400).send('ID inválido.');
    }

    db.query(
        'UPDATE autor SET nombre = ?, pais = ?' +
        'WHERE id_autor = ?',
        [nombre, pais, id_autor],
        (error, respuesta) => {
            if(error) {
                res.send('ERROR ACTUALIZANDO AUTOR' + error)
                console.log(error)
            }
            else res.redirect('/autor')
        }
    )
}

