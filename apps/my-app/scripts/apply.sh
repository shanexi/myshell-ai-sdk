#!/bin/bash

npx wrangler d1 migrations apply $(cat ./wrangler.jsonc | sed 's/^ *\/\/.*//' | jq -r '.d1_databases[0].database_name') --local
