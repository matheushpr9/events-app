#!/bin/bash

if [[ "$1" == "--certs" ]]; then
  rm -rf ./certs/oficialfloov.com.br
  mkdir -p ./certs/oficialfloov.com.br
  chmod -R 777 ./certs
fi

chmod -R 777 ./storage
docker compose --profile prod -f docker-compose.yaml up -d
