#!/bin/bash
files=$(find . -maxdepth 1 -type f | wc -l)
dirs=$(find . -maxdepth 1 -type d | wc -l)
echo "Regular files: $files"
echo "Directories: $dirs"
