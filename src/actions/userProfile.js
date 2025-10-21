const pool = require('../database/connection');

const getProfilePic = async (req, res) => {
  try {
    const userId = req.params.id;
    const [rows] = await pool.query('SELECT profile_pic FROM users WHERE user_id = ?', [userId]);

    if (rows.length === 0 || !rows[0].profile_pic) {
      return res.status(404).send('no profile picture');
    }

    const imageBuffer = rows[0].profile_pic;
    res.set('Content-Type', 'image/jpeg');
    res.send(imageBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('failed to load profile picture');
  }
};

module.exports = { getProfilePic };