# DevOps Guide: VPS + HTTPS

## ВПс (VPS):
Рекомендуемый российский провайдер: `rdp-onedash.ru`

### 1. Установка сервера:
```bash
# Создание пользователя
sudo adduser --disabled-password kotik

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка Nginx
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx

# Установка PostgreSQL
sudo apt install -y postgresql postgresql-contrib
```

### 2. Настройка домена и HTTPS:
```bash
# Получение SSL сертификата
sudo certbot --nginx -d example.com

# Проверка автообновления
sudo certbot renew --dry-run
```

### 3. Развёртывание NestJS:
```bash
# Копирование проекта
cd ~
git clone https://github.com/your-repo/kotik-arithmetic.git

# Установка зависимостей
cd kotik-arithmetic/apps/server
npm install

# Сборка
npm run build

# Запуск через PM2
pm2 start dist/main.js --name "kotik-api"

# Настройка автозапуска (systemd)
sudo systemctl enable pm2-kotik-api
```

### 4. Резервное копирование БД:
```bash
# Ежедневный бэкап
0 2 * * * pg_dump kotik_arithmetic > /backups/$(date +\%F).sql

# Хранение 7 дней
find /backups -name "*.sql" -mtime +7 -delete
```

### 5. Настройка брандмауэра:
```bash
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### 6. Мониторинг логов:
```bash
pm2 logs kotik-api --lines 100
journalctl -u pm2-kotik-api -f
```

## Мониторинг (будущее):
- Prometheus + Grafana для метрик
- PM2 monitoring для авто-рестарта