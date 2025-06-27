export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET_KEY || 'supersecretjwtkey',
  resendApiKey: process.env.RESEND_API_KEY,
  frontendUrl: process.env.FRONTEND_URL,
  senderEmail: process.env.SENDER_EMAIL,
});
