const cloudinary = require('../config/cloudinary.config');

const uploadToCloudinary = async (filepath) => {
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(filepath);
    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    }
  } catch (error) {
    console.error("Error while uploading to cloudinary:", error)
    throw new Error("Error while uploading to cloudinary");
  }
}

module.exports = {
  uploadToCloudinary,
};