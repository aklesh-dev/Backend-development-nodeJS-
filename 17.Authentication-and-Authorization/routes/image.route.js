const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const uploadMiddleware = require("../middleware/upload.middleware");
const { uploadImage, fetchImages, deleteImage } = require("../controllers/image.controller");

const router = express.Router();

// Upload an image route
router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single("image"), uploadImage );
// Get all image route
router.get('/get', authMiddleware, fetchImages);
// Delete an image 
router.delete('/:id', authMiddleware, adminMiddleware, deleteImage);

module.exports = router;