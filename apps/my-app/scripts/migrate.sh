#!/bin/bash

cfg=$(cat wrangler.jsonc | sed 's/^ *\/\/.*//' | jq -r '.d1_databases[0]')
db=$(echo $cfg | jq -r '.database_name')
datamodel=$(echo $cfg | jq -r '.migrations_dir' | sed 's/migrations/schema.prisma/')

output=$(npx wrangler d1 migrations create $db $1 | tee /dev/tty)
filepath=$(echo "$output" | tail -n 1)

npx prisma migrate diff \
  --from-local-d1 \
  --to-schema-datamodel \
  $datamodel \
  --script --output \
  $filepath
