#!/usr/bin/env bash
# Ativa uma release do site estático `samu-infusoes` na VM magalu.
#
# Contrato: recebe o SHA; descompacta releases/incoming.tgz em releases/<sha>,
# confere que index.html e healthz existem, troca o symlink `current` de forma
# atômica e confere pelo nginx local que o healthz servido é o SHA novo.
# Falhou depois da troca → volta o symlink anterior e sai != 0.
#
# Rodado SÓ pelo deploy/publish.sh. Nada de "ajuste rápido" manual.

set -euo pipefail

ROOT=/var/www/infusoes
KEEP=5
SHA="${1:?uso: activate.sh <sha>}"
RELEASE="$ROOT/releases/$SHA"
INCOMING="$ROOT/releases/incoming.tgz"

log() { printf '[activate %s] %s\n' "${SHA:0:7}" "$*"; }

PREVIOUS=""
[ -L "$ROOT/current" ] && PREVIOUS="$(readlink -f "$ROOT/current")"

[ -f "$INCOMING" ] || { log "ERRO: $INCOMING não existe"; exit 1; }

log "descompactando"
rm -rf "$RELEASE"
mkdir -p "$RELEASE"
tar xzf "$INCOMING" -C "$RELEASE"
rm -f "$INCOMING"

[ -f "$RELEASE/index.html" ] || { log "ERRO: release sem index.html — nada ativado"; exit 1; }
[ "$(cat "$RELEASE/healthz")" = "$SHA" ] || { log "ERRO: healthz não bate com o SHA — nada ativado"; exit 1; }

# Troca atômica: cria o link ao lado e renomeia por cima.
ln -sfn "$RELEASE" "$ROOT/current.tmp"
mv -T "$ROOT/current.tmp" "$ROOT/current"
log "current → $SHA"

served="$(curl -sk --max-time 5 --resolve infusoes.mnrs.com.br:443:127.0.0.1 https://infusoes.mnrs.com.br/healthz || true)"
if [ "$served" != "$SHA" ]; then
  log "ERRO: nginx serviu '$served' em vez do SHA novo"
  if [ -n "$PREVIOUS" ]; then
    ln -sfn "$PREVIOUS" "$ROOT/current.tmp" && mv -T "$ROOT/current.tmp" "$ROOT/current"
    log "rollback para $(basename "$PREVIOUS")"
  fi
  exit 1
fi

# Mantém as últimas $KEEP releases (a ativa nunca é apagada).
cd "$ROOT/releases"
ls -1t | grep -v '^incoming' | tail -n +$((KEEP + 1)) | while read -r old; do
  [ "$ROOT/releases/$old" = "$(readlink -f "$ROOT/current")" ] || rm -rf -- "$old"
done
log "ok"
