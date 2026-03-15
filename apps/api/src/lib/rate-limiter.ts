// Rate Limiter - In-Memory Implementation
// Simple rate limiter for API endpoints

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

interface RequestRecord {
  count: number;
  resetTime: number;
}

class InMemoryRateLimiter {
  private requests: Map<string, RequestRecord> = new Map();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
    // Cleanup old records every minute
    setInterval(() => this.cleanup(), 60000);
  }

  check(key: string): { allowed: boolean; remaining: number; resetIn: number } {
    const now = Date.now();
    const record = this.requests.get(key);

    if (!record || now > record.resetTime) {
      // New window
      this.requests.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetIn: this.config.windowMs,
      };
    }

    if (record.count >= this.config.maxRequests) {
      // Rate limited
      return {
        allowed: false,
        remaining: 0,
        resetIn: record.resetTime - now,
      };
    }

    // Increment count
    record.count++;
    this.requests.set(key, record);

    return {
      allowed: true,
      remaining: this.config.maxRequests - record.count,
      resetIn: record.resetTime - now,
    };
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.requests.entries()) {
      if (now > record.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

// Create rate limiters for different endpoints
export const strictLimiter = new InMemoryRateLimiter({
  windowMs: 60000, // 1 minute
  maxRequests: 10,
});

export const standardLimiter = new InMemoryRateLimiter({
  windowMs: 60000, // 1 minute
  maxRequests: 100,
});

export const relaxedLimiter = new InMemoryRateLimiter({
  windowMs: 60000, // 1 minute
  maxRequests: 500,
});
