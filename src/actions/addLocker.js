const connection = require('../database/connection');
const { logActivity } = require('./auditlog');

// ========== add locker ==========
const addLocker = async (req, res) => {
    const {locker_number, location, remarks} = req.body;
      const adminId = req.user.user_id;
      const adminName = req.user.username;

    if(!locker_number) {
        return res.status(400).json({error: 'Locker number is required'});
    }

    try {
        await connection.query(
            'INSERT INTO lockers (locker_number, location, status, remarks) VALUES (?, ?, ?, ?)',
            [locker_number, location || null,  'available', remarks || null]
        );

        // log activity with locker number
        await logActivity(
            adminId,
            adminName,
            `Added new locker: ${locker_number} (Location: ${location || 'N/A'})`
        );

        res.status(201).json({message: 'Locker added successfully'});

    } catch (error) {
        if(error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({error: 'Locker number already exist'});
        }

        console.error('Error adding locker:', error);
        res.status(500).json({error: 'Internal server error'});
    }
};

module.exports = addLocker