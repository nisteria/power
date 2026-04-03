// API Client - Power Energy SDK
// TypeScript client for Power API

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class PowerAPIError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'PowerAPIError';
  }
}

class PowerAPIClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      throw new PowerAPIError(
        error.error?.code || 'UNKNOWN',
        error.error?.message || 'Request failed'
      );
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    const data = await this.request<{ accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.accessToken);
    return data;
  }

  async register(email: string, password: string, firstName: string, lastName: string) {
    const data = await this.request<{ accessToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
    this.setToken(data.accessToken);
    return data;
  }

  // Customer
  async getProfile() {
    return this.request('/customers/me');
  }

  async updateProfile(data: any) {
    return this.request('/customers/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Smart Meter
  async authorizeSmartMeter(netzbetreiberId: string, meterId: string) {
    return this.request('/smartmeter/authorize', {
      method: 'POST',
      body: JSON.stringify({ netzbetreiberId, meterId }),
    });
  }

  async getConsumption(meterId: string, dateFrom: string, dateTo: string, interval = '1h') {
    return this.request(
      `/smartmeter/${meterId}/consumption?dateFrom=${dateFrom}&dateTo=${dateTo}&interval=${interval}`
    );
  }

  async getRealtime(meterId: string) {
    return this.request(`/smartmeter/${meterId}/realtime`);
  }

  async getHistory(meterId: string, months = 3) {
    return this.request(`/smartmeter/${meterId}/history?months=${months}`);
  }

  // Devices
  async getDevices() {
    return this.request('/devices');
  }

  async getDevice(deviceId: string) {
    return this.request(`/devices/${deviceId}`);
  }

  async updateDeviceConfig(deviceId: string, config: any) {
    return this.request(`/devices/${deviceId}/config`, {
      method: 'PATCH',
      body: JSON.stringify(config),
    });
  }

  async getDeviceSchedule(deviceId: string) {
    return this.request(`/devices/${deviceId}/schedule`);
  }

  async createDeviceSchedule(deviceId: string, schedule: any) {
    return this.request(`/devices/${deviceId}/schedule`, {
      method: 'POST',
      body: JSON.stringify(schedule),
    });
  }

  // Optimization
  async getRecommendations() {
    return this.request('/optimization/recommendations');
  }

  async runOptimization(jobType: string, parameters?: any) {
    return this.request('/optimization/run', {
      method: 'POST',
      body: JSON.stringify({ jobType, parameters }),
    });
  }

  async getOptimizationJobs() {
    return this.request('/optimization/jobs');
  }

  async acceptRecommendation(recommendationId: string) {
    return this.request(`/optimization/recommendations/${recommendationId}/accept`, {
      method: 'POST',
    });
  }

  // Billing
  async getInvoices(status?: string, limit = 20, offset = 0) {
    const params = new URLSearchParams({ limit: String(limit), offset: String(offset) });
    if (status) params.append('status', status);
    return this.request(`/billing/invoices?${params}`);
  }

  async getInvoice(invoiceId: string) {
    return this.request(`/billing/invoices/${invoiceId}`);
  }

  // Webhooks
  async registerWebhook(url: string, events: string[]) {
    return this.request('/webhooks', {
      method: 'POST',
      body: JSON.stringify({ url, events }),
    });
  }

  async getWebhooks() {
    return this.request('/webhooks');
  }

  async deleteWebhook(webhookId: string) {
    return this.request(`/webhooks/${webhookId}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton
export const powerApi = new PowerAPIClient();
export { PowerAPIError };
export default powerApi;
