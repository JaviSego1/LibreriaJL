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

