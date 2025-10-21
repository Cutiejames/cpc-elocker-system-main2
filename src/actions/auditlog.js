const connection = require("../database/connection");

// insert activity log
const logActivity = async (adminId, adminUsername, activity) => {
    await connection.query(
        "INSERT INTO audit_logs (admin_id, admin_username, activity) VALUES (?, ?, ?)",
        [adminId, adminUsername, activity]
    );
};

// get logs with pagination and optional date filter
const getAuditLogs = async (req, res) => {
    try {
        const { page = 1, limit = 10, start, end } = req.query;
        const offset = (page - 1) * limit;

        let query = "SELECT * FROM audit_logs WHERE 1=1";
        let params = [];

        if (start && end) {
            query += " AND DATE(created_at) BETWEEN ? AND ?";
            params.push(start, end);
        }

        query += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
        params.push(parseInt(limit), parseInt(offset));

        const [rows] = await connection.query(query, params);

        const [countResult] = await connection.query(`
            SELECT COUNT(*) as total 
            FROM audit_logs 
            ${start && end ? "WHERE DATE(created_at) BETWEEN ? AND ?" : ""}
            `, start && end ? [start, end] : []);
        const total = countResult[0].total;

        res.json({
            data: rows,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    logActivity,
    getAuditLogs,
};