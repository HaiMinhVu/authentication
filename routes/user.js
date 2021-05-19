const express = require('express');
const router = express.Router();

const { authenticateToken, isAdmin } = require('../controllers/auth');
const { create, findAll, findOne, update, deleteOne } = require('../controllers/user');

router.post('/user', authenticateToken, create);
router.get('/users', authenticateToken, findAll);
router.get('/user/:id', authenticateToken, findOne);
router.put('/user/:id', authenticateToken, update);
router.delete('/user/:id', authenticateToken, deleteOne);

module.exports = router;