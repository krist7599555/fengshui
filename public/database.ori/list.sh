cd "$(dirname "$0")"
find . -type f -mindepth 2 | sort -V > list.txt
