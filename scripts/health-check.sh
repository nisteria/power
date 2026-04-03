# System Health Check Script
#!/bin/bash

# Power Energy - System Health Check
# Run this to verify all services are healthy

echo "🔍 Power Energy System Health Check"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_service() {
  local name=$1
  local url=$2
  
  if curl -sf "$url" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} $name is healthy"
    return 0
  else
    echo -e "${RED}✗${NC} $name is DOWN"
    return 1
  fi
}

check_port() {
  local name=$1
  local port=$2
  
  if nc -z localhost $port 2>/dev/null; then
    echo -e "${GREEN}✓${NC} $name (port $port) is listening"
    return 0
  else
    echo -e "${RED}✗${NC} $name (port $port) is not listening"
    return 1
  fi
}

# Check Docker services
echo "🐳 Docker Services:"
docker ps --filter "name=power-" --format "{{.Names}}: {{.Status}}" | while read line; do
  if echo "$line" | grep -q "Up"; then
    echo -e "  ${GREEN}✓${NC} $line"
  else
    echo -e "  ${RED}✗${NC} $line"
  fi
done

echo ""
echo "🌐 API Endpoints:"
check_service "API Health" "http://localhost:4000/health"
check_service "API Ready" "http://localhost:4000/health/ready"

echo ""
echo "🌍 Web Frontend:"
check_service "Web App" "http://localhost:3000"

echo ""
echo "🗄️ Database:"
check_port "PostgreSQL" 5432
check_port "Redis" 6379

echo ""
echo "📊 Monitoring:"
check_service "Prometheus" "http://localhost:9090/-/healthy"
check_service "Grafana" "http://localhost:3001/api/health"

echo ""
echo "🔍 Elasticsearch:"
check_service "Elasticsearch" "http://localhost:9200/_cluster/health"

echo ""
echo "======================================"
echo "Health check complete!"
