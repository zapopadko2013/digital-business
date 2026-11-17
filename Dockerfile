# --- ЭТАП 1: Сборка приложения ---
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем все зависимости (включая dev) для сборки
RUN npm install --fetch-retries=5 --fetch-retry-mintimeout=20000 --fetch-retry-maxtimeout=120000

COPY . .
RUN npx prisma generate
RUN npx nest build

# --- ЭТАП 2: Финальный продакшн-образ ---
FROM node:18-alpine

WORKDIR /app

# Устанавливаем OpenSSL для работы Prisma на Alpine
RUN apk add --no-cache openssl

COPY package*.json ./
COPY prisma ./prisma/

# Устанавливаем только production-зависимости
RUN npm install --omit=dev --ignore-scripts
RUN npx prisma generate

# Копируем скомпилированные файлы с первого этапа (builder)
COPY --from=builder /app/dist ./dist
COPY entrypoint.sh ./

RUN chmod +x entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
