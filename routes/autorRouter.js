const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');

router.get('/', autorController.autores)

router.get('/add', autorController.autorAddForm)

router.post('/add', autorController.autorAdd)
 
router.get('/edit/:id', autorController.autorEditForm)

router.post('/edit/:id', autorController.autorEdit)

router.get('/del/:id', autorController.autorDelForm)

router.post('/del/:id', autorController.autorDel)


module.exports = router