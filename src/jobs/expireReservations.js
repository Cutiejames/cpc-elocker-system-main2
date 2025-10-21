const connection = require('../database/connection');

const expireReservations = async () => {
  try {
    console.log('Starting expiration cleanup...');

    // Step 1: Find all expired lockers with their rental info
    const [expiredItems] = await connection.query(`
      SELECT l.locker_id, l.locker_number, lr.rental_id, lr.user_id, lr.action_type
      FROM lockers l
      LEFT JOIN locker_rentals lr ON l.locker_id = lr.locker_id 
        AND lr.status IN ('pending', 'reserved')
      WHERE l.status IN ('reserved', 'pending') 
        AND l.reserve_expiry IS NOT NULL 
        AND l.reserve_expiry <= NOW()
    `);

    if (expiredItems.length === 0) {
      console.log('No expired reservations found');
      return;
    }

    console.log(`Found ${expiredItems.length} expired items to process`);

    // Step 2: Update locker_rentals table first (mark as expired)
    const rentalIds = expiredItems
      .filter(item => item.rental_id) 
      .map(item => item.rental_id);

    if (rentalIds.length > 0) {
      await connection.query(`
        UPDATE locker_rentals 
        SET status = 'expired', 
            cancelled_at = NOW()
        WHERE rental_id IN (${rentalIds.map(() => '?').join(',')})
      `, rentalIds);
      
      console.log(`Updated ${rentalIds.length} rental records to expired`);
    }

    // Step 3: Clear expired lockers (make them available)
    const lockerIds = expiredItems.map(item => item.locker_id);
    
    await connection.query(`
      UPDATE lockers
      SET status = 'available',
          reserved_date = NULL,
          reserve_expiry = NULL,
          assigned_to = NULL,
          rented_date = NULL,
          due_date = NULL
      WHERE locker_id IN (${lockerIds.map(() => '?').join(',')})
    `, lockerIds);

    console.log(`Updated ${lockerIds.length} lockers to available`);

    // Step 4: Send notifications to affected users
    for (const item of expiredItems) {
      if (item.user_id && item.rental_id) {
        await connection.query(`
          INSERT INTO notifications (user_id, message, type) 
          VALUES (?, ?, 'warning')
        `, [
          item.user_id,
          `Your locker ${item.action_type || 'request'} for Locker ${item.locker_number} has expired due to non-payment within 2 days. The locker is now available for others.`
        ]);
      }
    }

    console.log(`Sent notifications to ${expiredItems.filter(i => i.user_id).length} users`);
    console.log('Expiration cleanup completed successfully');

  } catch (error) {
    console.error('Error expiring reservations:', error);
  }
};

module.exports = expireReservations;

// const connection = require('../database/connection');

// const expireReservations = async () => {
//   try {
//     // clear reservations that passed expiry date
//     await connection.query(`
//       UPDATE lockers
//       SET status = 'available',
//           reserved_date = NULL,
//           reserve_expiry = NULL,
//           assigned_to = NULL
//       WHERE status = 'reserved' AND reserve_expiry <= NOW()
//     `);
//     console.log('Expired reservations cleared');
//   } catch (error) {
//     console.error('Error expiring reservations:', error);
//   }
// };

// module.exports = expireReservations;
