const db = require('../db')

exports.clientes = (req, res) => {
    db.query(
        'SELECT * FROM `cliente`',
        (err, response) => {
            if(err) res.send('Error de consulta')
            else res.render('cliente/list', { clientes: response})
        }
    );
};

exports.clienteAddForm = (req, res) => {
    res.render('cliente/add')
    
}

exports.clienteAdd = (req, res) => {
    const { nombre, correo } = req.body
    db.query(
        'INSERT INTO cliente (nombre, correo) VALUES (?, ?)',
        [nombre, correo],
        (error, respuesta) => {
            if (error) res.send('ERROR INESPERADO AL AÑADIR CLIENTE' + req.body)
            else res.redirect('/cliente')
        }
    )
}

exports.clienteDelForm = (req, res) => {
    const { id } = req.params
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
        db.query(
            'SELECT * FROM cliente WHERE id_cliente=?',
            id,
            (error, respuesta) => {
                if (error) res.send('ERROR AL INTENTAR BORRAR EL CLIENTE')
                else {
                    if (respuesta.length>0){
                        res.render('cliente/del', { cliente: respuesta[0]})
                    }else{
                        res.send('ERROR AL INTENTAR BORRAR EL CLIENTE *')
                    }
                }
            }
        )
}

exports.clienteDel = (req, res) => {
    const paramId = parseInt(req.params['id'], 10); // Convierte el ID de la URL a número

    if (isNaN(paramId)) {
        return res.status(400).send('ID inválido.');
    }

    db.query(
        'DELETE FROM cliente WHERE id_cliente = ?',
        [paramId], // Usa el ID de los parámetros de la URL
        (error, respuesta) => {
            if (error) {
                console.error('Error eliminando cliente:', error);
                return res.status(500).send('Error eliminando el cliente.');
            }
            res.redirect('/cliente'); // Redirige después de eliminar
        }
    );
};

exports.clienteEditForm = (req, res) => {
    const { id } = req.params
    if (isNaN(id)) res.send('PARÁMETROS INCORRECTOS')
    else
        db.query(
        'SELECT * FROM cliente WHERE id_cliente=?',
        id,
        (error, respuesta) => {
            if(error) res.send('ERROR AL INTENTAR ACTUALIZAR EL CLIENTE')
            else {
                if (respuesta.length > 0) {
                    res.render('cliente/edit', {cliente: respuesta[0]})
                } else {
                    res.send('ERROR AL ACTUALIZAR CLIENTE, NO EXISTE')
                }
            }
        })
}


exports.clienteEdit = (req, res) => {
    const { id_cliente, nombre, correo} = req.body
 
    const paramId = parseInt(req.params['id'], 10); // Convierte el ID de la URL a número

    if (isNaN(paramId)) {
        return res.status(400).send('ID inválido.');
    }

    db.query(
        'UPDATE cliente SET nombre = ?, correo = ?' +
        'WHERE id_cliente = ?',
        [nombre, correo, id_cliente],
        (error, respuesta) => {
            if(error) {
                res.send('ERROR ACTUALIZANDO CLIENTE' + error)
                console.log(error)
            }
            else res.redirect('/cliente')
        }
    )
}