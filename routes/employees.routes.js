const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employees.controler');


router.get('/employees', EmployeeController.getAll);

router.get('/employees/random', EmployeeController.getRandom);

router.get('/employees/:id', EmployeeController.getOne);

router.post('/employees', EmployeeController.getPost);

router.put('/employees/:id', EmployeeController.getPut);

router.delete('/employees/:id',EmployeeController.getDelete);


module.exports = router;
