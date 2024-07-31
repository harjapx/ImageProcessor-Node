const Request = require('../models/Request');
const Product = require('../models/Product');

const checkStatus = async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await Request.findOne({ requestId });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const products = await Product.find({ requestId });

    res.json({
      requestId: request.requestId,
      status: request.status,
      products: products.map(product => ({
        serialNumber: product.serialNumber,
        productName: product.productName,
        inputImageUrls: product.inputImageUrls,
        outputImageUrls: product.outputImageUrls,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking status', error });
  }
};

module.exports = { checkStatus };
