// const path = require('path');

// async function uploadProfilePic(req, res) {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: 'no file uploaded' });
//         }

//         const filePath = `/uploads/profile_pics/${req.user.user_id}${path.extname(req.file.originalname)}`;

//         res.status(200).json({
//             message: 'profile picture updated successfully',
//             profile_pic: filePath
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'something went wrong while uploading profile picture' });
//     }
// }

// module.exports = uploadProfilePic;