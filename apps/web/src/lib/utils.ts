// Utility Functions
import { format, formatDistanceToNow, parseISO, isToday, isYesterday, isTomorrow } from 'date-fns';
import { de } from 'date-fns/locale';

// Date formatting
export function formatDate(date: string | Date, formatStr = 'dd.MM.yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, formatStr, { locale: de });
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'dd.MM.yyyy HH:mm');
}

export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true, locale: de });
}

export function formatDayName(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (isToday(d)) return 'Heute';
  if (isYesterday(d)) return 'Gestern';
  if (isTomorrow(d)) return 'Morgen';
  return format(d, 'EEEE', { locale: de });
}

// Number formatting
export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatNumber(num: number, decimals = 0): string {
  return new Intl.NumberFormat('de-AT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${formatNumber(value, decimals)}%`;
}

export function formatKwh(kwh: number): string {
  if (kwh >= 1000) {
    return `${formatNumber(kwh / 1000, 2)} MWh`;
  }
  return `${formatNumber(kwh, 2)} kWh`;
}

export function formatKw(kw: number): string {
  return `${formatNumber(kw, 2)} kW`;
}

// Energy cost calculation
export function calculateEnergyCost(
  kwh: number,
  pricePerKwh: number
): number {
  return kwh * pricePerKwh;
}

export function calculateMonthlyCost(
  dailyKwh: number,
  pricePerKwh: number,
  daysInMonth = 30
): number {
  return dailyKwh * daysInMonth * pricePerKwh;
}

// Savings calculation
export function calculateSavings(
  beforeCost: number,
  afterCost: number
): { amount: number; percent: number } {
  const amount = beforeCost - afterCost;
  const percent = beforeCost > 0 ? (amount / beforeCost) * 100 : 0;
  return { amount, percent };
}

// Device status helpers
export type DeviceStatus = 'active' | 'charging' | 'discharging' | 'idle' | 'error' | 'offline';

export function getDeviceStatusLabel(status: DeviceStatus): string {
  const labels: Record<DeviceStatus, string> = {
    active: 'Aktiv',
    charging: 'Lädt',
    discharging: 'Entlädt',
    idle: 'Bereit',
    error: 'Fehler',
    offline: 'Offline',
  };
  return labels[status] || status;
}

export function getDeviceStatusColor(status: DeviceStatus): string {
  const colors: Record<DeviceStatus, string> = {
    active: 'text-green-400',
    charging: 'text-blue-400',
    discharging: 'text-orange-400',
    idle: 'text-slate-400',
    error: 'text-red-400',
    offline: 'text-slate-500',
  };
  return colors[status] || 'text-slate-400';
}

// Validation helpers
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{8,}$/.test(phone);
}

export function isValid AustrianPhone(phone: string): boolean {
  return /^(\+43|0)[1-9]\d{1,14}$/.test(phone.replace(/\s/g, ''));
}

// String helpers
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Array helpers
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    (result[groupKey] = result[groupKey] || []).push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export function sortBy<T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

// Object helpers
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result;
}

// Async helpers
export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error;
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxAttempts) {
        await sleep(delay * i);
      }
    }
  }
  throw lastError!;
}

// Local storage helpers
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error('Failed to save to localStorage');
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
}
