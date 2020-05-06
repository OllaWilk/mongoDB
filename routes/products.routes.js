const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/products.controller');


router.get('/products', ProductController.getAll);

router.get('/products/random', ProductController.getRandom);

router.get('/products/:id', ProductController.getOne);

router.post('/products', ProductController.getPost);

router.put('/products/:id', ProductController.getPut);

router.delete('/products/:id', ProductController.getDelete);


module.exports = router;
