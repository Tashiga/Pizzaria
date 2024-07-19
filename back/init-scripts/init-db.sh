#!/bin/bash
# Attendre que MySQL soit prêt
sleep 10
# Exécuter le script SQL
mysql -h mysql-db -u "$USER" -p"$PASSWORD" "$DATABASE" < /docker-entrypoint-initdb.d/pizzaria.sql