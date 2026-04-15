const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// In-memory OTP storage (use Redis in production)
const otpStore = new Map();

function generateOTP() {
  const length = parseInt(process.env.OTP_LENGTH) || 6;
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, '0');
}

async function sendOTP(phone, countryCode) {
  const otp = generateOTP();
  const fullPhone = `${countryCode}${phone}`;
  const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES) || 10;
  const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

  // Store OTP
  otpStore.set(fullPhone, { otp, expiresAt });

  // Send SMS
  try {
    await client.messages.create({
      body: `Your HomeGuru verification code is: ${otp}. Valid for ${expiryMinutes} minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: fullPhone,
    });

    console.log(`OTP sent to ${fullPhone}: ${otp}`);
    return { success: true, expiresAt: expiresAt.toISOString() };
  } catch (error) {
    console.error('Failed to send OTP:', error);
    throw new Error('Failed to send OTP');
  }
}

async function verifyOTPCode(phone, countryCode, otp) {
  const fullPhone = `${countryCode}${phone}`;
  const stored = otpStore.get(fullPhone);

  if (!stored) {
    return false;
  }

  const now = new Date();
  if (now > new Date(stored.expiresAt)) {
    otpStore.delete(fullPhone);
    return false;
  }

  if (stored.otp !== otp) {
    return false;
  }

  // OTP is valid, remove it
  otpStore.delete(fullPhone);
  return true;
}

module.exports = {
  sendOTP,
  verifyOTPCode,
};
