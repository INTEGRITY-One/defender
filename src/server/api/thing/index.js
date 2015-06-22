'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:search', controller.index);
router.get('/:skip', controller.index);
/*router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);*/

router.get('*', function(req, res){
  res.send('what???', 404);
});

module.exports = router;
