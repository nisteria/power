# DATABASE_SCHEMA.md

## Tabellen (MVP)

### organizations
- id (uuid, pk)
- name
- country (default: AT)
- created_at

### users
- id (uuid, pk)
- organization_id (fk)
- email (unique)
- password_hash
- role (owner|member|installer|admin)
- created_at

### sites
- id (uuid, pk)
- organization_id (fk)
- name
- address
- grid_operator
- smart_meter_id
- created_at

### devices
- id (uuid, pk)
- site_id (fk)
- type (battery|wallbox|heatpump|boiler|pv_inverter|gateway)
- vendor
- model
- serial_number
- controllable (bool)
- status
- created_at

### tariffs
- id (uuid, pk)
- site_id (fk)
- provider_name
- tariff_type (dynamic|fixed|hybrid)
- billing_interval
- active_from
- active_to

### price_timeslots
- id (uuid, pk)
- tariff_id (fk)
- starts_at
- ends_at
- energy_price_ct_per_kwh
- source (epex|provider|manual)

### optimization_policies
- id (uuid, pk)
- site_id (fk)
- min_battery_soc_pct
- max_charge_power_kw
- comfort_rules_json
- cost_weight
- co2_weight
- active
- updated_at

### schedules
- id (uuid, pk)
- site_id (fk)
- planning_window_start
- planning_window_end
- version
- created_at

### schedule_actions
- id (uuid, pk)
- schedule_id (fk)
- device_id (fk)
- action (charge|discharge|pause|set_power)
- value
- starts_at
- ends_at

### telemetry
- id (uuid, pk)
- device_id (fk)
- ts
- power_kw
- energy_kwh
- soc_pct
- temperature_c
- raw_json

### audit_logs
- id (uuid, pk)
- actor_user_id (fk)
- site_id (fk)
- device_id (fk, nullable)
- action
- payload_json
- created_at
