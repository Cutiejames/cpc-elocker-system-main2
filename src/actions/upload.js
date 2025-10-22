const pool = require('../database/connection');

const uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filename = req.file.filename;
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;

        await pool.query(
            'UPDATE users SET profile_pic = ? WHERE user_id = ?',
            [filename, req.user.user_id]
        );

        res.json({ 
            message: 'Profile picture uploaded successfully', 
            filename,
            url: fileUrl
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload profile picture' });
    }
};

module.exports = uploadProfilePic;
