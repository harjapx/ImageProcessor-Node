const Request = require('../models/Request');
const Product = require('../models/Product');
const { processImages } = require('../workers/imageProcessor');

const handleWebhook = async (req, res) => {
  const { requestId, products } = req.body;

//   console.log('Received webhook data:', req.body);

  if (!Array.isArray(products)) {
    return res.status(400).json({ message: 'Invalid payload: products must be an array' });
  }

  try {
    const request = await Request.findOne({ requestId });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    for (const productData of products) {
      const product = await Product.findOne({ requestId, serialNumber: productData.serialNumber });
      if (product) {
        product.outputImageUrls = productData.outputImageUrls;
        await product.save();
      } else {
        console.warn(`Product with serialNumber ${productData.serialNumber} and requestId ${requestId} not found`);
      }
    }

    request.status = 'Completed';
    await request.save();

    await processImages();

    res.json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ message: 'Error processing webhook', error: error.message || error });
  }
};

module.exports = { handleWebhook };
