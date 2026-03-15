// Performance Monitoring
// API Performance Tracking

export interface Metric {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

class MetricsCollector {
  private metrics: Metric[] = [];
  private maxMetrics = 1000;

  record(name: string, value: number, tags?: Record<string, string>) {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
      tags,
    });

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }
  }

  timing(name: string, durationMs: number, tags?: Record<string, string>) {
    this.record(`timing.${name}`, durationMs, tags);
  }

  increment(name: string, tags?: Record<string, string>) {
    this.record(`counter.${name}`, 1, tags);
  }

  gauge(name: string, value: number, tags?: Record<string, string>) {
    this.record(`gauge.${name}`, value, tags);
  }

  getMetrics(name?: string): Metric[] {
    if (!name) return this.metrics;
    return this.metrics.filter(m => m.name.startsWith(name));
  }

  getStats(name: string) {
    const values = this.metrics
      .filter(m => m.name === name)
      .map(m => m.value);

    if (values.length === 0) return null;

    const sorted = values.slice().sort((a, b) => a - b);
    const sum = values.reduce((a, b) => a + b, 0);

    return {
      count: values.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg: sum / values.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  }

  reset() {
    this.metrics = [];
  }
}

export const metrics = new MetricsCollector();

// Helper to wrap async functions with timing
export async function trackTiming<T>(
  name: string,
  fn: () => Promise<T>,
  tags?: Record<string, string>
): Promise<T> {
  const start = Date.now();
  try {
    const result = await fn();
    metrics.timing(name, Date.now() - start, { ...tags, status: 'success' });
    return result;
  } catch (error) {
    metrics.timing(name, Date.now() - start, { ...tags, status: 'error' });
    throw error;
  }
}
