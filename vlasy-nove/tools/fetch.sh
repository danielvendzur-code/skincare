#!/usr/bin/env bash
# Download official brand files into a scratch folder: fetch.sh DIR name=url [name=url ...]
set -euo pipefail
dir="$1"; shift; mkdir -p "$dir"
for pair in "$@"; do
  name="${pair%%=*}"; url="${pair#*=}"
  curl -sSL -m 40 -A 'Mozilla/5.0 (X11; Linux x86_64) Chrome/126 Safari/537.36' -o "$dir/$name" "$url"
  printf '%s %s\n' "$(file -b "$dir/$name" | cut -c1-60)" "$name"
done
