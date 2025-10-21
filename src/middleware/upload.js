const multer = require('multer');
const path = require('path');
const fs = require('fs');

// target folder
const uploadDir = path.join(__dirname, 'uploads/profile_pics');

// make sure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, req.user.user_id + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
module.exports = upload;