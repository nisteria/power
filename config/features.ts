// Feature Flags - Dynamic Configuration
export interface FeatureFlags {
  // Dashboard features
  showAnalytics: boolean;
  showPredictions: boolean;
  showCarbonFootprint: boolean;
  
  // Device features
  allowDeviceControl: boolean;
  autoScheduling: boolean;
  // Billing features
  showDetailedBilling: boolean;
  enableInvoices: boolean;
  // Tariffs
  dynamicPricing: boolean;
  tariffComparison: boolean;
  // Notifications
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  // Beta features
  betaAI: boolean;
  betaAdvancedCharts: boolean;
  betaExport: boolean;
}

export const defaultFlags: FeatureFlags = {
  showAnalytics: true,
  showPredictions: true,
  showCarbonFootprint: true,
  allowDeviceControl: true,
  autoScheduling: true,
  showDetailedBilling: true,
  enableInvoices: true,
  dynamicPricing: true,
  tariffComparison: true,
  pushNotifications: true,
  emailNotifications: true,
  smsNotifications: false,
  betaAI: false,
  betaAdvancedCharts: false,
  betaExport: false,
};

// Environment-based flags
export function getFlags(): FeatureFlags {
  return {
    ...defaultFlags,
    // Override with env vars if needed
  };
}
