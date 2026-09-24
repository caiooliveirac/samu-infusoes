#!/usr/bin/env bash
# Volta o site para a release anterior (ou para um SHA específico).
# Uso no magalu: bash /var/www/infusoes/rollback.sh [sha]
set -euo pipefail
ROOT=/var/www/infusoes
cur="$(basename "$(readlink -f "$ROOT/current")")"
target="${1:-$(ls -1t "$ROOT/releases" | grep -v -e '^incoming' -e "^$cur\$" | head -1)}"
[ -d "$ROOT/releases/$target" ] || { echo "release $target não existe"; exit 1; }
ln -sfn "$ROOT/releases/$target" "$ROOT/current.tmp" && mv -T "$ROOT/current.tmp" "$ROOT/current"
echo "current: $cur → $target"
