const connection = require('../database/connection');
const getDateRange = require('../utils/dateFilter');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
const { logActivity } = require('./auditlog');

// download dashboard report as PDF (with filtering or default today)
const downloadDashboardReport = async (req, res) => {
  try {
    const adminId = req.user.user_id;
    const adminName = req.user.username;

    // date range (default → current month)
    const { start_date, end_date } = getDateRange(
      req.query.start_date,
      req.query.end_date
    );

    // fetch summary
    const [[summary]] = await connection.query(
      `
      SELECT 
        (SELECT COALESCE(SUM(paid_amount),0) FROM locker_rentals WHERE start_date >= ? AND start_date <= ?) AS total_income,
        (SELECT COUNT(DISTINCT user_id) FROM locker_rentals WHERE start_date >= ? AND start_date <= ?) AS total_tenants,
        (SELECT COUNT(*) FROM locker_rentals WHERE action_type='rent' AND start_date >= ? AND start_date <= ?) AS total_rent,
        (SELECT COUNT(*) FROM locker_rentals WHERE action_type='reserve' AND start_date >= ? AND start_date <= ?) AS total_reserve,
        (SELECT COUNT(*) FROM lockers) - 
        (SELECT COUNT(*) FROM locker_rentals WHERE status='active') AS locker_availability
      `,
      [
        start_date, end_date,
        start_date, end_date,
        start_date, end_date,
        start_date, end_date
      ]
    );

    // setup pdf
    const doc = new PDFDocument({ margin: 50 });
    const filename = `dashboard-report-${start_date}-to-${end_date}.pdf`;

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    doc.pipe(res);

    // --- header with logo ---
    const logoPath = path.join(__dirname, '../img/logo.jpg');
    const fontPath = path.join(__dirname, '../fonts/static/NotoSans-Regular.ttf');

    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 30, { width: 60 });
    }

    // register font that supports peso sign
    if (fs.existsSync(fontPath)) {
      doc.registerFont('NotoSans', fontPath);
      doc.font('NotoSans');
    }

    doc.fontSize(20).text('CPC E-Locker System', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(14).fillColor('#666').text('Dashboard Analytics Report', { align: 'center' });
    doc.moveDown(1);

    // --- report date range ---
    doc.fontSize(12).fillColor('#000')
      .text(`Report Period: ${dayjs(start_date).format('MMMM D, YYYY')} - ${dayjs(end_date).format('MMMM D, YYYY')}`, { align: 'center' });
    doc.moveDown(2);

    // --- table header ---
    doc.fontSize(14).fillColor('#000').text('Summary', { underline: true });
    doc.moveDown(1);

    const tableData = [
      { label: 'Total Income', value: `₱ ${summary.total_income}` },
      { label: 'Total Tenants', value: summary.total_tenants },
      { label: 'Total Rent', value: summary.total_rent },
      { label: 'Total Reserve', value: summary.total_reserve },
      { label: 'Locker Availability', value: summary.locker_availability }
    ];

    // --- draw table ---
    const tableTop = doc.y;
    const itemSpacing = 25;
    const col1X = 80;
    const col2X = 300;

    tableData.forEach((item, i) => {
      const y = tableTop + i * itemSpacing;

      // row background
      if (i % 2 === 0) {
        doc.rect(60, y - 5, 480, 20).fill('#f5f5f5').fillColor('#000');
      }

      // text
      doc.fontSize(12).fillColor('#000').text(item.label, col1X, y);
      doc.fontSize(12).fillColor('#333').text(item.value.toString(), col2X, y);
    });

    doc.moveDown(3);

    // --- footer ---
    doc.fontSize(10).fillColor('#777')
      .text(`Generated on: ${dayjs().format('MMMM D, YYYY h:mm A')}`, { align: 'right' });
    doc.moveDown(0.2);
    doc.fontSize(8).fillColor('#777')
      .text(`Copyright © 2025-2026 Cordova Public College. All rights reserved.`, { align: 'right' });

    doc.end();

    await logActivity(adminId, adminName, `Downloaded dashboard report (${start_date} to ${end_date})`);
  } catch (err) {
    console.error('error generating pdf:', err);
    res.status(500).json({ error: 'internal server error' });
  }
};

module.exports = downloadDashboardReport;