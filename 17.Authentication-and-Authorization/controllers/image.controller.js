const { uploadToCloudinary } = require("../helpers/cloudinary.helper");
const Image = require("../models/image.model");
const fs = require("fs");

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

const fetchImages = async(req, res) => {
  try {
    const images = await Image.find();
    if(images){
      return res.status(200).json({
        success: true,
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

module.exports = {uploadImage, fetchImages}