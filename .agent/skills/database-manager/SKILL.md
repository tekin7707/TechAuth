---
name: database-manager
description: TechAuth projesine özel veritabanı yönetimi ve Prisma operasyonları uzmanı.
---

# Database Manager Skill

Bu skill, TechAuth projesindeki PostgreSQL ve Prisma operasyonlarını yönetmek için özelleşmiş talimatlar içerir.

## Kullanım Alanları
- Yeni veritabanı migration'ları oluşturma.
- Prisma schema güncellemeleri.
- Seed datası hazırlama.
- Karmaşık Prisma sorguları yazma (özellikle User ve Admin rolleri için).

## Talimatlar
1. **Migration Güvenliği**: Migration yapmadan önce mutlaka mevcut schema'yı kontrol et.
2. **Type Safety**: Prisma client kullanımında her zaman üretilen (generated) tipleri kullan.
3. **Environment**: İşlemleri yaparken root `.env` dosyasındaki `DATABASE_URL`'in doğruluğunu teyit et.
4. **Docker**: Migration komutlarını her zaman `docker-compose exec api` üzerinden çalıştır.

## Örnek Komutlar
```bash
docker-compose exec api npx prisma migrate dev --name init
```
