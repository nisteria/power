// Health Monitor - Background Health Checks
// Monitors all system components and alerts on failures

import { db, testConnection } from './db/index.js';
import { getRedisClient } from './redis/index.js';
import { sendAlert } from './alerts/index.js';

interface HealthCheck {
  name: string;
  check: () => Promise<boolean>;
  critical: boolean;
}

const healthChecks: HealthCheck[] = [
  {
    name: 'database',
    critical: true,
    check: async () => {
      try {
        await db.query('SELECT 1');
        return true;
      } catch {
        return false;
      }
    }
  },
  {
    name: 'redis',
    critical: false,
    check: async () => {
      try {
        const redis = getRedisClient();
        await redis.ping();
        return true;
      } catch {
        return false;
      }
    }
  },
  {
    name: 'epex_api',
    critical: false,
    check: async () => {
      try {
        const response = await fetch('https://api.epexspot.com/api/v1/status');
        return response.ok;
      } catch {
        return false;
      }
    }
  }
];

export async function runHealthChecks(): Promise<void> {
  console.log('Running health checks...');
  
  let allHealthy = true;
  
  for (const check of healthChecks) {
    const isHealthy = await check.check();
    
    if (!isHealthy) {
      console.error(`❌ Health check failed: ${check.name}`);
      allHealthy = false;
      
      if (check.critical) {
        await sendAlert({
          title: `Health Check Failed: ${check.name}`,
          message: `Critical component ${check.name} is not responding`,
          severity: 'critical'
        });
      }
    } else {
      console.log(`✅ Health check passed: ${check.name}`);
    }
  }
  
  // Update health status in Redis
  const redis = getRedisClient();
  await redis.set(
    'system:health',
    JSON.stringify({ 
      healthy: allHealthy, 
      timestamp: new Date().toISOString() 
    }),
    'EX', 300 // 5 minutes TTL
  );
  
  if (!allHealthy) {
    throw new Error('Health checks failed');
  }
}

// Run health checks every 5 minutes
setInterval(runHealthChecks, 5 * 60 * 1000);

// Initial run
runHealthChecks();
