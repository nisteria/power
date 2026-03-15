// Cron Jobs Configuration
// Power Energy - Scheduled Jobs

export const cronJobs = {
  // Price updates
  epexPrices: {
    schedule: '*/15 * * * *', // Every 15 minutes
    description: 'Fetch EPEX spot prices',
    enabled: true,
    timezone: 'Europe/Vienna',
  },

  // Optimization runs
  optimization: {
    schedule: '0 */6 * * *', // Every 6 hours
    description: 'Run optimization for all customers',
    enabled: true,
    timezone: 'Europe/Vienna',
  },

  // Device sync
  deviceSync: {
    schedule: '*/5 * * * *', // Every 5 minutes
    description: 'Sync device states',
    enabled: true,
    timezone: 'Europe/Vienna',
  },

  // Daily reports
  dailyReport: {
    schedule: '0 8 * * *', // 8 AM daily
    description: 'Send daily energy reports',
    enabled: true,
    timezone: 'Europe/Vienna',
  },

  // Weekly reports
  weeklyReport: {
    schedule: '0 9 * * 1', // Monday 9 AM
    description: 'Send weekly summary',
    enabled: true,
    timezone: 'Europe/Vienna',
  },

  // Invoice generation
  invoiceGen: {
    schedule: '0 1 1 * *', // First of month at 1 AM
    description: 'Generate monthly invoices',
    enabled: true,
    timezone: 'Europe/Vienna',
  },

  // Health checks
  healthCheck: {
    schedule: '*/5 * * * *', // Every 5 minutes
    description: 'System health monitoring',
    enabled: true,
    timezone: 'Europe/Vienna',
  },

  // Data cleanup
  dataCleanup: {
    schedule: '0 3 * * *', // 3 AM daily
    description: 'Clean old data and logs',
    enabled: true,
    timezone: 'Europe/Vienna',
  },
};

// Timezone mapping
export const timezones = {
  'Europe/Vienna': 'Europe/Berlin',
  'Europe/London': 'Europe/London',
  'UTC': 'UTC',
};
