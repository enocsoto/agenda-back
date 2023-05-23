#!/bin/bash
# wait-for-it.sh: Esperar a que un servicio esté disponible antes de continuar

set -e

host="$1"
port="$2"
shift 2
cmd="$@"

until nc -z "$host" "$port"; do
  echo "Esperando a que $host:$port esté disponible..."
  sleep 1
done

echo "$host:$port está disponible, ejecutando el comando: $cmd"
exec $cmd
