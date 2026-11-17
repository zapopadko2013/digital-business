#!/bin/sh
set -e

echo "Waiting for database to be ready..."
npx prisma db push
#npx prisma db push --force-reset

echo "Running database seeding..."
npx prisma db seed || echo "Seeding skipped or already applied."

echo "Starting application..."
if [ -f "dist/main.js" ]; then
  exec node dist/main.js
elif [ -f "dist/src/main.js" ]; then
  exec node dist/src/main.js
else
  echo "Error: Could not find main.js in dist/"
  exit 1
fi
