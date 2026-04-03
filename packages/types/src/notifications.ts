// Notification Preferences
export interface NotificationPreferences {
  email: {
    enabled: boolean;
    invoices: boolean;
    reports: boolean;
    alerts: boolean;
    marketing: boolean;
  };
  push: {
    enabled: boolean;
    priceAlerts: boolean;
    deviceStatus: boolean;
    optimization: boolean;
  };
  sms: {
    enabled: boolean;
    criticalAlerts: boolean;
  };
}

export const defaultPreferences: NotificationPreferences = {
  email: {
    enabled: true,
    invoices: true,
    reports: true,
    alerts: true,
    marketing: false,
  },
  push: {
    enabled: true,
    priceAlerts: true,
    deviceStatus: true,
    optimization: true,
  },
  sms: {
    enabled: false,
    criticalAlerts: true,
  },
};

export function serializePreferences(prefs: NotificationPreferences): string {
  return JSON.stringify(prefs);
}

export function deserializePreferences(data: string): NotificationPreferences {
  try {
    return JSON.parse(data);
  } catch {
    return defaultPreferences;
  }
}
