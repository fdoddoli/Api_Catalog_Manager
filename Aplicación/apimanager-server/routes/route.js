const express = require('express');
const apiController = require('../controllers/apiController');
const endpointController = require('../controllers/endpointController');
const employeeController = require('../controllers/employeeController');

const router = express.Router();
router.get('/api/apis', apiController.getApis);
router.get('/api/api/:id/full-details', apiController.getFullApiDetails);
router.get('/api/api/:id/details', apiController.getApiDetails);
router.post('/api/api/add', apiController.addApi);
router.put('/api/api/:id/edit', apiController.editApi);
router.delete('/api/api/:id/delete', apiController.deleteApi);
router.get('/api/endpoint/:id/details', endpointController.getEndpointDetails);
router.put('/api/endpoint/:id/test', endpointController.testEndpoint);
router.get('/api/employee/validate', employeeController.validateEmployee);
router.put('/api/employees/update', employeeController.updateEmployee);
router.get('/api/employees', employeeController.getEmployees);

module.exports = router;
