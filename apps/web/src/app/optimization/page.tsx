'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { Badge } from '@/components/ui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface OptimizationRecommendation {
  action: 'charge' | 'discharge' | 'hold';
  deviceId: string;
  deviceName: string;
  targetPowerKw?: number;
  targetSocPct?: number;
  reason: string;
  expectedSavingsEur: number;
  priority: number;
}

interface ArbitrageOpportunity {
  chargeWindow: { start: string; end: string } | null;
  dischargeWindow: { start: string; end: string } | null;
  potentialSavings: number;
}

interface TariffData {
  timestamp: string;
  price: number;
}

export default function OptimizationPage() {
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);
  const [arbitrage, setArbitrage] = useState<ArbitrageOpportunity | null>(null);
  const [tariffHistory, setTariffHistory] = useState<TariffData[]>([]);
  const [loading, setLoading] = useState(true);
  const [siteId] = useState('site-001');

  useEffect(() => {
    loadData();
  }, [siteId]);

  const loadData = async () => {
    try {
      // Fetch recommendations
      const recsRes = await fetch(`/api/v1/sites/${siteId}/optimize/recommendations`);
      const recsData = await recsRes.json();
      setRecommendations(recsData.recommendations || []);

      // Fetch arbitrage
      const arbRes = await fetch(`/api/v1/sites/${siteId}/optimize/arbitrage`);
      const arbData = await arbRes.json();
      setArbitrage(arbData);

      // Mock tariff history for chart
      setTariffHistory([
        { timestamp: '00:00', price: 0.08 },
        { timestamp: '04:00', price: 0.06 },
        { timestamp: '08:00', price: 0.12 },
        { timestamp: '12:00', price: 0.18 },
        { timestamp: '16:00', price: 0.22 },
        { timestamp: '20:00', price: 0.15 },
        { timestamp: '23:00', price: 0.10 },
      ]);
    } catch (error) {
      console.error('Failed to load optimization data:', error);
    } finally {
      setLoading(false);
    }
  };

  const runOptimization = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/sites/${siteId}/optimize`, { method: 'POST' });
      const data = await res.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Failed to run optimization:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'charge': return 'bg-green-500';
      case 'discharge': return 'bg-orange-500';
      case 'hold': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'charge': return '⚡';
      case 'discharge': return '🔋';
      case 'hold': return '⏸️';
      default: return '❓';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Optimierung</h1>
          <p className="text-muted-foreground">
            KI-gestützte Energieoptimierung für maximale Ersparnis
          </p>
        </div>
        <button
          onClick={runOptimization}
          disabled={loading}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Optimiere...' : 'Jetzt optimieren'}
        </button>
      </div>

      {/* Arbitrage Opportunities */}
      {arbitrage && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Lade-Fenster (günstig)</CardTitle>
            </CardHeader>
            <CardContent>
              {arbitrage.chargeWindow ? (
                <div className="text-2xl font-bold text-green-600">
                  {new Date(arbitrage.chargeWindow.start).toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' })}
                  {' - '}
                  {new Date(arbitrage.chargeWindow.end).toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' })}
                </div>
              ) : (
                <div className="text-lg text-muted-foreground">Keine Daten</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Optimaler Zeitpunkt zum Laden</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Entlade-Fenster (teuer)</CardTitle>
            </CardHeader>
            <CardContent>
              {arbitrage.dischargeWindow ? (
                <div className="text-2xl font-bold text-orange-600">
                  {new Date(arbitrage.dischargeWindow.start).toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' })}
                  {' - '}
                  {new Date(arbitrage.dischargeWindow.end).toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit' })}
                </div>
              ) : (
                <div className="text-lg text-muted-foreground">Keine Daten</div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Optimaler Zeitpunkt zum Verkaufen</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Potenzielle Ersparnis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {arbitrage.potentialSavings.toFixed(2)} €
              </div>
              <p className="text-xs text-muted-foreground mt-1">Pro Tag durch Arbitrage</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tariff Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tarif-Verlauf (heute)</CardTitle>
          <CardDescription>Strompreise pro Stunde</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tariffHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis unit="€" domain={[0, 'auto']} />
                <Tooltip formatter={(value: number) => [`${value.toFixed(3)} €/kWh`, 'Preis']} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Empfehlungen</CardTitle>
          <CardDescription>Automatische Optimierungsvorschläge basierend auf aktuellen Tarifen</CardDescription>
        </CardHeader>
        <CardContent>
          {recommendations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Keine Empfehlungen verfügbar
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActionColor(rec.action)} text-white`}>
                      {getActionIcon(rec.action)}
                    </div>
                    <div>
                      <div className="font-medium">
                        {rec.deviceName}
                        <Badge variant="outline" className="ml-2">
                          {rec.action}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{rec.reason}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      +{rec.expectedSavingsEur.toFixed(2)} €
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {rec.targetPowerKw && `${rec.targetPowerKw} kW`}
                      {rec.targetSocPct && ` / ${rec.targetSocPct}%`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
