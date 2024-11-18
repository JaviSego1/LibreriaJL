const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');

router.get('/', libroController.libros)

router.get('/add', libroController.libroAddForm)

router.post('/add', libroController.libroAdd)
 
router.get('/edit/:id', libroController.libroEditForm)

router.post('/edit/:id', libroController.libroEdit)

router.get('/del/:id', libroController.libroDelForm)

router.post('/del/:id', libroController.libroDel)


module.exports = router