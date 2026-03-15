# Frontend Component Library

## Overview
Next.js 14 + Tailwind CSS + shadcn/ui components

## Core Components

### Layout
- `Layout` - Main app layout with sidebar
- `Header` - Top navigation bar
- `Sidebar` - Left navigation
- `Footer` - Site footer

### Common
- `Button` - Primary/Secondary/Ghost variants
- `Card` - Content container
- `Input` - Form input field
- `Select` - Dropdown select
- `Modal` - Dialog overlay
- `Table` - Data table
- `Badge` - Status badge
- `Avatar` - User avatar

### Energy-Specific
- `PowerGauge` - Real-time power display
- `TariffChart` - Price/tariff visualization
- `BatteryStatus` - Battery SOC indicator
- `DeviceCard` - Device overview card
- `ConsumptionGraph` - Energy consumption chart
- `SavingsIndicator` - Cost savings display
- `GridStatus` - Grid import/export status

### Forms
- `DeviceForm` - Add/edit device
- `TariffForm` - Configure tariff
- `SiteForm` - Site configuration

### Dashboard Widgets
- `OverviewCard` - Key metrics card
- `LiveChart` - Real-time data chart
- `AlertList` - Recent alerts
- `DeviceGrid` - Device overview grid

## Usage

```tsx
import { Button, Card, PowerGauge } from '@/components';

export default function Dashboard() {
  return (
    <Card>
      <PowerGauge value={5.2} unit="kW" />
      <Button variant="primary">Start Charging</Button>
    </Card>
  );
}
```
