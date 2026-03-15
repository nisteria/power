// Device Protocol - Modbus/TCP
export interface ModbusDevice {
  ip: string;
  port: number;
  unitId: number;
  registers: Register[];
}

export interface Register {
  address: number;
  name: string;
  type: 'holding' | 'input' | 'coil' | 'discrete';
  length: number;
  scale?: number;
  unit?: string;
}

// Common device mappings
export const deviceMappings: Record<string, ModbusDevice> = {
  'BYD-Battery': {
    ip: '192.168.1.100',
    port: 502,
    unitId: 1,
    registers: [
      { address: 0, name: 'soc', type: 'holding', length: 1, scale: 0.1, unit: '%' },
      { address: 1, name: 'voltage', type: 'holding', length: 1, scale: 0.1, unit: 'V' },
      { address: 2, name: 'current', type: 'holding', length: 1, scale: 0.1, unit: 'A' },
    ],
  },
};