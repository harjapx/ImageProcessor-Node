# Image Processing System- NodeJS & NoSQL

## Overview

The Image Processing System is a Node.js-based application designed to process image data from CSV files. It accepts a CSV file containing product information and image URLs, validates the data, compresses the images, stores the processed images, and allows users to check the processing status.

## Features

- Upload CSV file with product information and image URLs.
- Validate CSV data format.
- Asynchronously process and compress images.
- Store processed image data and associated product information in a database.
- Provide unique request ID upon file submission.
- Offer API to check processing status using the request ID.
- Webhook flow to trigger an endpoint after processing all images.

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- Multer (for file uploads)
- Sharp (for image processing)
- Axios (for HTTP requests)

## Project Structure

Certainly! Below is a sample README.md file for your image processing system project. This README file includes an overview of the project, setup instructions, API documentation, and other relevant details.

markdown
Copy code
# Image Processing System

## Overview

The Image Processing System is a Node.js-based application designed to process image data from CSV files. It accepts a CSV file containing product information and image URLs, validates the data, compresses the images, stores the processed images, and allows users to check the processing status.

## Features

- Upload CSV file with product information and image URLs.
- Validate CSV data format.
- Asynchronously process and compress images.
- Store processed image data and associated product information in a database.
- Provide unique request ID upon file submission.
- Offer API to check processing status using the request ID.
- Webhook flow to trigger an endpoint after processing all images.

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- Multer (for file uploads)
- Sharp (for image processing)
- Axios (for HTTP requests)

## Project Structure

image-processing-system/
├── src/
│ ├── controllers/
│ │ ├── uploadController.js
│ │ ├── statusController.js
│ │ └── webhookController.js
│ ├── models/
│ │ ├── Product.js
│ │ └── Request.js
│ ├── routes/
│ │ └── index.js
│ ├── workers/
│ │ ├── imageProcessor.js
│ │ └── uploads/
│ ├── app.js
│ └── server.js
├── .env
├── package.json
└── README.md


## Installation

1. **Clone the repository:**
2. **npm install**
3. **Set up environment variables**
4. Start the server: **node src/server.js**


