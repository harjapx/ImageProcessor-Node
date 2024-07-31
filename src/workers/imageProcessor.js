const sharp = require('sharp');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const Request = require('../models/Request');

const processImages = async () => {
  const products = await Product.find({ outputImageUrls: { $size: 0 } });
  
  for (const product of products) {
    const outputUrls = [];

    for (const url of product.inputImageUrls) {
      try {
        const response = await axios({
          url,
          responseType: 'arraybuffer'
        });

        const buffer = Buffer.from(response.data, 'binary');

        const outputBuffer = await sharp(buffer)
          .jpeg({ quality: 50 })
          .toBuffer();

        const uploadsDir = path.join(__dirname, '../uploads'); // Ensure correct path

        // Ensure the uploads directory exists
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const outputFilePath = path.join(uploadsDir, `${product.serialNumber}_${new Date().getTime()}.jpg`);
        await fs.promises.writeFile(outputFilePath, outputBuffer);
        console.log('Image Exported');
        outputUrls.push(outputFilePath);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }

    product.outputImageUrls = outputUrls;
    await product.save();
    await Request.findOneAndUpdate({ requestId: product.requestId }, { status: 'Completed' });
  }
};

module.exports = { processImages };
