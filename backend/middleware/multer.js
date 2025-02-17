const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config(); // Load environment variables

// Cloudinary Configuration (Use Environment Variables for Security)
cloudinary.config({
  cloud_name: "dhgswebwz",
  api_key: "435148985132963",
  api_secret: "hlfDzEKUciCus4jg7hmMXU0BcA4",
});

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: req.folderName || 'uploads', // Set dynamically
    resource_type: 'image',
    format: file.mimetype.split('/')[1], // Auto-detect format
  }),
});

// File Filter for Allowed Formats
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PNG and JPG images are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
