#!/usr/bin/env bash

set -euo pipefail

if [[ "$#" -eq 0 ]]; then
  echo "Usage: $0 <command> [args...]" >&2
  exit 2
fi

lock_dir="/tmp/wazir-trading-pnpm-install.lock"
lock_acquired=0

while true; do
  if mkdir "$lock_dir" 2>/dev/null; then
    printf '%s\n' "$$" > "$lock_dir/pid"
    lock_acquired=1
    break
  fi

  lock_pid=""
  if [[ -f "$lock_dir/pid" ]]; then
    lock_pid="$(cat "$lock_dir/pid")"
  fi

  if [[ -n "$lock_pid" ]] && ! kill -0 "$lock_pid" 2>/dev/null; then
    rm -rf "$lock_dir"
    continue
  fi

  sleep 0.25
done

cleanup() {
  if [[ "$lock_acquired" -eq 1 ]]; then
    rm -rf "$lock_dir"
  fi
}
trap cleanup EXIT

if [[ ! -x "artifacts/wazir-trading/node_modules/.bin/vite" ||
      ! -x "artifacts/api-server/node_modules/.bin/esbuild" ]]; then
  pnpm install --frozen-lockfile
fi

# Do not hold the install lock for the lifetime of the service process.
cleanup
lock_acquired=0
exec "$@"