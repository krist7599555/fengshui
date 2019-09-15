#! bin/sh
find *.md -exec sh -c 'markdown $0 > ${0%.md}.html' {} \;
