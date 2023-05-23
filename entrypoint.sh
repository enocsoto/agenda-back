#!/bin/sh

# Esperar a que el contenedor de MySQL esté disponible
/wait-for-it.sh mysql:3306 --timeout=60 --strict -- echo "MySQL is up"

# Esperar 5 segundos
sleep 10

# Iniciar la aplicación Node
npm run start:dev
# node ./dist/main.js
