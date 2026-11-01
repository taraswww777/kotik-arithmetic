# Prometheus + Grafana Monitoring

## Установка Prometheus:
```bash
docker run -d \
  --name prometheus \
  -p 9090:9090 \
  -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml:ro \
  -v $(pwd)/prometheus-data:/prometheus \
  prom/prometheus
```

## Настройка сбора метрик PM2:
```javascript
// /etc/prometheus/node_exporter/pm2.yml
node_filesystem_binformat: 'btrfs'
node_network_netstat_active: true

# Prometheus scrape config
scrape_configs:
  - job_name: 'pm2'
    static_configs:
      - targets: ['localhost:9238']
```

## Grafana Dashboard для API метрик:
1. Добавление Prometheus в Data Source
2. Импорт дашборда PM2 metrics
3. Настройка алертинга при падении сервиса

## Alerting настройки:
```yaml
# /etc/prometheus/rules.yaml
groups:
  - name: kotik-api-alerts
    rules:
      - alert: APIDown
        expr: up{job='kotik-api'} == 0
        for: 5m
        annotations:
          summary: "Kotik API is down"
          runbook_url: https://runbooks.prometheus-operator.dev/prometheus/node-exporter-down
```