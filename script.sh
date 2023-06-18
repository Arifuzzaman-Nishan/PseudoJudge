#!/bin/bash

echo "docker stopping"
docker compose down
sleep 5
docker volume prune --all --force
sleep 5
docker compose up -d
echo "docker running"