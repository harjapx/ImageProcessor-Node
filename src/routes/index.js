const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'src/uploads/' });
const uploadController = require('../controllers/uploadController');
const statusController = require('../controllers/statusController');
const webhookController = require('../controllers/webhookController');

const router = express.Router();

router.post('/upload', upload.single('file'), uploadController.handleUpload);
router.get('/status/:requestId', statusController.checkStatus);
router.post('/webhook', webhookController.handleWebhook);

module.exports = router;
