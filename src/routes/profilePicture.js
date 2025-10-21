const express = require('express');
const router = express.Router();
const pool = require('../database/connection');

router.get('/profile-pic/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;

    const [rows] = await pool.query(
      'SELECT profile_pic FROM users WHERE user_id = ?',
      [userId]
    );

    if (!rows.length || !rows[0].profile_pic) {
      return res.status(404).json({ error: 'Profile picture not found' });
    }

    const imgBuffer = rows[0].profile_pic;

    // ✅ detect MIME type properly
    let type;
    try {
      const fileType = await import('file-type');
      type = await fileType.fileTypeFromBuffer(imgBuffer);
    } catch (e) {
      console.error('file-type detection error:', e);
    }

    const mimeType = type ? type.mime : 'image/png';

    res.set('Content-Type', mimeType);
    res.send(imgBuffer);
  } catch (err) {
    console.error('Error fetching profile picture:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;