'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'ok' | 'warning' | 'critical';
}

interface Alert {
  id: string;
  severity: 'P1' | 'P2' | 'P3';
  message: string;
  timestamp: string;
}

export default function MonitoringDashboard() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      // Mock data for demonstration
      setMetrics([
        { name: 'API Response Time', value: 145, unit: 'ms', status: 'ok' },
        { name: 'Active Users', value: 47, unit: '', status: 'ok' },
        { name: 'Smart Meter Uptime', value: 99.9, unit: '%', status: 'ok' },
        { name: 'Worker Queue', value: 3, unit: 'jobs', status: 'ok' },
        { name: 'Error Rate', value: 0.1, unit: '%', status: 'ok' },
        { name: 'DB Connections', value: 12, unit: '', status: 'ok' },
      ]);

      setAlerts([
        { id: '1', severity: 'P3', message: 'Price fetch completed', timestamp: '2026-03-15T03:55:00Z' },
        { id: '2', severity: 'P3', message: 'Optimization job completed', timestamp: '2026-03-15T03:50:00Z' },
      ]);
    } catch (error) {
      console.error('Failed to load monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'P1': return 'bg-red-500';
      case 'P2': return 'bg-yellow-500';
      case 'P3': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Monitoring Dashboard</h1>
        <p className="text-muted-foreground">
          System-Status und Alerts in Echtzeit
        </p>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)}`} />
                <div className="text-2xl font-bold">
                  {metric.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {metric.unit}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Aktive Alerts</CardTitle>
          <CardDescription>Letzte Systemmeldungen</CardDescription>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Keine aktiven Alerts
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                    <span>{alert.message}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleTimeString('de-AT')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Auth Service</span>
              <Badge variant="outline" className="bg-green-500 text-white">Online</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Smart-Meter Ingest</span>
              <Badge variant="outline" className="bg-green-500 text-white">Online</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Device Control</span>
              <Badge variant="outline" className="bg-green-500 text-white">Online</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Optimization Engine</span>
              <Badge variant="outline" className="bg-green-500 text-white">Online</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Infrastructure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span>PostgreSQL</span>
              <Badge variant="outline" className="bg-green-500 text-white">Healthy</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Redis</span>
              <Badge variant="outline" className="bg-green-500 text-white">Healthy</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>Worker</span>
              <Badge variant="outline" className="bg-green-500 text-white">Running</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span>CDN</span>
              <Badge variant="outline" className="bg-green-500 text-white">Healthy</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
