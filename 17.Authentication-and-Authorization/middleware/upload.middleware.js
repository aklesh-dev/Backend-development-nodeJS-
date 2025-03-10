const multer = require("multer");
const path = require("path");

// Set multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function(req, file, cb){
    cb(null, 
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
});

// File filter function
const checkFileFilter = (req, file, cb) => {
  if(file.mimetype.startsWith("image")){
    cb(null, true)
  }else{
    cb(new Error("Not an image! Please only upload an images"))
  }
};

// Multer middleware
module.exports = multer({
  storage: storage,
  fileFilter: checkFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  }
});