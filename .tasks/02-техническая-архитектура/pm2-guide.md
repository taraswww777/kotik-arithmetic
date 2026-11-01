# PM2 Config Guide

## Установка PM2:
```bash
npm install -g pm2
pm2 startup
pm2 save
```

## Запуск приложения:
```bash
pm2 start dist/main.js --name "kotik-api"
pm2 restart kotik-api
pm2 delete kotik-api
pm2 logs kotik-api --lines 100
```

## Мониторинг статуса:
```bash
pm2 status
pm2 list
```

## Экспорт метрик (для Prometheus):
```javascript
const pm2 = require('pm2');

pm2.list((err, apps) => {
  if (err) throw err;
  // Отправлять метрики в Prometheus
});
```

## PM2 Ecosystem config:
```javascript
module.exports = {
  apps: [{
    name: 'kotik-api',
    instances: 'max',
    exec_mode: 'cluster',
    watch: true,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```