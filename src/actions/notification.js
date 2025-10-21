const connection = require('../database/connection');

// get notifications
const getNotifications = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        const [rows] = await connection.query(
            `SELECT notif_id, message, type, is_read, created_at
             FROM notifications 
             WHERE user_id = ?
             ORDER BY created_at DESC`,
            [user_id]
        );

        res.json(rows);
    } catch (error) {
        console.error('error fetching notifications:', error);
        res.status(500).json({ error: 'internal server error' });
    }
};

// mark single notification as read
const markAsRead = async (req, res) => {
    try {
        const { notif_id } = req.params;
        const user_id = req.user.user_id;

        const [result] = await connection.query(
            `UPDATE notifications 
             SET is_read = 1 
             WHERE notif_id = ? AND user_id = ?`,
            [notif_id, user_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'notification not found' });
        }

        res.json({ message: 'notification marked as read' });
    } catch (error) {
        console.error('error marking notification:', error);
        res.status(500).json({ error: 'internal server error' });
    }
};

// mark all notifications as read
const markAllAsRead = async (req, res) => {
    try {
        const user_id = req.user.user_id;

        await connection.query(
            `UPDATE notifications 
             SET is_read = 1 
             WHERE user_id = ?`,
            [user_id]
        );

        res.json({ message: 'all notifications marked as read' });
    } catch (error) {
        console.error('error marking all notifications:', error);
        res.status(500).json({ error: 'internal server error' });
    }
};

module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead
};