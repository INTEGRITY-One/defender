'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/food', controller.getFood);
router.get('/food/:search', controller.getFood);
router.get('/drug', controller.getDrug);
router.get('/drug/:search', controller.getDrug);
router.get('/device', controller.getDevice);
router.get('/device/:search', controller.getDevice);


/*router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);*/

module.exports = router;
