const connection = require('../database/connection');

// create new ticket
const createTicket = async (req, res) => {
  const { subject, request, description } = req.body;
  const user_id = req.user.user_id;
  // req.user = { user_id: decoded.user_id, role: decoded.role };


  if (!subject || !request || !description) {
    return res.status(400).json({ error: 'all fields are required' });
  }

  try {
    // create ticket
    const [result] = await connection.query(
      `INSERT INTO tickets (user_id, subject, request, description, status)
       VALUES (?, ?, ?, ?, 'Pending')`,
      [user_id, subject, request, description]
    );

    const ticket_id = result.insertId;

    // insert initial message into ticket_messages
    await connection.query(
      `INSERT INTO ticket_messages (ticket_id, user_id, message)
       VALUES (?, ?, ?)`,
      [ticket_id, user_id, description]
    );

    res.status(201).json({ message: 'ticket created', ticket_id});
  } catch (err) {
    console.error('error creating ticket:', err);
    res.status(500).json({ error: 'internal server error' });
  }
};

// list all tickets (for admin)
const listTickets = async (req, res) => {
  try {
    const [rows] = await connection.query(
      `SELECT t.*, c.course_name, u.f_name, u.m_name, u.l_name, u.email, u.profile_pic
       FROM tickets t
       JOIN users u ON t.user_id = u.user_id
       JOIN courses c ON u.course_id = c.course_id
       ORDER BY t.created_at DESC`
    );

    res.json(rows);
  } catch (err) {
    console.error('Error listing tickets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get ticket messages
const getTicketMessages = async (req, res) => {
  const { ticket_id } = req.params;
  const { user_id, role } = req.user;

  try {
    // check ownership first if student
    if (role === 'student') {
      const [ticketCheck] = await connection.query(
        `SELECT user_id FROM tickets WHERE ticket_id = ?`,
        [ticket_id]
      );

      if (ticketCheck.length === 0) {
        return res.status(404).json({ error: 'ticket not found' });
      }

      if (ticketCheck[0].user_id !== user_id) {
        return res.status(403).json({ error: 'you are not allowed to view this ticket' });
      }
    }

    // now fetch messages
    const sql = `
      SELECT m.*, u.f_name, u.l_name, a.role
      FROM ticket_messages m
      LEFT JOIN users u ON m.user_id = u.user_id
      LEFT JOIN accounts a ON u.account_id = a.account_id
      WHERE m.ticket_id = ?
      ORDER BY m.created_at ASC
    `;
    // const sql = `
    //   SELECT m.*, c.course_name, u.f_name, u.m_name, u.l_name, u.email, u.profile_pic, a.role
    //   FROM ticket_messages m
    //   JOIN users u ON m.user_id = u.user_id
    //   JOIN accounts a ON u.account_id = a.account_id
    //   JOIN courses c ON u.course_id = c.course_id
    //   WHERE m.ticket_id = ?
    //   ORDER BY m.created_at ASC
    // `;

    const [rows] = await connection.query(sql, [ticket_id]);

    res.json(rows);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'internal server error' });
  }
};

// reply to a ticket
const replyTicket = async (req, res) => {
  const { message } = req.body;
  const { ticket_id } = req.params;
  const user_id = req.user.user_id;
  const role = req.user.role;

  if (!ticket_id || !message) {
    return res.status(400).json({ error: 'ticket id and message are required' });
  }

  try {
    const [tickets] = await connection.query(
      `SELECT * FROM tickets WHERE ticket_id = ?`,
      [ticket_id]
    );

    if (tickets.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    const ticket = tickets[0];

    if (role === 'student' && ticket.user_id !== user_id) {
      return res.status(403).json({ error: 'You are not allowed to reply to this ticket' });
    }

    await connection.query(
      "INSERT INTO ticket_messages (ticket_id, user_id, message) VALUES (?, ?, ?)",
      [ticket_id, user_id, message]
    );

    if (role === 'admin') {
      await connection.query(
        `UPDATE tickets SET status = 'Answered' WHERE ticket_id = ?`,
        [ticket_id]
      );
    } else if (role === 'student') {
      await connection.query(
        `UPDATE tickets SET status = 'Pending' WHERE ticket_id = ?`,
        [ticket_id]
      );
    }

    res.json({ success: true, message: "reply sent" });
  } catch (err) {
    console.error('Error replying to ticket:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// mark as answered manually
const markAsAnswered = async (req, res) => {
  const { ticket_id } = req.params;

  try {
    await connection.query(
      `UPDATE tickets SET status = 'Answered' WHERE ticket_id = ?`,
      [ticket_id]
    );

    res.json({ message: 'Ticket marked as answered' });
  } catch (err) {
    console.error('Error marking ticket as answered:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// get only tickets for logged-in student
const getUserTickets = async (req, res) => {
  const { user_id } = req.user;

  try {
    const [rows] = await connection.query(
      `
      SELECT t.ticket_id, t.subject, t.request, t.description, t.status, t.created_at
      FROM tickets t
      WHERE t.user_id = ?
      ORDER BY t.created_at DESC
      `,
      [user_id]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error fetching user tickets:", err);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  createTicket,
  listTickets,
  getTicketMessages,
  getUserTickets,
  replyTicket,
  markAsAnswered
};
