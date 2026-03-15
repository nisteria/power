// Notification Service
import { sendEmail } from './email.js';
import { sendPush } from './push.js';

export type NotificationChannel = 'email' | 'push' | 'sms' | 'webhook';

export interface NotificationPayload {
  userId: string;
  channel: NotificationChannel;
  type: 'alert' | 'info' | 'warning' | 'success';
  title: string;
  message: string;
  data?: Record<string, any>;
  priority?: 'low' | 'medium' | 'high';
}

export interface NotificationTemplate {
  alert: {
    high_tariff: (price: number) => string;
    low_tariff: (price: number) => string;
    device_offline: (deviceName: string) => string;
    command_failed: (deviceName: string, reason: string) => string;
  };
  info: {
    optimization_complete: (savings: number) => string;
    tariff_updated: () => string;
    device_ready: (deviceName: string) => string;
  };
}

const templates: NotificationTemplate = {
  alert: {
    high_tariff: (price) => 
      `⚠️ Hoher Strompreis: ${price.toFixed(3)} €/kWh. Battery-Entladung aktiviert.`,
    low_tariff: (price) => 
      `💰 Niedriger Strompreis: ${price.toFixed(3)} €/kWh. Battery-Ladung aktiviert.`,
    device_offline: (deviceName) => 
      `🔴 ${deviceName} ist offline. Bitte Verbindung prüfen.`,
    command_failed: (deviceName, reason) => 
      `❌ Befehl an ${deviceName} fehlgeschlagen: ${reason}`,
  },
  info: {
    optimization_complete: (savings) => 
      `✅ Optimierung abgeschlossen. Geschätzte Ersparnis: ${savings.toFixed(2)} €`,
    tariff_updated: () => 
      `📊 Neue Tarife für morgen verfügbar.`,
    device_ready: (deviceName) => 
      `✅ ${deviceName} ist bereit.`,
  },
};

export async function sendNotification(payload: NotificationPayload): Promise<boolean> {
  const { userId, channel, type, title, message, data } = payload;

  try {
    switch (channel) {
      case 'email':
        return await sendEmail({ userId, subject: title, body: message, data });
      case 'push':
        return await sendPush({ userId, title, message, data });
      case 'sms':
        // SMS integration placeholder
        console.log(`[SMS] ${title}: ${message}`);
        return true;
      case 'webhook':
        // Webhook integration placeholder
        console.log(`[Webhook] ${title}: ${message}`);
        return true;
      default:
        console.warn(`Unknown channel: ${channel}`);
        return false;
    }
  } catch (error) {
    console.error(`Failed to send notification: ${error}`);
    return false;
  }
}

export async function sendTariffAlert(
  userId: string,
  price: number,
  isHigh: boolean
): Promise<void> {
  const template = isHigh ? templates.alert.high_tariff : templates.alert.low_tariff;
  
  await sendNotification({
    userId,
    channel: 'push',
    type: isHigh ? 'warning' : 'info',
    title: isHigh ? 'Hoher Strompreis' : 'Niedriger Strompreis',
    message: template(price),
    priority: 'high',
  });
}

export async function sendDeviceAlert(
  userId: string,
  deviceName: string,
  alertType: 'offline' | 'command_failed',
  details?: string
): Promise<void> {
  const message = alertType === 'offline'
    ? templates.alert.device_offline(deviceName)
    : templates.alert.command_failed(deviceName, details || 'Unknown error');

  await sendNotification({
    userId,
    channel: 'push',
    type: 'alert',
    title: `Gerät ${deviceName}`,
    message,
    priority: 'high',
  });
}

export async function sendOptimizationNotification(
  userId: string,
  savings: number
): Promise<void> {
  await sendNotification({
    userId,
    channel: 'email',
    type: 'success',
    title: 'Optimierung abgeschlossen',
    message: templates.info.optimization_complete(savings),
    priority: 'low',
  });
}
