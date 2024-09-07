# MyshellApiSdk

lock version:
> why: I can fix bugs

1. pnpm7
2. nx 15.9.7

commands:
- `nx graph`
- `npx nx connect-to-nx-cloud`
- `nx run-many --target=test --all --parallel=false --watch=false --ci=true --runInBand=true --coverage`

```bash
pnpm7 dlx istanbul-merge --out coverage/coverage.json ./coverage/apps/myshell-fun/coverage-final.json ./coverage/libs/chat/coverage-final.json ./coverage/libs/def/coverage-final.json
```

```bash
pnpm7 dlx istanbul report --include coverage/coverage.json --dir coverage html
```
