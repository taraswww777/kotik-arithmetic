# PostgreSQL Backup Guide

## Настройка автоматических бэкапов:

### 1. Создание скрипта резервного копирования:
```bash
#!/bin/bash
# /usr/local/bin/backup-database.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/kotik-arithmetic"
DB_NAME="kotik_arithmetic"

mkdir -p $BACKUP_DIR
pg_dump -h localhost -U postgres $DB_NAME > $BACKUP_DIR/$DATE.sql.gz
gzip -f $BACKUP_DIR/$DATE.sql.gz
```

### 2. Настройка cron:
```bash
# Ежедневный бэкап в 2:00 AM
echo "0 2 * * * root /usr/local/bin/backup-database.sh" | crontab -l | grep -v backup >> /tmp/crontab && echo "0 2 * * * root /usr/local/bin/backup-database.sh" | crontab -
```

### 3. Хранение 7 дней бэкапов:
```bash
#!/bin/bash
# Удаление старых бэкапов старше 7 дней
find /backups/kotik-arithmetic -name "*.sql.gz" -mtime +7 -delete
```

### 4. Мониторинг логов бэкапов:
```bash
tail -f /var/log/postgresql/*.log
watch -n 5 'ls -lh /backups/kotik-arithmetic | tail -5'
```

## Проверка восстановления:
```bash
# Восстановление БД из бэкапа
gunzip -c /backups/kotik-arithmetic/20261101_120000.sql.gz | psql kotik_arithmetic
```