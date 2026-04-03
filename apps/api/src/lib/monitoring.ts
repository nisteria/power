// Monitoring & Alerting Service
import { db } from '../db/index.js';
import { sendAlert } from './alerts.js';

export interface MetricThreshold {
  metric: string;
  operator: 'gt' | 'lt' | 'eq' | 'gte' | 'lte';
  value: number;
  duration?: number; // seconds
}

export interface AlertRule {
  id: string;
  name: string;
  description: string;
  severity: 'P1' | 'P2' | 'P3';
  metric: string;
  threshold: MetricThreshold;
  enabled: boolean;
  channels: string[]; // email, slack, sms
  cooldownMinutes: number;
  createdAt: Date;
}

// P1 Alert Rules (Critical)
export const P1_ALERT_RULES: AlertRule[] = [
  {
    id: 'p1-ingest-failure',
    name: 'Smart Meter Ingest Failure',
    description: 'No data received from smart meters for >5 minutes',
    severity: 'P1',
    metric: 'smartmeter_ingest_latency_ms',
    threshold: { metric: 'smartmeter_ingest_latency_ms', operator: 'gt', value: 300000, duration: 300 },
    enabled: true,
    channels: ['email', 'slack'],
    cooldownMinutes: 15,
    createdAt: new Date(),
  },
  {
    id: 'p1-data-freshness',
    name: 'Data Freshness Violation',
    description: 'Latest reading older than 15 minutes',
    severity: 'P1',
    metric: 'data_freshness_seconds',
    threshold: { metric: 'data_freshness_seconds', operator: 'gt', value: 900, duration: 60 },
    enabled: true,
    channels: ['email', 'slack', 'sms'],
    cooldownMinutes: 5,
    createdAt: new Date(),
  },
  {
    id: 'p1-command-timeout',
    name: 'Device Command Timeout',
    description: 'Device command not acknowledged within 30 seconds',
    severity: 'P1',
    metric: 'device_command_ack_latency_ms',
    threshold: { metric: 'device_command_ack_latency_ms', operator: 'gt', value: 30000, duration: 30 },
    enabled: true,
    channels: ['email', 'slack'],
    cooldownMinutes: 10,
    createdAt: new Date(),
  },
];

// P2 Alert Rules (Warning)
export const P2_ALERT_RULES: AlertRule[] = [
  {
    id: 'p2-high-latency',
    name: 'API High Latency',
    description: 'API response time >2s for >5 minutes',
    severity: 'P2',
    metric: 'api_response_time_ms',
    threshold: { metric: 'api_response_time_ms', operator: 'gt', value: 2000, duration: 300 },
    enabled: true,
    channels: ['email', 'slack'],
    cooldownMinutes: 30,
    createdAt: new Date(),
  },
  {
    id: 'p2-tariff-missing',
    name: 'Missing Day-Ahead Tariffs',
    description: 'No tariff data available for tomorrow',
    severity: 'P2',
    metric: 'tariff_coverage_hours',
    threshold: { metric: 'tariff_coverage_hours', operator: 'lt', value: 20, duration: 3600 },
    enabled: true,
    channels: ['email'],
    cooldownMinutes: 60,
    createdAt: new Date(),
  },
];

export async function evaluateAlerts(metrics: Record<string, number>): Promise<AlertRule[]> {
  const triggeredAlerts: AlertRule[] = [];
  const allRules = [...P1_ALERT_RULES, ...P2_ALERT_RULES];

  for (const rule of allRules) {
    if (!rule.enabled) continue;

    const metricValue = metrics[rule.threshold.metric];
    if (metricValue === undefined) continue;

    const { operator, value, duration } = rule.threshold;
    let isTriggered = false;

    switch (operator) {
      case 'gt':
        isTriggered = metricValue > value;
        break;
      case 'lt':
        isTriggered = metricValue < value;
        break;
      case 'eq':
        isTriggered = metricValue === value;
        break;
      case 'gte':
        isTriggered = metricValue >= value;
        break;
      case 'lte':
        isTriggered = metricValue <= value;
        break;
    }

    if (isTriggered) {
      triggeredAlerts.push(rule);
      
      // Send alert notification
      for (const channel of rule.channels) {
        await sendAlert(rule, channel);
      }
    }
  }

  return triggeredAlerts;
}

export async function getAlertRules(): Promise<AlertRule[]> {
  return [...P1_ALERT_RULES, ...P2_ALERT_RULES];
}

export async function createCustomAlertRule(rule: Omit<AlertRule, 'id' | 'createdAt'>): Promise<AlertRule> {
  const newRule: AlertRule = {
    ...rule,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  };
  
  // Store in database (implementation depends on db setup)
  return newRule;
}

export async function toggleAlertRule(ruleId: string, enabled: boolean): Promise<void> {
  // Update rule in database
  console.log(`Alert rule ${ruleId} set to enabled=${enabled}`);
}
