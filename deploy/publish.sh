#!/usr/bin/env bash
# Publica o commit atual da origin/main em infusoes.mnrs.com.br (magalu).
# Builda num clone limpo (nada de arquivo local não commitado vai para o ar),
# envia o dist/ com o SHA em /healthz e ativa com deploy/activate.sh no servidor.
set -euo pipefail
cd "$(dirname "$0")/.."

git fetch -q origin main
SHA="$(git rev-parse origin/main)"
[ -z "$(git status --porcelain)" ] || { echo "árvore suja — commit e push antes"; exit 1; }
[ "$(git rev-parse HEAD)" = "$SHA" ] || { echo "HEAD ($(git rev-parse --short HEAD)) != origin/main (${SHA:0:7})"; exit 1; }

TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
git clone -q --no-local . "$TMP/src"
git -C "$TMP/src" checkout -q "$SHA"
( cd "$TMP/src" && npm ci --silent && npx vitest run --silent && npm run build --silent )
printf '%s' "$SHA" > "$TMP/src/dist/healthz"
tar czf "$TMP/site.tgz" -C "$TMP/src/dist" .

scp -q "$TMP/site.tgz" magalu:/var/www/infusoes/releases/incoming.tgz
scp -q deploy/activate.sh deploy/rollback.sh magalu:/var/www/infusoes/
ssh magalu "bash /var/www/infusoes/activate.sh $SHA"
