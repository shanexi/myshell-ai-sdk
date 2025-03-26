```json
  "scripts": {
    "generate": "../../node_modules/.bin/prisma generate",
    "migrate": "../../node_modules/.bin/prisma migrate dev --create-only",
    "studio": "../../node_modules/.bin/prisma studio",
    "studio:prod:out": "../../node_modules/.bin/dotenv -e .env.prod.out -- ../../node_modules/.bin/prisma studio",
    "format": "../../node_modules/.bin/prisma format",
    "push": "../../node_modules/.bin/prisma db push",
    "push:dev": "../../node_modules/.bin/dotenv -e .env.dev -- ../../node_modules/.bin/prisma db push",
    "migrate:dev": "../../node_modules/.bin/dotenv -e .env -- ../../node_modules/.bin/prisma migrate dev --create-only",
    "deploy:prod": "../../node_modules/.bin/dotenv -e .env.prod.out -- ../../node_modules/.bin/prisma migrate deploy",
    "studio:dev": "../../node_modules/.bin/dotenv -e .env.dev -- ../../node_modules/.bin/prisma studio",
    "seed": "ts-node prisma/seed.ts",
    "seed:dev": "../../node_modules/.bin/dotenv -e .env.dev -- ts-node prisma/seed.ts"
  }
```
