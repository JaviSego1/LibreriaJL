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
    const {id, titulo, fecha_publicacion, precio} = req.body
    const paramId = req.params['id']

    if (isNaN(id) || isNaN(paramId) || id!== paramId){
        res.send('ERROR BORRANDO')
    } else {
        db.query(
            'DELETE FROM libro WHERE id_libro=?',
            id,
            (error, respuesta) => {
                if (error) res.send('ERROR BORRANDO LIBRO' + req.body)
                else res.redirect('/libro')
            }
        )
    }
}