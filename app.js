const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const libroRouter = require('./routes/libroRouter');
const clienteRouter = require('./routes/clienteRouter');
const autorRouter = require('./routes/autorRouter');
const ventaRouter = require('./routes/ventaRouter');

require('dotenv').config({ path: './stack/.env' });


const app = express();
const port = process.env.SERVICE_PORT

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true}))

app.use('/libro', libroRouter);

app.use('/cliente', clienteRouter);

app.use('/autor', autorRouter);

app.use('/venta', ventaRouter);

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(
    port, () => {
        console.log(`Servidor iniciado en http://localhost:${port}`);
    });