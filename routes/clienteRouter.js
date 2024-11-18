const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.clientes)

router.get('/add', clienteController.clienteAddForm)

router.post('/add', clienteController.clienteAdd)
 
router.get('/edit/:id', clienteController.clienteEditForm)

router.post('/edit/:id', clienteController.clienteEdit)

router.get('/del/:id', clienteController.clienteDelForm)

router.post('/del/:id', clienteController.clienteDel)


module.exports = router