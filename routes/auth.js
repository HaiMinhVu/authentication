const express = require('express');
const router = express.Router();

const { authenticateStaticToken, signup, signin, signout } = require('../controllers/auth');

router.post('/signup', authenticateStaticToken, signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;