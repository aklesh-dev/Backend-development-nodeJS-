const { uploadToCloudinary } = require("../helpers/cloudinary.helper");
const Image = require("../models/image.model");
const fs = require("fs");
const cloudinary = require("../config/cloudinary.config");

const uploadImage = async (req, res) => {
  try {
    // Check If file is missing in req object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required! Please upload an image",
      })
    }
    // Upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // Store the image url and public id along with uploaded userId in the database
    const newlyUploadedImage = new Image({
      url,
      publicId,
      // userInfo is taken from authmiddleware after decoding token and userId property from the token
      uploadedBy: req.userInfo.userId,
    });
    await newlyUploadedImage.save();

    // Delete the file from the local storage
    // fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newlyUploadedImage,
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again later",
    })
  }
};

const fetchImages = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    // Sorting
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'asc' ? 1 : -1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
    if (images) {
      return res.status(200).json({
        success: true,
        currentPage:page,
        totalPages: totalPages,
        totalImages: totalImages,
        data: images,
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again later",
    })
  }
}

const deleteImage = async (req, res) => {
  try {
    const getCurrentImageId = req.params.id;
    const userId = req.userInfo.userId; // taken from authMiddleware

    const image = await Image.findById(getCurrentImageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found!"
      });
    }

    // Check if current user is the uploader of the image
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image!"
      });
    }

    // Delete this image first from the cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);

    // Delete this image from the mongodb database
    await Image.findByIdAndDelete(getCurrentImageId);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again later",
      error: error.message,
    })
  }
}

module.exports = { uploadImage, fetchImages, deleteImage };