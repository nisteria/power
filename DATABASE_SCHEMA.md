# DATABASE_SCHEMA.md - Power Energy Orchestrator

**Version:** 1.0  
**Datum:** 2026-03-14  
**Scope:** MVP Database Schema für Smart-Meter + Device Control + Billing

---

## 1. Core Tables

### 1.1 Customers
```sql
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    company_name VARCHAR(255),
    company_register_number VARCHAR(50),
    vat_number VARCHAR(20),
    address_id UUID REFERENCES addresses(id),
    status customer_status DEFAULT 'pending',
    customer_type customer_type DEFAULT 'residential',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_status ON customers(status);

CREATE TYPE customer_status AS ENUM ('pending', 'active', 'suspended', 'cancelled');
CREATE TYPE customer_type AS ENUM ('residential', 'commercial', 'industrial');
```

### 1.2 Addresses
```sql
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    street VARCHAR(255) NOT NULL,
    house_number VARCHAR(20) NOT NULL,
    door VARCHAR(20),
    postal_code VARCHAR(10) NOT NULL,
    city VARCHAR(100) NOT NULL,
    country CHAR(2) DEFAULT 'AT',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_addresses_postal ON addresses(postal_code);
CREATE INDEX idx_addresses_coordinates ON addresses(latitude, longitude);
```

---

## 2. Energy Infrastructure Tables

### 2.1 Smart Meters
```sql
CREATE TABLE smart_meters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id),
    netzbetreiber_id UUID NOT NULL REFERENCES netzbetreiber(id),
    smart_meter_id VARCHAR(100) UNIQUE NOT NULL,
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    meter_type meter_type NOT NULL,
    installation_date DATE,
    last_reading_at TIMESTAMPTZ,
    status meter_status DEFAULT 'active',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE meter_type AS ENUM ('single_phase', 'three_phase', 'smart_complex');
CREATE TYPE meter_status AS ENUM ('pending', 'active', 'inactive', 'fault', 'decommissioned');

CREATE INDEX idx_smart_meters_customer ON smart_meters(customer_id);
CREATE INDEX idx_smart_meters_netzbetreiber ON smart_meters(netzbetreiber_id);
CREATE INDEX idx_smart_meters_status ON smart_meters(status);
```

### 2.2 Consumption Data (High Volume - TimescaleDB)
```sql
CREATE TABLE consumption_data (
    id BIGSERIAL PRIMARY KEY,
    smart_meter_id UUID NOT NULL REFERENCES smart_meters(id),
    timestamp TIMESTAMPTZ NOT NULL,
    consumption_kwh DECIMAL(10, 4) NOT NULL,
    power_kw DECIMAL(8, 3),
    voltage DECIMAL(6, 2),
    current_amps DECIMAL(6, 3),
    power_factor DECIMAL(4, 3),
    quality data_quality DEFAULT 'high',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Partition by month for scalability
CREATE TABLE consumption_data_y2026m03 PARTITION OF consumption_data
    FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');

CREATE INDEX idx_consumption_meter_time ON consumption_data(smart_meter_id, timestamp DESC);
CREATE INDEX idx_consumption_timestamp ON consumption_data(timestamp DESC);

-- Aggregate views for common queries
CREATE MATERIALIZED VIEW daily_consumption AS
SELECT 
    smart_meter_id,
    DATE(timestamp) as date,
    SUM(consumption_kwh) as total_kwh,
    AVG(power_kw) as avg_power_kw,
    MAX(power_kw) as peak_power_kw,
    COUNT(*) as reading_count
FROM consumption_data
GROUP BY smart_meter_id, DATE(timestamp);

CREATE TYPE data_quality AS ENUM ('high', 'medium', 'low', 'estimated');
```

### 2.3 Netzbetreiber (Grid Operators)
```sql
CREATE TABLE netzbetreiber (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(20) NOT NULL,
    eeg_number VARCHAR(20),
    market_participant_id VARCHAR(20),
    base_url VARCHAR(500),
    api_type api_type NOT NULL,
    auth_method auth_method NOT NULL,
    status netzbetreiber_status DEFAULT 'active',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE api_type AS ENUM ('rest', 'soap', 'dlms', 'iec62056');
CREATE TYPE auth_method AS ENUM ('oauth2', 'api_key', 'certificate', 'basic');
CREATE TYPE netzbetreiber_status AS ENUM ('active', 'inactive', 'testing', 'deprecated');

-- Austrian Netzbetreiber defaults
INSERT INTO netzbetreiber (name, short_name, api_type, auth_method) VALUES
    ('Wiener Netze GmbH', 'WNG', 'rest', 'oauth2'),
    ('Netz Oberösterreich GmbH', 'OÖ', 'rest', 'oauth2'),
    ('Salzburg Netz GmbH', 'SNG', 'rest', 'oauth2'),
    ('TINETZ-Tiroler Netze GmbH', 'TINETZ', 'rest', 'api_key'),
    ('Kärnten Netz GmbH', 'KNG', 'rest', 'oauth2'),
    ('Netz Burgenland GmbH', 'NBG', 'rest', 'oauth2'),
    ('Stromnetz Steiermark GmbH', 'STG', 'rest', 'oauth2');
```

---

## 3. Device Tables

### 3.1 Devices (Wallbox, Battery, Heat Pump, Boiler)
```sql
CREATE TABLE devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id),
    device_type device_type NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    serial_number VARCHAR(100) UNIQUE,
    firmware_version VARCHAR(50),
    installation_date DATE,
    warranty_expiry DATE,
    status device_status DEFAULT 'pending',
    config JSONB DEFAULT '{}',
    capabilities JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE device_type AS ENUM ('wallbox', 'battery', 'heat_pump', 'boiler', 'inverter', 'meter');
CREATE TYPE device_status AS ENUM ('pending', 'installed', 'active', 'inactive', 'fault', 'removed');

CREATE INDEX idx_devices_customer ON devices(customer_id);
CREATE INDEX idx_devices_type ON devices(device_type);
CREATE INDEX idx_devices_status ON devices(device_status);
```

### 3.2 Device State (Current Status)
```sql
CREATE TABLE device_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID NOT NULL REFERENCES devices(id),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    state_data JSONB NOT NULL,
    soc_percent DECIMAL(5, 2), -- State of Charge für Battery
    power_kw DECIMAL(8, 3),
    error_code VARCHAR(20),
    error_message TEXT
);

CREATE INDEX idx_device_states_device_time ON device_states(device_id, timestamp DESC);
```

### 3.3 Device Schedules
```sql
CREATE TABLE device_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID NOT NULL REFERENCES devices(id),
    schedule_type schedule_type NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    target_value DECIMAL(10, 2), -- z.B. 80% SOC
    priority INTEGER DEFAULT 5,
    status schedule_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE schedule_type AS ENUM ('charge', 'discharge', 'maintain', 'optimize', 'manual');
CREATE TYPE schedule_status AS ENUM ('pending', 'active', 'completed', 'cancelled', 'failed');

CREATE INDEX idx_device_schedules_device ON device_schedules(device_id, start_time);
CREATE INDEX idx_device_schedules_status ON device_schedules(status);
```

---

## 4. Tariff & Pricing Tables

### 4.1 Tariffs
```sql
CREATE TABLE tariffs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    tariff_type tariff_type NOT NULL,
    netzbetreiber_id UUID REFERENCES netzbetreiber(id),
    valid_from DATE NOT NULL,
    valid_until DATE,
    base_price_monthly DECIMAL(10, 2) DEFAULT 0,
    energy_price_kwh DECIMAL(8, 4) NOT NULL,
    grid_fee_kwh DECIMAL(8, 4),
    tax_percent DECIMAL(5, 2) DEFAULT 20,
    peak_hours JSONB, -- Array von Stunden z.B. [7,8,9,17,18,19]
    off_peak_hours JSONB,
    is_dynamic BOOLEAN DEFAULT FALSE,
    status tariff_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE tariff_type AS ENUM ('fixed', 'dynamic', 'time_of_use', 'peak_pricing');
CREATE TYPE tariff_status AS ENUM ('draft', 'active', 'archived');

CREATE INDEX idx_tariffs_netzbetreiber ON tariffs(netzbetreiber_id);
CREATE INDEX idx_tariffs_valid ON tariffs(valid_from, valid_until);
```

### 4.2 Dynamic Price Data (EPEX Spot)
```sql
CREATE TABLE epex_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    hour INTEGER NOT NULL,
    price_eur_mwh DECIMAL(10, 4) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_epex_date_hour ON epex_prices(date, hour);

-- Austrian bidding zone (AT)
CREATE TABLE epex_prices_at (
    PRIMARY KEY (id)
) INHERITS (epex_prices);
```

### 4.3 Customer Tariffs
```sql
CREATE TABLE customer_tariffs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id),
    tariff_id UUID NOT NULL REFERENCES tariffs(id),
    meter_id UUID REFERENCES smart_meters(id),
    contract_start DATE NOT NULL,
    contract_end DATE,
    status customer_tariff_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE customer_tariff_status AS ENUM ('pending', 'active', 'cancelled', 'expired');

CREATE INDEX idx_customer_tariffs_customer ON customer_tariffs(customer_id);
CREATE INDEX idx_customer_tariffs_tariff ON customer_tariffs(tariff_id);
```

---

## 5. Billing & Invoicing

### 5.1 Invoices
```sql
CREATE TABLE invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID NOT NULL REFERENCES customers(id),
    invoice_type invoice_type NOT NULL,
    billing_period_start DATE NOT NULL,
    billing_period_end DATE NOT NULL,
    subtotal_cents INTEGER NOT NULL,
    tax_cents INTEGER NOT NULL,
    total_cents INTEGER NOT NULL,
    currency CHAR(3) DEFAULT 'EUR',
    status invoice_status DEFAULT 'draft',
    issued_at TIMESTAMPTZ,
    due_date DATE,
    paid_at TIMESTAMPTZ,
    payment_method payment_method,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE invoice_type AS ENUM ('subscription', 'one_time', 'hardware', 'pro_rata');
CREATE TYPE invoice_status AS ENUM ('draft', 'issued', 'paid', 'overdue', 'cancelled', 'refunded');
CREATE TYPE payment_method AS ENUM ('sepa', 'credit_card', 'bank_transfer', 'cash');

CREATE INDEX idx_invoices_customer ON invoices(customer_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
```

### 5.2 Invoice Items
```sql
CREATE TABLE invoice_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES invoices(id),
    description VARCHAR(500) NOT NULL,
    quantity DECIMAL(10, 4) DEFAULT 1,
    unit VARCHAR(20),
    unit_price_cents INTEGER NOT NULL,
    total_price_cents INTEGER NOT NULL,
    tax_percent DECIMAL(5, 2) DEFAULT 20,
    period_start DATE,
    period_end DATE
);

CREATE INDEX idx_invoice_items_invoice ON invoice_items(invoice_id);
```

---

## 6. Optimization Tables

### 6.1 Optimization Jobs
```sql
CREATE TABLE optimization_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id),
    job_type job_type NOT NULL,
    status job_status DEFAULT 'pending',
    parameters JSONB DEFAULT '{}',
    result JSONB,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE job_type AS ENUM ('schedule_optimization', 'tariff_selection', 'peak_shaving', 'forecast');
CREATE TYPE job_status AS ENUM ('pending', 'running', 'completed', 'failed', 'cancelled');

CREATE INDEX idx_optimization_jobs_customer ON optimization_jobs(customer_id);
CREATE INDEX idx_optimization_jobs_status ON optimization_jobs(status);
```

### 6.2 Optimization Results (Recommendations)
```sql
CREATE TABLE optimization_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id),
    recommendation_type recommendation_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    potential_savings_monthly DECIMAL(10, 2),
    priority INTEGER DEFAULT 5,
    status recommendation_status DEFAULT 'pending',
    implemented_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE recommendation_type AS ENUM ('tariff_change', 'device_schedule', 'hardware_upgrade', 'behavior');
CREATE TYPE recommendation_status AS ENUM ('pending', 'recommended', 'accepted', 'implemented', 'dismissed');
```

---

## 7. User & Auth Tables

### 7.1 User Roles
```sql
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    permissions JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO roles (name, permissions) VALUES
    ('admin', '["*"]'),
    ('ops', '["read:all", "write:devices", "write:schedules", "read:optimizations"]'),
    ('customer', '["read:own", "write:own:devices", "read:own:billing"]'),
    ('installer', '["read:assigned", "write:assigned:devices"]');
```

### 7.2 User Role Assignments
```sql
CREATE TABLE user_roles (
    user_id UUID NOT NULL,
    role_id UUID NOT NULL REFERENCES roles(id),
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    assigned_by UUID,
    PRIMARY KEY (user_id, role_id)
);
```

---

## 8. Audit & Logging

### 8.1 Audit Log
```sql
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name VARCHAR(100) NOT NULL,
    record_id UUID NOT NULL,
    action audit_action NOT NULL,
    user_id UUID,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'login', 'logout');

CREATE INDEX idx_audit_log_table ON audit_log(table_name, created_at DESC);
CREATE INDEX idx_audit_log_user ON audit_log(user_id, created_at DESC);
CREATE INDEX idx_audit_log_record ON audit_log(table_name, record_id);
```

### 8.2 API Request Log
```sql
CREATE TABLE api_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    method VARCHAR(10) NOT NULL,
    path VARCHAR(500) NOT NULL,
    query_params JSONB,
    request_body JSONB,
    response_status INTEGER,
    response_time_ms INTEGER,
    user_id UUID,
    api_key_hash VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_api_logs_user ON api_logs(user_id, created_at DESC);
CREATE INDEX idx_api_logs_path_time ON api_logs(path, created_at DESC);
```

---

## 9. Integration Tables

### 9.1 Webhook Deliveries
```sql
CREATE TABLE webhook_deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    webhook_id UUID NOT NULL REFERENCES webhooks(id),
    payload JSONB NOT NULL,
    status webhook_status DEFAULT 'pending',
    attempts INTEGER DEFAULT 0,
    response_status INTEGER,
    response_body TEXT,
    next_retry_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE webhook_status AS ENUM ('pending', 'delivered', 'failed', 'retrying');

CREATE INDEX idx_webhook_deliveries_status ON webhook_deliveries(status);
```

### 9.2 External Integrations
```sql
CREATE TABLE external_integrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    integration_type integration_type NOT NULL,
    config JSONB NOT NULL,
    status integration_status DEFAULT 'active',
    last_sync_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE integration_type AS ENUM ('epex', 'weather', 'grid_operator', 'billing', 'crm');
CREATE TYPE integration_status AS ENUM ('active', 'inactive', 'error', 'pending_sync');
```

---

## Migrations & Seeding

### Migration Strategy
- Use Drizzle migrations
- Always add columns with DEFAULT values for existing rows
- Never delete columns (mark as deprecated instead)
- Use soft deletes where appropriate

### Initial Seed Data
```sql
-- Roles (already defined above)
-- Netzbetreiber (already defined above)
-- Default Tariffs (for testing)
-- Demo Customer for development
```

---

## Performance Considerations

### Indexing Strategy
- Foreign keys: Always indexed
- High-volume tables (consumption_data): Partition by time, index by meter + time
- Billing: Index by customer + period
- Optimize for read-heavy workload (90% reads, 10% writes)

### Caching Strategy (Redis)
- User sessions: 1 hour TTL
- Tariffs: 24 hour TTL  
- EPEX prices: 15 minute TTL
- Device states: 1 minute TTL
- Optimization results: 1 hour TTL

### Query Patterns
- Pre-aggregate consumption data for dashboards (hourly, daily, monthly views)
- Use materialized views for common analytics queries
- Implement query result caching at application level
