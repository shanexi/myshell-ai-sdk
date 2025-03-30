#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

CONFIG_FILE="../../../libs/biz/def/src/my-app-worker-configuration"
TYPES_FILE="${CONFIG_FILE}.d.ts"
TS_FILE="${CONFIG_FILE}.ts"

npx wrangler types --path="${TYPES_FILE}" --env-interface MyAppEnv
mv "${TYPES_FILE}" "${TS_FILE}"

sed -i '' '2i\
import type { D1Database, KVNamespace } from '"'"'@cloudflare/workers-types'"'"';' "${TS_FILE}"

sed -i '' '3i\
export ' "${TS_FILE}"