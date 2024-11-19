const db = require('../db')

exports.ventas = (req, res) => {
    db.query(
        'SELECT * FROM `venta`',
        (err, response) => {
            if(err) res.send('Error de consulta')
            else res.render('venta/list', { ventas: response})
        }
    );
};