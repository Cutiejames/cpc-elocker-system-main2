const connection = require('../database/connection');

const approveRental = async (req, res) => {
    const { rental_id, months, paid_months } = req.body;

    if (!rental_id) {
        return res.status(400).json({ error: 'Rental ID is required' });
    }

    try {
        //check if rental exist and pending
        const [rows] = await connection.query(
            'SELECT * FROM locker_rentals WHERE rental_id = ? AND status IN ("pending", "reserved")',
            [rental_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Pending rental is not found' });
        }

        const rental = rows[0];

        //default
        const startDate = new Date();
        let endDate = new Date();

        let monthsToUse = rental.months;
        let paidToUse = rental.paid_amount || 0;
        let total = rental.total_amount || 0;
        let balance = rental.balance || 0;

        const ratePerMonth = 60;

        // if the request is for approving a reservation
        if (rental.action_type === 'reserve') {
            // admin input for rent info
            if (!months || !paid_months) {
                return res.status(400).json({ error: 'Months and paid months are required for reservation approval' });
            }

            monthsToUse = months;
            paidToUse = paid_months * ratePerMonth;
            total = months * ratePerMonth;
            balance = total - paidToUse;
        }

        // compute end date
        endDate.setMonth(startDate.getMonth() + monthsToUse);

        // update locker_rentals
        await connection.query(
            `UPDATE locker_rentals 
            SET months = ?, 
            total_amount = ?, 
            paid_amount = ?, 
            balance = ?, 
            start_date = ?, 
            due_date = ?, 
            status = 'active' 
            WHERE rental_id = ?`,
            [monthsToUse, total, paidToUse, balance, startDate, endDate, rental_id]
        );

        // update lockers
        await connection.query(
            `UPDATE lockers 
            SET status = 'rented',
            assigned_to = ?,
            rented_date = ?,
            due_date = ?,
            reserved_date = NULL,
            reserve_expiry = NULL
            WHERE locker_id = ?`,
            [rental.user_id, startDate, endDate, rental.locker_id]
        );
        
        res.status(200).json({ message: 'Rental approved successfully' });
    } catch (error) {
        console.error('Error approving rental:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = approveRental;