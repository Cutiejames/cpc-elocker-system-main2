const multer = require('multer');

// store file in memory (not on disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;