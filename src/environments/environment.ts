// Production defaults — replaced with environment.development.ts by the
// "development" build configuration (see angular.json fileReplacements).
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.rogue-tech.co.za',
  // GA4 measurement ID — the prod ID (G-XXXX) gets set here. While empty,
  // no analytics code loads at all (AnalyticsService no-ops silently).
  gaMeasurementId: '',
  // Cal.com "<user>/<event>" used by the strategy-call outcome and the consultation
  // modal. Create the account + a 30-minute "strategy-call" event, then update this.
  calLink: 'roguetech/strategy-call',
  // Bookvas, the deposit-secured booking product. Swap for bookvas.co.za when it goes live.
  bookvasUrl: 'https://rt-bookings.netlify.app',
  // WhatsApp number in international format without "+", e.g. 27821234567.
  // Empty = contact CTAs fall back to email.
  whatsappNumber: '',
};
