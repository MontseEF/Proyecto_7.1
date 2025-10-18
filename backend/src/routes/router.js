const express = require('express');
const router = express.Router();

router.get('/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }));

router.use('/auth', require('./auth'));
router.use('/products', require('./products'));
router.use('/payments', require('./payments'));

module.exports = router;
