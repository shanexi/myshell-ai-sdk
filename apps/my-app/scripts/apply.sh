#!/bin/bash

npx wrangler d1 migrations apply $(cat ./wrangler.jsonc | sed 's/^ *\/\/.*//' | jq -r '.d1_databases[0].database_name') --local

# prisma generate
migrations_dir=$(cat wrangler.jsonc | sed 's/^ *\/\/.*//' | jq -r '.d1_databases[0].migrations_dir')
prisma_dir=$(echo $migrations_dir | sed 's/\/prisma\/migrations//')
cd $prisma_dir
npm run generate