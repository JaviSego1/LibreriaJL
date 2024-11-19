const db = require('../db');

exports.ventas = (req, res) => {
    const { precioMin, precioMax } = req.query;

    let query = 'SELECT * FROM venta';  // Mostrar todas las ventas por defecto
    const params = [];

    // Filtrar por precio mínimo, si se especifica
    if (precioMin) {
        query += ' WHERE total >= ?';
        params.push(precioMin);
    }

    // Filtrar por precio máximo, si se especifica
    if (precioMax) {
        // Si ya se ha añadido un filtro, hay que añadir "AND" en lugar de "WHERE"
        if (params.length > 0) {
            query += ' AND total <= ?';
        } else {
            query += ' WHERE total <= ?';
        }
        params.push(precioMax);
    }

    // Ejecutar la consulta con los parámetros
    db.query(query, params, (err, response) => {
        if (err) {
            res.status(500).send('Error en la consulta');
        } else {
            // Renderizar la vista con las ventas y los filtros aplicados
            res.render('venta/list', { ventas: response, filtro: { precioMin, precioMax } });
        }
    });
};
