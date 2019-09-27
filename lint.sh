#!/usr/bin/env bash

function format {
  ./node_modules/.bin/prettier --write --svelte-sort-order scripts-markup-styles "$@"
}

FILES="${1:-'./**/*.svelte'}"
if [ -z "$1" ]; then
  format './**/*.svelte'
else
  format $1
fi
