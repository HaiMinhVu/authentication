const express = require('express');
const router = express.Router();

const { authenticateToken, isAdmin } = require('../controllers/auth');
const { create, findAll, findOne, update, deleteOne } = require('../controllers/user');

router.post('/', authenticateToken, create);
router.get('/', authenticateToken, findAll);
router.get('/:id', authenticateToken, findOne);
router.put('/:id', authenticateToken, update);
router.delete('/:id', authenticateToken, deleteOne);

module.exports = router;