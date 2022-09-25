const path = require('path');
const multer = require('multer');

//multer init
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: (req, file, ab) => {
    ab(null, file.originalname);
  },
});
const studentphotoMulter = multer({
  storage,
}).single('student-photo');

// module export
module.exports = {
  studentphotoMulter,
};
