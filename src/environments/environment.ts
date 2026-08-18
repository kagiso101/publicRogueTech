// Production defaults — replaced with environment.development.ts by the
// "development" build configuration (see angular.json fileReplacements).
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.rogue-tech.co.za',
  // GA4 measurement ID — the prod ID (G-XXXX) gets set here. While empty,
  // no analytics code loads at all (AnalyticsService no-ops silently).
  gaMeasurementId: '',
};
