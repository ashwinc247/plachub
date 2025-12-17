const express = require('express');
const router = express.Router();
const { processMessage } = require('../controllers/chatController');

router.post('/', processMessage);

module.exports = router;
