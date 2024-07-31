const fs = require('fs');
const csv = require('csv-parser');
const { v4: uuidv4 } = require('uuid');
const Request = require('../models/Request');
const Product = require('../models/Product');

const handleUpload = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const requestId = uuidv4();

  const products = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (row) => {
      const product = {
        requestId,
        serialNumber: row['S. No.'],
        productName: row['Product Name'],
        inputImageUrls: row['Input Image Urls'].split(','),
      };
      products.push(product);
    })
    .on('end', async () => {
      try {
        await Request.create({ requestId });
        await Product.insertMany(products);
        fs.unlinkSync(file.path); // Remove the uploaded file
        res.json({ requestId });
      } catch (error) {
        res.status(500).json({ message: 'Error processing request', error });
      }
    });
};

module.exports = { handleUpload };
