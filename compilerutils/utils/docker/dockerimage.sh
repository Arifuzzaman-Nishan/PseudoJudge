#!/bin/bash

echo "creating docker image"
docker build -t 'compilebox' - < Dockerfile
echo "retrieving installed docker images"
docker images