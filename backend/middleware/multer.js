const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dhgswebwz',
  api_key: '435148985132963',
  api_secret: 'hlfDzEKUciCus4jg7hmMXU0BcA4',
});

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'user_profiles', // Cloudinary folder
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
  },
});

const upload = multer({ storage, fileFilter: (req, file, cb) => {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
              cb(null, true);
            } else {
              cb(new Error("Only PNG and JPG images are allowed"), false);
            }
          } 
        });

module.exports = upload;

