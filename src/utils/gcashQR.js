const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');

// === gcash qr generator with fixed amount ===
async function generateGcashQR(amount) {
  try {
    // ⚠️ replace this with your *real gcash qr text data* (from your actual qr)
    const baseQR = "00020101021127830012com.p2pqrpay0111GXCHPHM2XXX02089996440303152170200000006560417DWQM4TK3JDO11VF385204601653036085802PH5911SH*****E V.6006Umapad6104123463047E07";

    // insert amount dynamically
    const withAmount = baseQR.replace("53036085802PH", `5303608540${amount.toFixed(2)}5802PH`);

    // generate qr file
    const fileName = `gcash_qr_${amount}_${Date.now()}.png`;
    const uploadDir = path.join(__dirname, '../uploads/qrs');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const qrPath = path.join(uploadDir, fileName);
    await qrcode.toFile(qrPath, withAmount, { width: 300 });

    return {
      message: `Locker rental created. Please scan to pay ₱${amount} via GCash.`,
      qr_download: `/uploads/qrs/${fileName}`,
      amount: amount,
    };

  } catch (err) {
    console.error(err);
    throw new Error('Failed to generate GCash QR');
  }
}

module.exports = { generateGcashQR };